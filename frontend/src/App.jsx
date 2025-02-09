import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import FileUpload from "./components/FileUpload";
import PropTypes from "prop-types";

// ✅ ตัดเฉพาะชื่อพืช
function extractPlantName(text) {
  const match = text.match(/"([^"]+)"/);
  return match ? match[1] : text.split(" ")[0];
}

// ✅ กำหนดสีระดับการดูแล
function getCareColor(level) {
  if (level === "ง่าย") return "#4CAF50"; // เขียว
  if (level === "ปานกลาง") return "#FF9800"; // ส้ม
  return "#F44336"; // แดง
}

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        textAlign: "center",
        bgcolor: "#F5F5F7",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <Typography variant="h3" fontWeight={700} gutterBottom>
        🌱 ระบบวิเคราะห์พืชจากภาพ
      </Typography>

      <FileUpload onFileSelect={() => {}} setResult={setResult} />

      {result && <PlantInfo data={result} />}
    </Container>
  );
}

function PlantInfo({ data }) {
  // ✅ ถ้าไม่มีร้านค้า ให้ใช้ข้อมูลสมมุติ
  const shopData =
    data.shops && data.shops.length > 0
      ? data.shops
      : [
          {
            name: "🌿 สวนต้นไม้สุขใจ",
            price: "250",
            link: "https://example.com/shop1",
          },
          {
            name: "🌳 Green Leaf Garden",
            price: "320",
            link: "https://example.com/shop2",
          },
          {
            name: "🌼 ร้านต้นไม้เมืองนนท์",
            price: "180",
            link: "https://example.com/shop3",
          },
        ];

  // ✅ ถ้าไม่มีต้นไม้ใกล้เคียง ให้ใช้ข้อมูลสมมุติ
  const similarPlants =
    data.similar_plants && data.similar_plants.length > 0
      ? data.similar_plants
      : [
          {
            name: "ฟิโลเดนดรอน",
            image: "https://source.unsplash.com/200x150/?plant",
          },
          {
            name: "มอนสเตอร่า",
            image: "https://source.unsplash.com/200x150/?tropical",
          },
          {
            name: "ลิ้นมังกร",
            image: "https://source.unsplash.com/200x150/?green",
          },
        ];

  return (
    <Box mt={5}>
      <Card sx={{ boxShadow: 5, borderRadius: 5, bgcolor: "white", p: 3 }}>
        <CardContent>
          {/* ✅ แสดงชื่อพืช */}
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {extractPlantName(data.plant_name)}
          </Typography>

          {/* ✅ ระดับการดูแล */}
          <Typography variant="h6" fontWeight={600} mt={2}>
            🌿 ระดับการดูแล:{" "}
            <span
              style={{
                color: getCareColor(data.care.care_level),
                fontWeight: "bold",
              }}
            >
              {data.care.care_level || "ไม่ระบุ"}
            </span>
          </Typography>

          {/* ✅ ราคาประมาณ */}
          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
            mt={2}
            sx={{ fontSize: "1.8rem" }}
          >
            💰 ราคาโดยประมาณ: {data.price_range}
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ ต้นไม้ที่คล้ายกัน */}
      <Typography variant="h5" fontWeight={700} mt={5}>
        🌿 ต้นไม้ที่คล้ายกัน
      </Typography>
      <Grid container spacing={3} mt={2} justifyContent="center">
        {similarPlants.map((plant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                textAlign: "center",
                bgcolor: "white",
                p: 2,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {plant.name}
                </Typography>
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ ร้านค้า */}
      <Typography variant="h5" fontWeight={700} mt={5}>
        🏪 ร้านค้าที่แนะนำ
      </Typography>
      <Grid container spacing={3} mt={2} justifyContent="center">
        {shopData.map((shop, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                textAlign: "center",
                bgcolor: "white",
                p: 2,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {shop.name}
                </Typography>
                <Typography color="textSecondary">
                  💰 ราคา: {shop.price} บาท
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={shop.link}
                  target="_blank"
                  sx={{
                    mt: 2,
                    fontSize: "0.9rem",
                    borderRadius: 20,
                    px: 3,
                    bgcolor: "#007AFF",
                    "&:hover": { bgcolor: "#005ECF" },
                  }}
                >
                  🛒 สั่งซื้อเลย
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ✅ เพิ่ม PropTypes
PlantInfo.propTypes = {
  data: PropTypes.shape({
    plant_name: PropTypes.string.isRequired,
    care: PropTypes.shape({
      care_level: PropTypes.string.isRequired,
    }).isRequired,
    price_range: PropTypes.string.isRequired,
    similar_plants: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ),
    shops: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
