import { Rating, Chip, Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

export default function ServiceCard({ service }) {
  const { name, description, rating, locations, contact, availability, image } = service;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="h-44 w-full">
        <img
          src={image || "/images/default-image.jpg"}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h2 className="text-lg font-bold mb-1">{name}</h2>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <Rating value={rating || 0} readOnly precision={0.5} size="small" />
        </div>

        {/* Locations */}
        <div className="my-3">
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
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-600 mt-auto pt-2 border-t">
          📞 <strong>{contact}</strong> &nbsp;&nbsp; | &nbsp;&nbsp; 🕘 {availability}
        </div>
      </div>
    </div>
  );
}
