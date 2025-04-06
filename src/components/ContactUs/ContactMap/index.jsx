"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";

const ContactMapSection = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_WORKING_API_KEY", // Replace with a valid API key
  });

  const center = useMemo(() => ({ lat: 23.3647197, lng: 85.2978754 }), []);

  if (!isLoaded) {
    return (
      <div className="w-full py-8 text-center text-gray-600 text-base animate-pulse">
        Loading map...
      </div>
    );
  }

  return (
    <section className="relative py-10 px-4 sm:px-6  mx-auto">
      {/* Heading + Description */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-800">
          <LocationOnIcon className="text-indigo-600" fontSize="medium" />
          <h2 className="text-2xl font-bold">Our Location</h2>
        </div>
        <p className="text-sm text-gray-600 max-w-md sm:text-right">
          You're welcome at <span className="font-semibold text-indigo-600">Webitya Web Services</span>, Ganga Nagar, Vidya Nagar, Harmu, Ranchi.
        </p>
      </div>

      {/* Map Section */}
      <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 mb-5">
        <GoogleMap
          center={center}
          zoom={16}
          mapContainerStyle={{ width: "100%", height: "280px" }}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=23.3647197,85.2978754"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
        >
          <DirectionsIcon fontSize="small" />
          Get Directions
        </a>
      </div>
    </section>
  );
};

export default ContactMapSection;
