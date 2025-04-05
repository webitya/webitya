"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const influencers = [
  {
    name: "Ananya Sharma",
    category: "Fashion & Lifestyle",
    image: "/influencers/ananya.jpg",
    followers: "120K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Ananya",
  },
  {
    name: "Ravi Mehta",
    category: "Fitness & Wellness",
    image: "/influencers/ravi.jpg",
    followers: "95K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Ravi",
  },
  {
    name: "Simran Kaur",
    category: "Beauty & Makeup",
    image: "/influencers/simran.jpg",
    followers: "80K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Simran",
  },
  {
    name: "Arjun Das",
    category: "Tech & Gadgets",
    image: "/influencers/arjun.jpg",
    followers: "110K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Arjun",
  },
  {
    name: "Megha Jain",
    category: "Food & Travel",
    image: "/influencers/megha.jpg",
    followers: "150K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Megha",
  },
  {
    name: "Nikhil Kapoor",
    category: "Comedy & Entertainment",
    image: "/influencers/nikhil.jpg",
    followers: "90K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Nikhil",
  },
  {
    name: "Priya Verma",
    category: "Fitness & Nutrition",
    image: "/influencers/priya.jpg",
    followers: "85K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Priya",
  },
  {
    name: "Manish Rawat",
    category: "Tech Reviewer",
    image: "/influencers/manish.jpg",
    followers: "102K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Manish",
  },
  {
    name: "Ritika Sen",
    category: "Travel Blogger",
    image: "/influencers/ritika.jpg",
    followers: "75K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Ritika",
  },
  {
    name: "Kabir Bansal",
    category: "Gaming",
    image: "/influencers/kabir.jpg",
    followers: "130K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Kabir",
  },
  {
    name: "Sakshi Aggarwal",
    category: "Parenting & Kids",
    image: "/influencers/sakshi.jpg",
    followers: "70K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Sakshi",
  },
  {
    name: "Deepak Rana",
    category: "Motivation & Talks",
    image: "/influencers/deepak.jpg",
    followers: "95K",
    link: "https://wa.me/919693245941?text=I%20want%20to%20book%20Deepak",
  },
];

const InfluencerList = () => {
  const [visibleCount, setVisibleCount] = useState(6);

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, influencers.length));
  };

  return (
    <section
      id="collection"
      className="py-24 px-6 md:px-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4"
      >
        Top Influencers
      </motion.h2>
      <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
        Discover, connect, and book influencers that match your brand's vibe.
      </p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {influencers.slice(0, visibleCount).map((influencer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
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
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-gray-800">
                {influencer.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {influencer.category}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Followers: {influencer.followers}
              </p>

              <a
                href={influencer.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md transition duration-300"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < influencers.length && (
        <div className="mt-10">
          <button
            onClick={handleLoadMore}
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
