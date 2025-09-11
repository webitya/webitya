"use client"
import BlogMain from "@/components/BlogMain" // Import the new client component

export default function BlogClient({ initialArticles, categories }) {
  return <BlogMain initialArticles={initialArticles} categories={categories} />
}
