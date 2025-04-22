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

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full max-w-7xl mx-auto px-4">
  {filteredServices.length > 0 ? (
    filteredServices.map((service) => (
      <div key={service.id} className="h-full">
        <ServiceCard service={service} />
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-lg mt-4">
      No services found for selected filters.
    </p>
  )}
</div>


    </Box>
  );
}
