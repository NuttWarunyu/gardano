import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function ShopCard({ name, image, link }) {
  return (
    <Card
      sx={{ maxWidth: 300, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
    >
      {/* ✅ รูปภาพร้านค้า */}
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      {/* ✅ ชื่อร้าน และปุ่มซื้อ */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            href={link}
            target="_blank"
            sx={{ mt: 1 }}
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
