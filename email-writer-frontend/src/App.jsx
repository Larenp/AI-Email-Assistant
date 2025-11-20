import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(response.data);
    } catch (err) {
      setError("Failed to generate reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 6,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={600}
        textAlign="center"
        gutterBottom
      >
        Email Reply Generator
      </Typography>

      {/* Input Section */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Typography sx={{ mb: 1, fontWeight: 500 }}>
          Original Email Content
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={5}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading || !emailContent}
        >
          {loading ? <CircularProgress size={24} /> : "GENERATE REPLY"}
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Generated Reply */}
      {generatedReply && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>
            Generated Reply:
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            COPY TO CLIPBOARD
          </Button>
        </Box>
      )}
    </Container>
  );
}
