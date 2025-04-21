"use client";

import { useState } from "react";
import HandiSketchData from "@/components/HandiSketch/Data/HandiSketchData";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModalForm from "@/components/HandiSketch/ModalForm";
import ReferenceModalForm from "@/components/HandiSketch/ReferenceModalForm";
import Footer from "@/components/FooterEl";

export default function HandiSketchGallery() {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [openReference, setOpenReference] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleOpenEnquiry = (title) => {
    setSelectedTitle(title);
    setOpenEnquiry(true);
  };

  const handleOpenReference = (title) => {
    setSelectedTitle(title);
    setOpenReference(true);
  };

  return (
    <>
      <div className="px-4 py-8 max-w-screen-xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {HandiSketchData.map((portrait) => {
            const discountAmount = portrait.actualPrice - portrait.discountedPrice;
            const discountPercent = Math.round((discountAmount / portrait.actualPrice) * 100);

            const whatsappText = encodeURIComponent(
              `Hello! I'm interested in the portrait titled "${portrait.title}" listed at ₹${portrait.discountedPrice}. Please share more details.`
            );

            return (
              <div
                key={portrait.slug}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <Link href={`/handi-sketch/${portrait.slug}`}>
                  <img
                    src={portrait.image}
                    alt={portrait.title}
                    className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                <div className="p-3 space-y-2">
                  <h2 className="text-base font-semibold text-gray-800 truncate">
                    {portrait.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {portrait.description}
                  </p>

                  <div className="text-sm">
                    <p className="text-lg font-bold text-yellow-600">
                      ₹{portrait.discountedPrice}
                    </p>
                    <p className="text-gray-500 line-through text-xs">
                      ₹{portrait.actualPrice}
                      <span className="ml-2 text-red-500">
                        ({discountPercent}% OFF)
                      </span>
                    </p>
                  </div>

                  <hr className="my-1 border-gray-200" />

                  <div className="flex flex-wrap gap-2 items-center justify-between">
                  <Link href={`/handi-sketch/${portrait.slug}`} passHref>
  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
    View Details
  </button>
</Link>


                    <a
                      href={`https://wa.me/919876543210?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-green-500 hover:bg-green-600  rounded-sm shadow-sm transition">
                        <WhatsAppIcon fontSize="small" />
                        WhatsApp
                      </button>
                    </a>

                    <button
                      onClick={() => handleOpenEnquiry(portrait.title)}
                      className="px-3 py-1.5 text-sm text-yellow-700 border border-yellow-500 hover:bg-yellow-50 rounded-sm transition"
                    >
                      Enquire
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenReference(portrait.title)}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg transition"
                  >
                    <CloudUploadIcon fontSize="small" />
                    Upload Your Reference
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <ModalForm
        open={openEnquiry}
        handleClose={() => setOpenEnquiry(false)}
        title={selectedTitle}
      />
      <ReferenceModalForm
        open={openReference}
        handleClose={() => setOpenReference(false)}
        title={selectedTitle}
      />
      <Footer />
    </>
  );
}
