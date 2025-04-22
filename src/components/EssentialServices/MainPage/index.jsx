'use client'

import { useState, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ServiceCard from "../ServiceCard";
import ServiceFilters from "../ServiceFilter";

export default function ServiceFiltersClient({ services }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");  // State for the search term

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchLocation =
        selectedLocation === "All" || service.locations.includes(selectedLocation);
      const matchSearchTerm =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchLocation && matchSearchTerm;
    });
  }, [services, selectedCategory, selectedLocation, searchTerm]);

  return (
    <Box>
      <ServiceFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Grid container spacing={3} mt={2}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceCard service={service} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" mt={3}>
            No services found for selected filters.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
