"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/FooterEl";
import {
  dynamicKeywords as allDynamicKeywords,
  getKeywordsByLocation,
  getKeywordsByService,
} from "@/data/dynamicKeywords";
import {
  Home,
  Folder,
  BookOpen,
  ChevronRight,
  FileText,
  MapPin,
  Briefcase,
  Layers,
  Globe,
  FileSpreadsheet,
} from "lucide-react";

export default function SitemapPageClient({ dynamicKeywords, allArticles, categories }) {
  // Fallbacks
  const safeDynamic = dynamicKeywords?.length ? dynamicKeywords : allDynamicKeywords || [];

  // Collect unique locations & services
  const locations = [...new Set(safeDynamic.map((kw) => kw.location).filter(Boolean))];
  const services = [...new Set(safeDynamic.map((kw) => kw.service).filter(Boolean))];

  // Navigation links
  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "Our Students", path: "/courses/all-students" },
    { name: "Pay Online", path: "/pay-online" },
    { name: "Schedule Meeting", path: "/schedule-meeting" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact-us" },
  ];

  // Totals for dashboard cards
  const totals = {
    mainNav: mainNavLinks.length,
    categories: categories?.length || 0,
    articles: allArticles?.length || 0,
    services: safeDynamic.length,
    locations: locations.length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-extrabold mb-3 text-gray-900">
              WEBITYA <span className="text-blue-600">Sitemap</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore all our pages, services, and blog sections dynamically.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mb-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: "Main Pages", count: totals.mainNav, icon: Globe },
              { label: "Categories", count: totals.categories, icon: Layers },
              { label: "Articles", count: totals.articles, icon: FileSpreadsheet },
              { label: "Services", count: totals.services, icon: Briefcase },
              { label: "Locations", count: totals.locations, icon: MapPin },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
              >
                <item.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold text-gray-900">{item.count}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </motion.div>

          {/* XML Sitemap Button */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                <FileText className="w-5 h-5" />
                View XML Sitemap
              </button>
            </Link>
          </motion.div>

          {/* Sitemap Sections */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Pages */}
            <SectionCard
              title="Main Pages"
              icon={<Home className="w-6 h-6 text-blue-600" />}
              items={mainNavLinks.map((link) => ({
                key: link.name,
                href: link.path,
                label: link.name,
              }))}
            />

            {/* Blog Categories */}
            <SectionCard
              title="Blog Categories"
              icon={<Folder className="w-6 h-6 text-green-600" />}
              items={(categories || []).map((c) => ({
                key: c,
                href: `/blog?category=${encodeURIComponent(c)}`,
                label: c,
              }))}
            />

            {/* Blog Articles */}
            <SectionCard
              title="Blog Articles"
              icon={<BookOpen className="w-6 h-6 text-purple-600" />}
              scrollable
              items={(allArticles || []).map((a) => ({
                key: a.id || a.slug,
                href: `/blog/${a.slug}`,
                label: a.title || "Untitled Article",
              }))}
            />

            {/* Services */}
            <SectionCard
              title="All Services"
              icon={<Briefcase className="w-6 h-6 text-indigo-600" />}
              scrollable
              items={safeDynamic.map((kw) => ({
                key: kw.id || kw.slug,
                href: `/${kw.slug}`,
                label:
                  kw.title?.split(" | ")[0] ||
                  kw.name ||
                  kw.service ||
                  "Untitled Service",
              }))}
            />

            {/* Services by Location */}
            <GroupedSection
              title="Services by Location"
              icon={<MapPin className="w-6 h-6 text-rose-600" />}
              groups={locations.map((loc) => ({
                label: loc,
                items: getKeywordsByLocation(loc).map((kw) => ({
                  key: kw.id || kw.slug,
                  href: `/${kw.slug}`,
                  label: kw.service || kw.title || "Unnamed Service",
                })),
              }))}
            />

            {/* Locations by Service */}
            <GroupedSection
              title="Locations by Service"
              icon={<Layers className="w-6 h-6 text-amber-600" />}
              groups={services.map((srv) => ({
                label: srv,
                items: getKeywordsByService(srv).map((kw) => ({
                  key: kw.id || kw.slug,
                  href: `/${kw.slug}`,
                  label: kw.location || "Unknown Location",
                })),
              }))}
            />
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

/* -------------------- COMPONENTS -------------------- */

function SectionCard({ title, icon, items, scrollable = false }) {
  return (
    <motion.div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
      </div>
      <ul
        className={`space-y-2 ${
          scrollable ? "max-h-[350px] overflow-y-auto pr-3 custom-scrollbar" : ""
        }`}
      >
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-300 group"
            >
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function GroupedSection({ title, icon, groups }) {
  return (
    <motion.div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
      </div>
      <ul className="space-y-3 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
        {groups.map((group) => (
          <li key={group.label}>
            <p className="text-sm font-semibold text-gray-900 mb-2">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-xs transition-colors duration-300 group"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

