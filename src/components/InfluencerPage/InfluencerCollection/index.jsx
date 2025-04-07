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
  },
  {
    name: "Anjali Mahto",
    category: "Creator | Influencer",
    image: "/influencers/anjalimahto.png",
    followers: "709K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Anjali%20Mahto",
  },
  {
    name: "Amit Creators",
    category: "FLATTS, HOUSE, ROOM , HOSTEL, PG",
    image: "/influencers/amitcreators.png",
    followers: "49.3K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Amit%20Creators",
  },
  {
    name: "Yog Sah",
    category: "Graphic Designer & Video Editor ",
    image: "/influencers/yogshah.png",
    followers: "83.1K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Yog%20Sah",
  },

 
  {
    name: "Rohit Kumar",
    category: "Creator | Influencer",
    image: "/influencers/rohitkumarboi.png",
    followers: "20.7K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Rohit%20Kumar",
  },
  {
    name: "Arun Kumar",
    category: "Creator | Influencer",
    image: "/influencers/arunkumar.png",
    followers: "56.6K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Arun%20Kumar",
  },
  {
    name: "Kriti",
    category: "Model | Creator",
    image: "/influencers/kriti.png",
    followers: "27K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Kriti%20",
  },
  {
    name: "Priya Jha",
    category: "Creatot | Influencer",
    image: "/influencers/priyajha.png",
    followers: "59.3K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Priya%20Jha",
  },
  {
    name: "Sofia Hoda",
    category: "Actor | Comedian | Artist",
    image: "/influencers/sofiahoda.png",
    followers: "174K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Sofia%20Hoda",
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

              <div className="mt-4">
                <a
                  href={influencer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md transition duration-300"
                >
                  Book Now
                </a>
              </div>

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
