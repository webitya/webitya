import React from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarToday, Person, ArrowBack, ArrowForward } from "@mui/icons-material"
import { getBlogBySlug, getAllBlogs } from "../../../../components/ZupRides/data/blogs"

export async function generateStaticParams() {
  const blogs = getAllBlogs()

  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default function BlogPost({ params }) {
  const { slug } = params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/zup-rides/blogs" className="text-purple-600 hover:underline">
            Back to blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96">
        <Image src={blog.coverImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center justify-center text-sm">
              <CalendarToday className="w-4 h-4 mr-1" />
              <span>{blog.date}</span>
              <span className="mx-2">•</span>
              <Person className="w-4 h-4 mr-1" />
              <span>{blog.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/zup-rides/blogs" className="inline-flex items-center text-purple-600 hover:underline mb-8">
          <ArrowBack className="w-4 h-4 mr-1" /> Back to blogs
        </Link>

        <div className="prose prose-lg max-w-none">
          {blog.content.map((section, index) => (
            <React.Fragment key={index}>
              {section.type === "paragraph" && <p>{section.content}</p>}
              {section.type === "heading" && <h2 className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>}
              {section.type === "image" && (
                <figure className="my-8">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={section.src || "/placeholder.svg"}
                      alt={section.alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  {section.caption && (
                    <figcaption className="text-center text-gray-500 mt-2">{section.caption}</figcaption>
                  )}
                </figure>
              )}
              {section.type === "list" && (
                <ul className="list-disc pl-6 my-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getAllBlogs()
              .filter((relatedBlog) => relatedBlog.slug !== slug)
              .slice(0, 3)
              .map((relatedBlog) => (
                <Link key={relatedBlog.slug} href={`/zup-rides/blogs/${relatedBlog.slug}`} className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={relatedBlog.coverImage || "/placeholder.svg"}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{relatedBlog.excerpt}</p>
                      <div className="flex items-center text-purple-600 font-medium">
                        Read More <ArrowForward className="ml-2 text-sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
