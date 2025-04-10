"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const influencers = [
  {
    name: "Pravin Brother",
    category: "Actor | Content Creator",
    image: "/influencers/pravinbrother.png",
    followers: "326K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Pravin%20Brother",
    detailUrl: "https://webitya.in/influencers/pravin-brother",
  },
  {
    name: "Anjali Mahto",
    category: "Creator | Influencer",
    image: "/influencers/anjalimahto.png",
    followers: "709K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Anjali%20Mahto",
    detailUrl: "https://webitya.in/influencers/anjali-mahto",
  },
  {
    name: "Preeti Raj",
    category: "Fashion Model",
    image: "/influencers/preetiraj.png",
    followers: "502K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Preeti%20Raj",
    detailUrl: "https://webitya.in/influencers/preeti-raj",
  },
  {
    name: "Rahul Chauhan",
    category: "Lifestyle | For Ads",
    image: "/influencers/rahulchauhan.png",
    followers: "430K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Rahul%20Chauhan",
    detailUrl: "https://webitya.in/influencers/rahul-chauhan",
  },
  {
    name: "Nisha Soni",
    category: "Beauty | Influencer",
    image: "/influencers/nishasoni.png",
    followers: "650K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Nisha%20Soni",
    detailUrl: "https://webitya.in/influencers/nisha-soni",
  },
  {
    name: "Aman Singh",
    category: "Fitness | Creator",
    image: "/influencers/amansingh.png",
    followers: "390K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Aman%20Singh",
    detailUrl: "https://webitya.in/influencers/aman-singh",
  },
];

const filterOptions = ["All", "Creator", "Influencer", "Model", "For Ads"];

const InfluencerList = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

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
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search influencer by name..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Buttons */}
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
                <h3 className="text-xl font-bold text-gray-800">{influencer.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{influencer.category}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Followers: {influencer.followers}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={influencer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md transition duration-300"
                >
                  Book Now
                </a>

                <a
                  href={influencer.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-slate-100 text-slate-700 border border-slate-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition duration-300"
                >
                  View Details
                </a>
              </div>

              {/* Branding */}
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

      {/* Load More */}
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
