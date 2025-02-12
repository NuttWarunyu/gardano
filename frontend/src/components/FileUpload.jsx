import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Stack,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { analyzeImage } from "../api/analyze";

// ✅ Component อัปโหลดและวิเคราะห์ภาพ
export default function FileUpload({ setResult }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ อัปเดตรูปที่อัปโหลด
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ ฟังก์ชัน Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ กดปุ่ม "วิเคราะห์ภาพ" เพื่อเรียก API
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      console.log("🔍 กำลังวิเคราะห์ภาพ...");
      const data = await analyzeImage(selectedFile);
      console.log("✅ ผลลัพธ์จาก API:", data);
      setResult(data);
    } catch (error) {
      console.error("❌ Analyze Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} alignItems="center">
      {/* ✅ กล่อง Drop File */}
      <Box
        sx={{
          border: "2px dashed #007AFF",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          width: "300px",
          bgcolor: "#f9f9f9",
          cursor: "pointer",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Typography variant="body1">
          📂 ลากไฟล์มาวางที่นี่ หรือเลือกไฟล์
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            sx={{ mt: 2 }}
          >
            เลือกไฟล์
          </Button>
        </label>
      </Box>

      {/* ✅ แสดงตัวอย่างรูป */}
      {preview && (
        <img
          src={preview}
          alt="Uploaded Preview"
          style={{
            width: "200px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        />
      )}

      {/* ✅ แสดงข้อมูลไฟล์ที่อัปโหลด */}
      {selectedFile && (
        <Typography variant="body2">
          📄 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
        </Typography>
      )}

      {/* ✅ ปุ่มกดวิเคราะห์ */}
      <Button
        color="primary"
        variant="contained"
        onClick={handleAnalyze}
        disabled={!selectedFile || loading}
        sx={{ fontSize: "1rem", px: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : "🔍 วิเคราะห์ภาพ"}
      </Button>
    </Stack>
  );
}

// ✅ เพิ่ม PropTypes
FileUpload.propTypes = {
  setResult: PropTypes.func.isRequired,
};
