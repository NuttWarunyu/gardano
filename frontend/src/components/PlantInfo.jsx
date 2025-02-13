import {
  Card,
  CardContent,
  CardMedia, // ✅ ใช้ CardMedia แสดงภาพ
  Typography,
  Grid,
  Box,
  Button,
  Divider, // ✅ ใช้ Divider คั่นเนื้อหา
  Alert,
} from "@mui/material";
import PropTypes from "prop-types";

export default function PlantInfo({ data }) {
  return (
    <Box mt={5}>
      {/* ✅ แสดงข้อมูลพื้นฐานของพืช */}
      <Card sx={{ boxShadow: 5, borderRadius: 5, bgcolor: "white", p: 3 }}>
        {/* ✅ เพิ่ม CardMedia สำหรับแสดงภาพ */}
        {data.image && (
          <CardMedia
            component="img"
            height="200"
            image={data.image}
            alt={data.plant_name}
            sx={{ borderRadius: 2 }}
          />
        )}

        <CardContent>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {data.plant_name || "ไม่พบข้อมูล"}
          </Typography>

          {/* ✅ แสดง Divider คั่นเนื้อหา */}
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight={600} mt={2}>
            🌿 ระดับการดูแล: {data.care?.care_level || "ไม่ระบุ"}
          </Typography>

          <Typography variant="h5" color="primary" fontWeight={700} mt={2}>
            💰 ราคาโดยประมาณ: {data.price_range || "ไม่พบข้อมูลราคา"}
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ แสดงร้านค้าที่แนะนำ */}
      {data.shops && data.shops.length > 0 ? (
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
      ) : (
        <Alert severity="info" sx={{ mt: 2, width: "100%" }}>
          ไม่มีข้อมูลร้านค้าที่แนะนำ
        </Alert>
      )}
    </Box>
  );
}

// ✅ PropTypes
PlantInfo.propTypes = {
  data: PropTypes.shape({
    plant_name: PropTypes.string,
    image: PropTypes.string,
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
