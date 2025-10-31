"use client";

import Link from "next/link";
import {
  dynamicKeywords as allDynamicKeywords,
  getKeywordsByLocation,
  getKeywordsByService,
} from "@/data/dynamicKeywords";

export default function SitemapInlineDynamic({
  dynamicKeywords = allDynamicKeywords,
}) {
  const locations = [...new Set(dynamicKeywords.map((kw) => kw.location))];
  const services = [...new Set(dynamicKeywords.map((kw) => kw.service))];

  const combined = [];

  // 1️⃣ Add main services
  services.forEach((srv) => {
    combined.push({
      label: srv,
      href: `/services/${srv.toLowerCase().replace(/\s+/g, "-")}`,
    });
  });

  // 2️⃣ Add services by location
  locations.forEach((loc) => {
    getKeywordsByLocation(loc).forEach((kw) => {
      combined.push({
        label: `${kw.service} in ${loc}`,
        href: `/${kw.slug}`,
      });
    });
  });

  // 3️⃣ Add plain locations
  locations.forEach((loc) => {
    combined.push({
      label: loc,
      href: `/location/${loc.toLowerCase().replace(/\s+/g, "-")}`,
    });
  });

  return (
    <div className="w-full flex flex-wrap items-center text-sm leading-relaxed mt-6 bg-[#0B1220] text-white px-4 py-6">
      {combined.map((item, i) => (
        <span key={i} className="flex items-center">
          <Link
            href={item.href}
            className="transition-all duration-300 hover:text-white hover:[text-shadow:0_0_3px_#ffffff]"
          >
            {item.label}
          </Link>
          {i < combined.length - 1 && (
            <span className="mx-1 text-gray-500 select-none">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
