"use client"; // ✅ Mark this as a Client Component

import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

export default function SEOConfig() {
  return <DefaultSeo {...SEO} />;
}
