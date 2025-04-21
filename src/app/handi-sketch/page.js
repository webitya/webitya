"use client";
import { useState } from "react";
import HandiSketchData from "@/components/HandiSketch/Data/HandiSketchData";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
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

  const handleImageDownload = async (imageUrl, title) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  return (
    <>
      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {HandiSketchData.map((portrait) => {
            const discountAmount = portrait.actualPrice - portrait.discountedPrice;
            const discountPercent = Math.round((discountAmount / portrait.actualPrice) * 100);

            const whatsappText = encodeURIComponent(
              `Hello! I'm interested in the portrait titled "${portrait.title}" listed at ₹${portrait.discountedPrice}. Please share more details.`
            );

            return (
              <div
                key={portrait.slug}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg group">
  {/* Blurred glass background */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center scale-110 blur-xl brightness-[0.5] rounded-2xl transition duration-300 group-hover:scale-125"
    style={{
      backgroundImage: `url(${portrait.image})`,
    }}
  />

  {/* Foreground image */}
  <Link href={`/handi-sketch/${portrait.slug}`}>
    <img
      src={portrait.image}
      alt={portrait.title}
      className="relative z-10 h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
    />
  </Link>

  {/* Download button */}
  <button
    onClick={() => handleImageDownload(portrait.image, portrait.title)}
    className="absolute top-2 right-2 z-20 text-blue-600 bg-white/80 hover:bg-white p-1 rounded-full shadow transition"
    title="Download"
  >
    <DownloadIcon fontSize="small" />
  </button>
</div>



                {/* Info */}
                <div className="p-3 space-y-1">
                  <h2 className="text-sm font-medium text-slate-800 truncate">{portrait.title}</h2>
                  <p className="text-xs text-gray-500 line-clamp-2">{portrait.description}</p>

                  <div className="text-sm mt-1">
                    <span className="font-semibold text-amber-600">₹{portrait.discountedPrice}</span>{" "}
                    <span className="line-through text-gray-400 text-xs ml-1">
                      ₹{portrait.actualPrice}
                    </span>
                    <span className="text-red-500 text-xs ml-1">({discountPercent}% OFF)</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-1 mt-2">
                    <Link href={`/handi-sketch/${portrait.slug}`} passHref>
                      <button className="px-3 py-1 text-xs text-white bg-indigo-600 rounded hover:bg-indigo-700">
                        View Details
                      </button>
                    </Link>

                    <a
                      href={`https://wa.me/919693245941?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded">
                        <WhatsAppIcon style={{ fontSize: 14 }} /> Chat on Whatsapp
                      </button>
                    </a>

                    <button
                      onClick={() => handleOpenEnquiry(portrait.title)}
                      className="px-2.5 py-1 text-xs border text-amber-700 border-amber-500 hover:bg-amber-50 rounded"
                    >
                      Enquiry Form
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenReference(portrait.title)}
                    className="mt-2 w-full flex items-center justify-center gap-1 px-2.5 py-1 text-xs border border-gray-300 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <CloudUploadIcon style={{ fontSize: 14 }} />
                    Upload Reference
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
