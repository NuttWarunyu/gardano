import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { getAffiliates, trackClick } from "../api/affiliate";

// ✅ แสดงร้านค้า Affiliate
export function AffiliateShops() {
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    async function fetchAffiliates() {
      const data = await getAffiliates();
      setAffiliates(data);
    }
    fetchAffiliates();
  }, []);

  const handleClick = async (id, url) => {
    await trackClick(id);
    window.open(url, "_blank");
  };

  return (
    <div>
      <Typography variant="h5" fontWeight={700} mt={5}>
        🏪 ร้านค้าพันธมิตร
      </Typography>
      <Grid container spacing={3} mt={2} justifyContent="center">
        {affiliates.map((shop) => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
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
                  {shop.store_name}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(shop.id, shop.affiliate_url)}
                  sx={{ mt: 1 }}
                >
                  🛒 ซื้อเลย
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

// ✅ ฟังก์ชันตัดเฉพาะชื่อพืช
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

// ✅ แสดงข้อมูลพืช
export function PlantInfo({ data }) {
  // ✅ ถ้าไม่มีร้านค้า ให้ใส่ข้อมูลสมมุติ
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

  return (
    <Box mt={5}>
      <Card sx={{ boxShadow: 5, borderRadius: 5, bgcolor: "white", p: 3 }}>
        <CardContent>
          {/* ✅ แสดงชื่อพืชแบบ Minimal */}
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{ fontFamily: '"Inter", sans-serif' }}
          >
            {extractPlantName(data.plant_name)}
          </Typography>

          {/* ✅ ระดับการดูแล */}
          <Typography variant="h6" fontWeight={600} mt={2}>
            🌿 ระดับการดูแล:{" "}
            <span
              style={{
                color: getCareColor(data.care_level),
                fontWeight: "bold",
              }}
            >
              {data.care_level || "ไม่ระบุ"}
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

      {/* ✅ ร้านค้าแบบ Grid ที่ดูโมเดิร์น */}
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

// ✅ PropTypes
PlantInfo.propTypes = {
  data: PropTypes.shape({
    plant_name: PropTypes.string.isRequired,
    care_level: PropTypes.string.isRequired,
    price_range: PropTypes.string.isRequired,
    shops: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
