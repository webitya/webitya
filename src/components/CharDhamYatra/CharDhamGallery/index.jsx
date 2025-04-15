"use client";

import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744693125/Untitled_design_-_2025-04-15T102825.884_imaq9a.png",
    alt: "Kedarnath Temple during early morning Aarti",
    caption: "Sacred Kedarnath in the lap of snow-clad peaks",
  },
  {
    src: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744692645/Untitled_design_-_2025-04-15T102010.764_enftdo.png",
    alt: "Badrinath Temple with devotees",
    caption: "Divine blessings at Badrinath Dham",
  },
  {
    src: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744692920/Untitled_design_-_2025-04-15T102505.686_s6q9cu.png",
    alt: "Pilgrims at Yamunotri hot springs",
    caption: "The origin of Maa Yamuna’s blessings",
  },
  {
    src: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744692744/Untitled_design_-_2025-04-15T102158.047_nxcx2y.png",
    alt: "Gangotri Temple near the holy river",
    caption: "Where Maa Ganga descended to earth",
  },
  {
    src: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744692742/Untitled_design_-_2025-04-15T102211.578_a2zztg.png",
    alt: "Evening Ganga Aarti with lamps",
    caption: "Soothing your soul with the sound of conches and chants",
  },
  {
    src: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744692645/Untitled_design_-_2025-04-15T102010.764_enftdo.png",
    alt: "Devotees walking together",
    caption: "United in devotion, walking the path of faith",
  },
];

const CharDhamGallery = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Divine Moments from the Yatra
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Glimpse into the sacred experiences captured on the path of devotion. Each image reflects the divine presence and spiritual energy of the Char Dham.
        </p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid overflow-hidden rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover rounded-t-xl"
              />
              <div className="p-4 bg-gray-50 text-sm text-gray-700 italic">
                {image.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharDhamGallery;
