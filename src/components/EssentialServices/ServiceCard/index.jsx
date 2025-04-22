import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
    Chip,
    Stack,
    Divider,
  } from "@mui/material";
  import PlaceIcon from "@mui/icons-material/Place";
  
  export default function ServiceCard({ service }) {
    const { name, description, rating, locations, contact, availability, image } = service;
  
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 2, height: "100%" }}>
        {image && (
          <CardMedia
            component="img"
            height="180"
            src={image}
            alt={name}
            sx={{ objectFit: "cover" }}
          />
        )}
        
        {/* Fallback Image if `service.image` is not defined */}
        {!image && (
          <CardMedia
            component="img"
            height="180"
            src="/images/default-image.jpg" // Default placeholder image
            alt="default"
            sx={{ objectFit: "cover" }}
          />
        )}
  
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
  
          <Typography variant="body2" color="text.secondary" mb={1}>
            {description}
          </Typography>
  
          <Rating value={rating || 0} readOnly precision={0.5} size="small" />
  
          <Divider sx={{ my: 1.5 }} />
  
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {locations?.map((loc, index) => (
              <Chip
                key={index}
                icon={<PlaceIcon />}
                label={loc}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
  
          <Typography variant="body2" color="text.secondary" mt={2}>
            📞 <strong>{contact}</strong> &nbsp;&nbsp; | &nbsp;&nbsp; 🕘 {availability}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  