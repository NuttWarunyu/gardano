import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Alert,
} from "@mui/material";
import FileUpload from "./components/FileUpload";
import PropTypes from "prop-types";

// ✅ ฟังก์ชันช่วยในการแสดงผลข้อมูล
function extractPlantName(text) {
  const match = text.match(/"([^"]+)"/);
  return match ? match[1] : text.split(" ")[0];
}

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
      sx={{ py: 5, textAlign: "center", bgcolor: "#F5F5F7" }}
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
  return (
    <Box mt={5}>
      {/* ✅ แสดงข้อมูลพื้นฐานของพืช */}
      <Card sx={{ boxShadow: 5, borderRadius: 5, bgcolor: "white", p: 3 }}>
        <CardContent>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {data.plant_name
              ? extractPlantName(data.plant_name)
              : "ไม่พบข้อมูล"}
          </Typography>
          <Typography variant="h6" fontWeight={600} mt={2}>
            🌿 ระดับการดูแล:{" "}
            <span
              style={{
                color: getCareColor(data.care?.care_level || "ไม่ระบุ"),
                fontWeight: "bold",
              }}
            >
              {data.care?.care_level || "ไม่ระบุ"}
            </span>
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700} mt={2}>
            💰 ราคาโดยประมาณ: {data.price_range || "ไม่พบข้อมูลราคา"}
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ แสดงร้านค้าที่แนะนำ */}
      {data.shops && data.shops.length > 0 && (
        <>
          <Typography variant="h5" fontWeight={700} mt={5}>
            🏪 ร้านค้าที่แนะนำ
          </Typography>
          <Grid container spacing={3} mt={2} justifyContent="center">
            {data.shops.map((shop, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 3,
                    textAlign: "center",
                    bgcolor: "white",
                    p: 2,
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
                      sx={{ mt: 2 }}
                    >
                      🛒 สั่งซื้อเลย
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* ✅ แจ้งเตือนถ้าไม่มีร้านค้า */}
      {(!data.shops || data.shops.length === 0) && (
        <Alert severity="info" sx={{ mt: 2, width: "100%" }}>
          ไม่มีข้อมูลร้านค้าที่แนะนำ
        </Alert>
      )}
    </Box>
  );
}

// ✅ กำหนด PropTypes ให้ถูกต้อง
PlantInfo.propTypes = {
  data: PropTypes.shape({
    plant_name: PropTypes.string,
    care: PropTypes.shape({
      care_level: PropTypes.string,
    }),
    price_range: PropTypes.string,
    shops: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.string,
        link: PropTypes.string,
      })
    ),
  }).isRequired,
};
