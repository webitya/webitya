"use client";

import Link from "next/link";
import {
  dynamicKeywords as allDynamicKeywords,
  getKeywordsByLocation,
} from "@/data/dynamicKeywords";

export default function SitemapInlineDynamic({
  dynamicKeywords = allDynamicKeywords,
}) {
  const locations = [...new Set(dynamicKeywords.map((kw) => kw.location))];

  const combined = [];

  // ✅ Only: Service in Location
  locations.forEach((loc) => {
    getKeywordsByLocation(loc).forEach((kw) => {
      combined.push({
        label: `${kw.service} in ${loc}`,
        href: `/${kw.slug}`,
      });
    });
  });

  return (
    <div className="w-full flex flex-wrap items-center text-sm leading-relaxed bg-[#0B1220] text-white px-4 py-6">
      {combined.map((item, i) => (
        <span key={i} className="flex items-center">
          <Link
            href={item.href}
            className="transition-colors duration-200 hover:text-blue-600"
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
