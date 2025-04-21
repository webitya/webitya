'use client';

import React, { useEffect, useMemo } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FilterNews = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  filterNewsData,
  setFilteredData,
}) => {
  // Generate unique categories from the array-based `categories` field
  const categories = useMemo(() => {
    const allCategories = filterNewsData?.flatMap((item) => item.categories || []) || [];
    const uniqueCategories = Array.from(new Set(allCategories));
    return ['All', ...uniqueCategories];
  }, [filterNewsData]);

  useEffect(() => {
    // Perform filtering based on searchQuery and selectedCategory
    const filtered = (filterNewsData || []).filter((news) => {
      const searchMatch =
        news.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(news.content)
          ? news.content.some((content) =>
              content.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : false);

      const categoryMatch =
        selectedCategory === 'All' ||
        (Array.isArray(news.categories) && news.categories.includes(selectedCategory));

      return searchMatch && categoryMatch;
    });

    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, filterNewsData, setFilteredData]);

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news..."
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Category Filter */}
      <FormControl variant="outlined" className="min-w-[250px] w-full md:w-auto">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Category"
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterNews;
