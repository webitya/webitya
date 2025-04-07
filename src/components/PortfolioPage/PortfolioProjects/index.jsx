"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const categories = ["All", "Website", "SEO", "Paid Ads", "UI/UX", "Content"];

const sampleProjects = [
  {
    title: "Modern Business Website",
    category: "Website",
    image: "/portfolio/web1.jpg",
  },
  {
    title: "Advanced SEO Strategy",
    category: "SEO",
    image: "/portfolio/seo1.jpg",
  },
  {
    title: "Facebook Ads Campaign",
    category: "Paid Ads",
    image: "/portfolio/ads1.jpg",
  },
  {
    title: "UI Redesign for App",
    category: "UI/UX",
    image: "/portfolio/ui1.jpg",
  },
];

const PortfolioProjects = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProjects = sampleProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const suggestions = sampleProjects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setShowSuggestions(false);
  };

  return (
    <section className="py-12 px-4 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 relative">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => {
              if (search.trim()) setShowSuggestions(true);
            }}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fontSize="small" />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-lg mt-2 shadow-md z-20">
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  onClick={() => handleSuggestionClick(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
              selectedCategory === category
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProjects.map((project, i) => (
          <div
            key={i}
            className="bg-white shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden border border-gray-200"
          >
            <div className="h-40 w-full bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioProjects;
