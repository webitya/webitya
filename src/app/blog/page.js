// This file is a Server Component.
// It handles data fetching and metadata generation on the server.

import BlogClient from "./BlogClient"
import { allArticles, categories } from "../../components/data/blogData"

// Define static metadata for the blog main page [^1]
export const metadata = {
  title: "Webitya Blog: AI, Web Development, Digital Marketing Insights",
  description:
    "Discover the latest trends, tutorials, and insights on Artificial Intelligence, Web Development (Python, JavaScript, ReactJS, NextJS), and Digital Marketing from Webitya.",
  openGraph: {
    title: "Webitya Blog: AI, Web Development, Digital Marketing Insights",
    description:
      "Discover the latest trends, tutorials, and insights on Artificial Intelligence, Web Development (Python, JavaScript, ReactJS, NextJS), and Digital Marketing from Webitya.",
    url: "https://webitya.com/blog",
    siteName: "Webitya Blog",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200", // Placeholder image for Open Graph
        width: 1200,
        height: 630,
        alt: "Webitya Blog - AI, Web Development, Digital Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webitya Blog: AI, Web Development, Digital Marketing Insights",
    description:
      "Discover the latest trends, tutorials, and insights on Artificial Intelligence, Web Development (Python, JavaScript, ReactJS, NextJS), and Digital Marketing from Webitya.",
    images: ["/placeholder.svg?height=675&width=1200"], // Placeholder image for Twitter
  },
}

export default function BlogPage() {
  // Fetch all articles and categories on the server
  // These are already imported from blogData.js, which is server-side compatible.
  const initialArticles = allArticles
  const blogCategories = categories

  // Pass data to the Client Component for rendering and interactivity
  return <BlogClient initialArticles={initialArticles} categories={blogCategories} />
}
