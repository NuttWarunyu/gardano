import { useState } from "react";
import PropTypes from "prop-types"; // ✅ ใช้ PropTypes
import {
  Button,
  Input,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import { analyzeImage } from "../api/analyze"; // ✅ เรียก API

export default function FileUpload({ setResult }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ state โหลด API

  // ✅ อัปเดตรูปที่อัปโหลด
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // ✅ แสดงรูปตัวอย่าง
  };

  // ✅ กดปุ่ม "วิเคราะห์ภาพ" เพื่อเรียก API
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true); // ✅ เริ่มโหลด
    try {
      console.log("🔍 กำลังวิเคราะห์ภาพ...");
      const data = await analyzeImage(selectedFile);
      console.log("✅ ผลลัพธ์จาก API:", data);
      setResult(data); // ✅ ส่งผลลัพธ์ไป `App.jsx`
    } catch (error) {
      console.error("❌ Analyze Error:", error);
    } finally {
      setLoading(false); // ✅ หยุดโหลด
    }
  };

  return (
    <Stack spacing={3} alignItems="center">
      <Input type="file" accept="image/*" onChange={handleFileChange} />

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

      {selectedFile && (
        <Typography variant="body1">
          📂 อัปโหลดไฟล์: {selectedFile.name}
        </Typography>
      )}

      <Button
        color="primary"
        variant="contained"
        onClick={handleAnalyze}
        disabled={!selectedFile || loading}
      >
        {loading ? <CircularProgress size={24} /> : "🔍 วิเคราะห์ภาพ"}
      </Button>
    </Stack>
  );
}

// ✅ เพิ่ม PropTypes เพื่อป้องกัน Warning
FileUpload.propTypes = {
  setResult: PropTypes.func.isRequired,
};
