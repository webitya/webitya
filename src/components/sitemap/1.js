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
} from "lucide-react";

export default function SitemapPageClient({ dynamicKeywords, allArticles, categories }) {
  const locations = [...new Set(dynamicKeywords.map((kw) => kw.location))];
  const services = [...new Set(dynamicKeywords.map((kw) => kw.service))];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          {/* HEADER */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              WEBITYA{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sitemap
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore all our pages, services, blog categories, and locations across Jharkhand.
            </p>
          </motion.div>

          {/* STATS ON TOP */}
        <motion.div
            className="mb-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { label: "Main Pages", count: totals.mainNav, icon: Globe },
              { label: "Categories", count: totals.categories, icon: Layers },
              { label: "Articles", count: totals.articles, icon: FileSpreadsheet },
              { label: "Services", count: totals.services, icon: Briefcase },
              { label: "Locations", count: totals.locations, icon: MapPin },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200 hover:border-blue-500 transition-all duration-300"
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
            transition={{ delay: 0.2 }}
          >
            <Link href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <FileText className="w-5 h-5" />
                View XML Sitemap
              </button>
            </Link>
          </motion.div>

          {/* GRID */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* MAIN NAV */}
            <SectionCard
              title="Main Navigation"
              color="blue"
              icon={<Home className="w-6 h-6 text-blue-600" />}
              items={mainNavLinks.map((link) => ({
                key: link.name,
                href: link.path,
                label: link.name,
              }))}
            />

            {/* BLOG CATEGORIES */}
            <SectionCard
              title="Blog Categories"
              color="green"
              icon={<Folder className="w-6 h-6 text-green-600" />}
              items={categories.map((c) => ({
                key: c,
                href: `/blog?category=${encodeURIComponent(c)}`,
                label: c,
              }))}
            />

            {/* BLOG ARTICLES */}
            <SectionCard
              title="All Blog Articles"
              color="purple"
              icon={<BookOpen className="w-6 h-6 text-purple-600" />}
              scrollable
              items={allArticles.map((a) => ({
                key: a.id,
                href: `/blog/${a.slug}`,
                label: a.title,
              }))}
            />

            {/* ALL SERVICES */}
            <SectionCard
              title="All Services"
              color="indigo"
              icon={<Briefcase className="w-6 h-6 text-indigo-600" />}
              scrollable
              items={allDynamicKeywords.map((kw) => ({
                key: kw.id,
                href: `/${kw.slug}`,
                label: kw.title.split(" | ")[0],
              }))}
            />

            {/* BY LOCATION */}
            <GroupedSection
              title="By Location"
              color="rose"
              icon={<MapPin className="w-6 h-6 text-rose-600" />}
              groups={locations.map((loc) => ({
                label: loc,
                items: getKeywordsByLocation(loc).map((kw) => ({
                  key: kw.id,
                  href: `/${kw.slug}`,
                  label: kw.service,
                })),
              }))}
            />

            {/* BY SERVICE */}
            <GroupedSection
              title="By Service"
              color="amber"
              icon={<Layers className="w-6 h-6 text-amber-600" />}
              groups={services.map((srv) => ({
                label: srv,
                items: getKeywordsByService(srv).map((kw) => ({
                  key: kw.id,
                  href: `/${kw.slug}`,
                  label: kw.location,
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

/* -------------------- REUSABLE UI -------------------- */
function TopStatCard({ label, value, color }) {
  return (
    <motion.div
      className={`bg-gradient-to-r ${color} rounded-xl p-6 text-white text-center shadow-md hover:scale-105 transition-transform duration-300`}
    >
      <p className="text-4xl font-extrabold mb-2">{value}</p>
      <p className="text-sm opacity-90 font-medium">{label}</p>
    </motion.div>
  );
}

function SectionCard({ title, color, icon, items, scrollable = false }) {
  return (
    <motion.div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 border-b-2 pb-3 border-blue-600">
        {icon} {title}
      </h2>
      <ul className={`space-y-2 ${scrollable ? "max-h-[350px] overflow-y-auto pr-3 custom-scrollbar" : ""}`}>
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors group"
            >
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function GroupedSection({ title, color, icon, groups }) {
  return (
    <motion.div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 border-b-2 pb-3 border-blue-600">
        {icon} {title}
      </h2>
      <ul className="space-y-3 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
        {groups.map((group) => (
          <li key={group.label}>
            <p className="text-sm font-semibold text-gray-800 mb-2">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 text-xs transition-colors group ml-2"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-green-600 transition-transform" />
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
