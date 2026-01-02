import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";

export default function Home() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const studyId = searchParams.get('studyid');
    
    if (studyId) {
      const studyIdLower = studyId.toLowerCase();
      
      // Build query string to preserve URL parameters
      const queryString = searchParams.toString();
      
      if (studyIdLower === 'aifirst') {
        nav(`/task/ai-first?${queryString}`);
      } else if (studyIdLower === 'humanfirst') {
        nav(`/task/human-first?${queryString}`);
      } else if (studyIdLower === 'review') {
        nav(`/review?${queryString}`);
      }
    }
  }, [searchParams, nav]);

  const buildPath = (basePath: string) => {
    const queryString = searchParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h3" fontWeight={800}>
              Meme Creation Study
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Choose your preferred workflow
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600 }}>
              Select how you would like to create memes. You can either start with AI-generated ideas
              and refine them, or create your own ideas first and get AI assistance later.
            </Typography>
          </Stack>

          <Divider sx={{ width: "100%", my: 2 }} />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ width: "100%", mt: 4 }}
          >
            {/* AI-First Option */}
            <Card
              sx={{
                flex: 1,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea onClick={() => nav(buildPath("/task/ai-first"))}>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SmartToyIcon sx={{ fontSize: 48, color: "white" }} />
                    </Box>
                    <Typography variant="h5" fontWeight={800}>
                      AI-First
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Let AI analyze meme templates and generate creative captions for you.
                      You can then select and refine the best ones.
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 2, width: "100%" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                        Workflow:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        1. AI selects best template
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2. AI generates 3 caption ideas
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        3. You pick and refine one
                      </Typography>
                    </Stack>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => nav(buildPath("/task/ai-first"))}
                    >
                      Start AI-First
                    </Button>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>

            {/* Human-First Option */}
            <Card
              sx={{
                flex: 1,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea onClick={() => nav(buildPath("/task/human-first"))}>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 48, color: "white" }} />
                    </Box>
                    <Typography variant="h5" fontWeight={800}>
                      Human-First
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start with your own creativity! Choose a template, write your captions,
                      and create memes your way.
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 2, width: "100%" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                        Workflow:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        1. You select a template
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2. You write 3 caption ideas
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        3. You edit and finalize
                      </Typography>
                    </Stack>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => nav(buildPath("/task/human-first"))}
                    >
                      Start Human-First
                    </Button>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>

          <Divider sx={{ width: "100%", my: 3 }} />

          {/* Review Section */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 600,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea onClick={() => nav(buildPath("/review"))}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: "info.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RateReviewIcon sx={{ fontSize: 48, color: "white" }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800}>
                    Review Memes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and rate all the memes that have been created in the study.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    color="info"
                    sx={{ mt: 2 }}
                    onClick={() => nav(buildPath("/review"))}
                  >
                    Go to Review
                  </Button>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
            Both workflows involve creating memes for 3 topics: School, Football, and Work/Office
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}
