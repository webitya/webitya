"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import influencers from "../InfluencerData/influencers";

const filterOptions = ["All", "Creator", "Influencer", "Model", "For Ads","Actor"];

const InfluencerList = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchDropdown, setSearchDropdown] = useState(false);

  const searchRef = useRef(null);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (bottom && visibleCount < influencers.length) {
      setVisibleCount((prev) => Math.min(prev + 3, influencers.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        searchRef.current instanceof HTMLElement &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredInfluencers = influencers.filter((inf) => {
    const matchesSearch = inf.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      inf.category.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6"
      >
        Top Influencers
      </motion.h2>

      <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
        Discover, connect, and book influencers that match your brand's vibe.
      </p>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6 relative" ref={searchRef}>
        <input
          type="text"
          placeholder="Search influencer by name..."
          className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchDropdown(true);
          }}
          onFocus={() => setSearchDropdown(true)}
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");
              setSearchDropdown(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            &#x2715;
          </button>
        )}

        {searchDropdown && search.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-2 shadow-lg max-h-60 overflow-y-auto text-left">
            {influencers
              .filter((inf) =>
                inf.name.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, 5)
              .map((inf, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearch(inf.name);
                    setSearchDropdown(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-pink-100"
                >
                  {inf.name}
                </li>
              ))}
            {influencers.filter((inf) =>
              inf.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedFilter === option
                ? "bg-pink-600 text-white"
                : "bg-white text-slate-700 border border-gray-300 hover:bg-slate-100"
            }`}
            onClick={() => setSelectedFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Influencer Cards */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {filteredInfluencers.slice(0, visibleCount).map((influencer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-64">
              <Image
                src={influencer.image}
                alt={influencer.name}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-left flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {influencer.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {influencer.category}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Followers: {influencer.followers}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={influencer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md transition duration-300"
                >
                  Book Now
                </a>

                <Link
                  href={`/influencers/${influencer.slug}`}
                  className="inline-block bg-slate-100 text-slate-700 border border-slate-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition duration-300"
                >
                  View Details
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
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
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredInfluencers.length && (
        <div className="mt-10">
          <button
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + 3, influencers.length))
            }
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default InfluencerList;
