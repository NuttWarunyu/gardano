import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { getAffiliates, trackClick } from "../api/affiliate";

// ✅ แสดงร้านค้า Affiliate ที่แนะนำ
export function AffiliateShops({ plantName }) {
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    async function fetchAffiliates() {
      const data = await getAffiliates(plantName);
      setAffiliates(data);
    }
    fetchAffiliates();
  }, [plantName]);

  const handleClick = async (id, url) => {
    await trackClick(id);
    window.open(url, "_blank");
  };

  return (
    <div>
      <Typography variant="h5" fontWeight={700} mt={5}>
        🏪 ดีลพิเศษจากร้านค้าพันธมิตร
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
                <Avatar
                  src={shop.logo}
                  sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                />
                <Typography variant="h6" fontWeight={600}>
                  {shop.store_name}
                </Typography>
                <Typography color="textSecondary" fontSize="1rem">
                  💰 เริ่มต้น {shop.price} บาท
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(shop.id, shop.affiliate_url)}
                  sx={{ mt: 1, borderRadius: 20, px: 3 }}
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

// ✅ แสดงข้อมูลพืชและรายละเอียด
export function PlantInfo({ data }) {
  return (
    <Box mt={5}>
      <Card sx={{ boxShadow: 5, borderRadius: 5, bgcolor: "white", p: 3 }}>
        <CardContent>
          {/* ✅ ชื่อพืช */}
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {data.plant_name}
          </Typography>

          {/* ✅ ประเภทพืช */}
          <Typography variant="h6" fontWeight={600} mt={1}>
            🌱 ประเภท:{" "}
            <Chip label={data.category} color="success" variant="outlined" />
          </Typography>

          {/* ✅ การดูแล */}
          <Typography variant="h6" fontWeight={600} mt={1}>
            🛠️ การดูแล:{" "}
            <Chip label={data.care_level} color="info" variant="outlined" />
          </Typography>

          {/* ✅ ความสูงเฉลี่ย */}
          <Typography variant="h6" fontWeight={600} mt={1}>
            📏 ความสูงเฉลี่ย:{" "}
            <Chip
              label={`${data.average_height} ซม.`}
              color="secondary"
              variant="outlined"
            />
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

          <Divider sx={{ my: 3 }} />

          {/* ✅ ร้านค้าที่แนะนำ */}
          <AffiliateShops plantName={data.plant_name} />
        </CardContent>
      </Card>
    </Box>
  );
}

// ✅ PropTypes
PlantInfo.propTypes = {
  data: PropTypes.shape({
    plant_name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    care_level: PropTypes.string.isRequired,
    average_height: PropTypes.string.isRequired,
    price_range: PropTypes.string.isRequired,
  }).isRequired,
};

AffiliateShops.propTypes = {
  plantName: PropTypes.string.isRequired,
};
