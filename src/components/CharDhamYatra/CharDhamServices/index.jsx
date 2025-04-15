"use client"
import { motion } from "framer-motion";
import {
  DirectionsBusFilled,
  Hotel,
  EmojiPeople,
  Restaurant,
  SupportAgent,
  LocationOn,
} from "@mui/icons-material";

const services = [
  {
    icon: <DirectionsBusFilled fontSize="large" />,
    title: "Divine Journey & Pickup Seva",
    desc: "Begin your sacred Yatra with ease — whether arriving by train or air, our vehicles become your first steps toward the divine. Each ride is a prayer in motion.",
  },
  {
    icon: <Hotel fontSize="large" />,
    title: "Sanctified Accommodation",
    desc: "Stay in spiritually vibrant lodgings, from humble ashrams to serene hotels, nestled near the dhams — places where your soul can rest, reflect, and reconnect.",
  },
  {
    icon: <EmojiPeople fontSize="large" />,
    title: "Guided Darshan by Sevadars",
    desc: "Let our knowledgeable, devotional guides walk with you — not just showing you temples, but sharing their sacred stories, chants, and blessings along the path.",
  },
  {
    icon: <Restaurant fontSize="large" />,
    title: "Satvik Bhojan & Prasad",
    desc: "Nourish your body and soul with sanctified vegetarian meals, prepared with love and purity. Jain meals and clean drinking water are provided with care.",
  },
  {
    icon: <SupportAgent fontSize="large" />,
    title: "Ananya Seva (24x7 Support)",
    desc: "Our seva team is available at all times, like a divine companion on your journey — just a message away to serve with devotion and dedication.",
  },
  {
    icon: <LocationOn fontSize="large" />,
    title: "Customized Yatra Planning",
    desc: "Every devotee walks a unique path. We offer personalized Yatra plans — whether for elders, families, or sadhakas seeking a deeper spiritual awakening.",
  },
];

const CharDhamServices = () => {
  return (
    <section className="bg-[#f7fbff] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Our Seva Offerings for the Char Dham Yatra
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          In every step of this sacred pilgrimage, we walk beside you in service — so your heart may stay immersed in the divine, and your journey be filled with blessings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4 text-blue-600">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharDhamServices;
