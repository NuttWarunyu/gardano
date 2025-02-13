import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { Typography, TextField, Grid, Chip, Box } from "@mui/material";
import FileUpload from "../components/FileUpload";
import "../styles/HomePage.css";

export default function HomePage({ setResult }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // ✅ ใช้ useNavigate ที่นี่

  const handleAnalyze = (data) => {
    setResult(data);
    navigate("/result"); // ✅ Redirect ไปหน้าผลลัพธ์
  };

  const categories = ["ไม้ดอก", "ไม้ใบ", "ไม้มงคล", "ไม้ฟอกอากาศ", "ไม้แขวน"];

  return (
    <Box className="homepage">
      <Box className="hero-section">
        <Typography variant="h3" className="hero-title">
          ค้นหาต้นไม้ที่ใช่สำหรับคุณ
        </Typography>
        <Box className="search-container">
          <TextField
            variant="outlined"
            placeholder="🔍 ค้นหาต้นไม้..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <FileUpload setResult={handleAnalyze} />{" "}
          {/* ✅ เรียก handleAnalyze */}
        </Box>
        <Grid container spacing={1} justifyContent="center" mt={2}>
          {categories.map((category) => (
            <Grid item key={category}>
              <Chip label={category} className="category-chip" />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ✅ เพิ่ม PropTypes ให้กับ setResult
HomePage.propTypes = {
  setResult: PropTypes.func.isRequired,
};
