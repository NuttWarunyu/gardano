import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
} from "@mui/material";

// ✅ ฟังก์ชันดึงโลโก้ร้านค้าอัตโนมัติ
const getStoreLogo = (store) => {
  if (store.toLowerCase().includes("shopee"))
    return "https://cdn-icons-png.flaticon.com/512/5968/5968885.png"; // Shopee Logo
  if (store.toLowerCase().includes("lazada"))
    return "https://cdn-icons-png.flaticon.com/512/882/882674.png"; // Lazada Logo
  if (store.toLowerCase().includes("tiktok"))
    return "https://cdn-icons-png.flaticon.com/512/3046/3046121.png"; // TikTok Logo
  return "https://via.placeholder.com/50"; // Default logo
};

// ✅ การ์ดแสดงร้านค้า
export default function ShopCard({ storeName, image, price, link }) {
  return (
    <Card
      sx={{
        maxWidth: 320,
        boxShadow: 3,
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
      }}
    >
      {/* ✅ รูปภาพสินค้า */}
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={storeName}
        sx={{ objectFit: "cover" }}
      />

      {/* ✅ ชื่อร้านค้าและราคา */}
      <CardContent sx={{ textAlign: "center" }}>
        <Stack direction="column" alignItems="center" spacing={1}>
          <Avatar
            src={getStoreLogo(storeName)}
            sx={{ width: 50, height: 50 }}
          />
          <Typography variant="h6" fontWeight={600}>
            {storeName}
          </Typography>
          <Typography color="textSecondary" fontSize="1rem">
            💰 ราคาเริ่มต้น {price} บาท
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href={link}
            target="_blank"
            sx={{
              mt: 1,
              fontSize: "0.9rem",
              borderRadius: 20,
              px: 3,
              bgcolor: "#007AFF",
              "&:hover": { bgcolor: "#005ECF" },
            }}
          >
            🛒 ซื้อเลย
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ✅ PropTypes ป้องกัน Warning
ShopCard.propTypes = {
  storeName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
