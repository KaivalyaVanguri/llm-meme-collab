import { supabase } from "./supabaseClient";

export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(",");
  const mime = meta?.match(/data:(.*);base64/)?.[1] ?? "image/png";
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function safePart(s: string) {
  return String(s ?? "unknown").replace(/[^a-zA-Z0-9_-]/g, "_");
}

/**
 * Upload image to Supabase Storage and insert metadata row into DB.
 * If DB insert fails, it deletes the uploaded file (no orphan images).
 */
export async function uploadMemeAndInsertRow(args: {
  bucket: string; // "memes"
  participantId: string;
  topicId: string;
  templateId: string;

  ideas: string[];
  bestIdeaIndex: number;
  bestCaption: string;

  layers: any;
  memeDataUrl: string; // base64 PNG from exportMemePNG
}) {
  const {
    bucket,
    participantId,
    topicId,
    templateId,
    ideas,
    bestIdeaIndex,
    bestCaption,
    layers,
    memeDataUrl,
  } = args;

  const pid = safePart(participantId);
  const t = safePart(topicId);
  const tpl = safePart(templateId);

  const filePath = `${pid}/${t}__${tpl}__${Date.now()}.png`;
  const blob = dataUrlToBlob(memeDataUrl);

  // 1) Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, blob, {
      contentType: "image/png",
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

  // Public URL (bucket must be Public)
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(filePath);
  const publicUrl = pub.publicUrl;

  // 2) Insert row into DB
  const { data: row, error: insertError } = await supabase
    .from("meme_submissions")
    .insert([
      {
        participant_id: participantId,
        topic_id: topicId,
        template_id: templateId,
        ideas,
        best_idea_index: bestIdeaIndex,
        best_caption: bestCaption,
        layers,
        image_path: filePath,
        image_url: publicUrl,
      },
    ])
    .select()
    .single();

  // If DB insert fails, delete uploaded file so you don't have orphan images
  if (insertError) {
    await supabase.storage.from(bucket).remove([filePath]);
    throw new Error(`DB insert failed: ${insertError.message}`);
  }

  return { row, filePath, publicUrl };
}
