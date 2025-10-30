"use client"

import { motion } from "framer-motion"
import StarIcon from "@mui/icons-material/Star"

export default function DynamicTestimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tech Solutions Pvt Ltd",
      role: "CEO",
      content:
        "WEBITYA transformed our online presence. Within 3 months, our website traffic increased by 250% and we got 50+ qualified leads.",
      rating: 5,
      image: "/business-person.jpg",
    },
    {
      name: "Priya Singh",
      company: "Fashion Boutique",
      role: "Owner",
      content:
        "The team is incredibly professional and responsive. They understood our business and delivered results beyond expectations.",
      rating: 5,
      image: "/business-woman.jpg",
    },
    {
      name: "Amit Patel",
      company: "E-commerce Store",
      role: "Founder",
      content:
        "Best investment we made for our business. The ROI has been phenomenal. Their support team is always available to help.",
      rating: 5,
      image: "/entrepreneur.png",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3">
            <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-xs font-semibold">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">Join 500+ satisfied clients who've transformed their business</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="text-yellow-400" fontSize="small" />
                ))}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed text-sm italic">"{testimonial.content}"</p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
