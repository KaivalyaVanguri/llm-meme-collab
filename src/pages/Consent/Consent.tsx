import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ConsentForm.css";
import { API_BASE_URL, STORAGE_KEYS } from "../constants";
import { useUser } from "../UserContext";

const ConsentForm = () => {
  const [isAgreed1, setIsAgreed1] = useState(false);
  const [isAgreed2, setIsAgreed2] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { userId, setUserId } = useUser();

  useEffect(() => {
    const storedId = sessionStorage.getItem(STORAGE_KEYS.PARTICIPANT_ID);
    const params = new URLSearchParams(location.search);
    const prolificId = params.get("participant_id");
    setUserId(prolificId || storedId || "");
  }, [location, setUserId]);

  const handleAgree = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/consent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantId: userId || undefined,
          consent: isAgreed1 && isAgreed2,
        }),
      }).then((r) => r.json());

      if (!res.participantId) {
        throw new Error("Participant ID missing");
      }

      setUserId(res.participantId);
      sessionStorage.setItem(STORAGE_KEYS.PARTICIPANT_ID, res.participantId);

      navigate("/memes");
    } catch (err) {
      alert(`Consent could not be recorded.\n${err}`);
    }
  };

  return (
    <div className="consent-form card">
      <h2>Informed Consent</h2>

      <p>
        You are invited to participate in an online research study titled
        <strong> “LLMeme”</strong>, conducted by Amrit Khadka, Kaivalya Vanguri, 
        Lavanya Raghavendra Rao, Sebastian Feldkamp and supervised by researchers 
        at TU Darmstadt.
      </p>

      <h3>Purpose</h3>
      <p>
        This study investigates how people interact with AI systems during
        creative tasks, specifically meme creation and evaluation.
      </p>
      <p>
        Participants are randomly assigned to one of two conditions:
      </p>
      <ul>
        <li>
          <strong>Human-First:</strong> You provide your own input before seeing
          AI-generated meme content.
        </li>
        <li>
          <strong>AI-First:</strong> You first see AI-generated meme content
          before providing your own input.
        </li>
      </ul>

      <h3>Procedure</h3>
      <p>
        After providing consent, you will interact with a meme generation and
        rating interface and answer short follow-up questions. The study takes
        approximately <strong>30 minutes</strong>.
      </p>

      <h3>Voluntary Participation</h3>
      <p>
        Participation is voluntary. You may withdraw at any time without penalty
        or loss of compensation.
      </p>

      <h3>Risks & Benefits</h3>
      <p>
        There are no known risks beyond normal computer use. Benefits include
        monetary compensation and contributing to research on human–AI
        collaboration.
      </p>

      <h3>Data Protection</h3>
      <p>
        The study complies with the EU General Data Protection Regulation (GDPR).
        We collect demographic information (e.g., age, gender), interaction data,
        and technical metadata (e.g., browser type).
      </p>
      <p>
        Your data will be stored securely, processed only for research purposes,
        and published only in anonymized form. You may withdraw your consent at
        any time (GDPR Art. 21).
      </p>

      <h3>Consent</h3>

      <p>
        <label>
          <input
            type="checkbox"
            checked={isAgreed1}
            onChange={(e) => setIsAgreed1(e.target.checked)}
          />
          I have read and understood the information above and agree to
          participate in this study.
        </label>
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            checked={isAgreed2}
            onChange={(e) => setIsAgreed2(e.target.checked)}
          />
          I consent to my data being recorded and processed in accordance with
          the GDPR.
        </label>
      </p>

      <button
        className="btn"
        onClick={handleAgree}
        disabled={!isAgreed1 || !isAgreed2}
      >
        Agree and Continue
      </button>
    </div>
  );
};

export default ConsentForm;
