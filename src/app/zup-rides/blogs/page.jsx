import Link from "next/link"
import Image from "next/image"
import { ArrowForward, CalendarToday, Person } from "@mui/icons-material"
import { getAllBlogs } from "../../../components/ZupRides/data/blogs"
import Footer from "@/components/FooterEl"

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
<>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Zup Rides Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">Tips, guides, and stories to enhance your riding experience</p>
          </div>
        </div>
      </div>

      {/* Blog Listing */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/zup-rides/blogs/${blog.slug}`} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={blog.coverImage || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarToday className="w-4 h-4 mr-1" />
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <Person className="w-4 h-4 mr-1" />
                    <span>{blog.author}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>
                  <div className="flex items-center text-purple-600 font-medium mt-auto">
                    Read More <ArrowForward className="ml-2 text-sm" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
    <Footer/>
</>
  )
}
