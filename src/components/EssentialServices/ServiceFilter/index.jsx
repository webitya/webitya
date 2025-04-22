import { Stack, TextField, MenuItem } from "@mui/material";
import essentialServices from "../Data/essentialServices";

const categories = ["All", ...new Set(essentialServices.map(item => item.category))];
const locations = ["All", ...new Set(essentialServices.flatMap(item => item.locations))];

export default function ServiceFilters({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      mb={3}
      alignItems="center"
    >
      <TextField
        label="Category"
        select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        fullWidth
      >
        {categories.map((cat, i) => (
          <MenuItem key={i} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Location"
        select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        fullWidth
      >
        {locations.map((loc, i) => (
          <MenuItem key={i} value={loc}>
            {loc}
          </MenuItem>
        ))}
      </TextField>

      {/* Search Field */}
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        variant="outlined"
      />
    </Stack>
  );
}
