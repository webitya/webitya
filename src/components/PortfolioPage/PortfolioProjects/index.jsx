"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Image from "next/image";

const categories = ["All", "Website", "SEO", "Paid Ads", "UI/UX", "Content"];

// Expanded Sample Data
const sampleProjects = [
  { title: "Modern Business Website", category: "Website", image: "/aboutHero.webp" },
  { title: "Advanced SEO Strategy", category: "SEO", image: "/aboutHero.webp" },
  { title: "Facebook Ads Campaign", category: "Paid Ads", image: "/aboutHero.webp" },
  { title: "UI Redesign for App", category: "UI/UX", image: "/aboutHero.webp" },
  { title: "eCommerce Website", category: "Website", image: "/aboutHero.webp" },
  { title: "Google Ads Setup", category: "Paid Ads", image: "/aboutHero.webp" },
  { title: "Brand Style Guide", category: "UI/UX", image: "/aboutHero.webp" },
  { title: "SEO for Blog", category: "SEO", image: "/aboutHero.webp" },
  { title: "Content Strategy Plan", category: "Content", image: "/aboutHero.webp" },
  { title: "Corporate Website", category: "Website", image: "/aboutHero.webp" },
  { title: "Instagram Ad Design", category: "Paid Ads", image: "/aboutHero.webp" },
  { title: "SEO Audit Report", category: "SEO", image: "/aboutHero.webp" },
  { title: "SaaS UI Kit", category: "UI/UX", image: "/aboutHero.webp" },
  { title: "Landing Page Design", category: "Website", image: "/aboutHero.webp" },
  { title: "Content Calendar", category: "Content", image: "/aboutHero.webp" },
  { title: "B2B Ads Funnel", category: "Paid Ads", image: "/aboutHero.webp" },
];

const PortfolioProjects = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
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
            onClick={() => {
              setSelectedCategory(category);
              setVisibleCount(8); // reset when category changes
            }}
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
        {filteredProjects.slice(0, visibleCount).map((project, i) => (
          <div
            key={i}
            className="bg-white shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden border border-gray-200"
          >
            <div className="h-48 md:h-40 w-full bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full  object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.category}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
  <span>Powered by</span>
  <Link href="/">
    <Image
      src="/brand/logo1.png"
      alt="Webitya Logo"
      width={70}
      height={20}
      className="object-contain cursor-pointer"
    />
  </Link>
</div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default PortfolioProjects;
