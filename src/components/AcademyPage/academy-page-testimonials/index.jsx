import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer at TechCorp",
      image: "/placeholder.svg?height=80&width=80&text=SJ",
      quote:
        "The academy completely transformed my career. I went from working in retail to landing a job as a software developer within 6 months of completing the program.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist at AnalyticsPro",
      image: "/placeholder.svg?height=80&width=80&text=MC",
      quote:
        "The hands-on projects and personalized mentorship were invaluable. I now have the skills and confidence to excel in my new role as a data scientist.",
      rating: 5,
    },
    {
      name: "Jessica Williams",
      role: "UX Designer at CreativeStudio",
      image: "/placeholder.svg?height=80&width=80&text=JW",
      quote:
        "The curriculum was comprehensive and up-to-date with industry standards. The career support team was instrumental in helping me land my dream job.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Graduates Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hear from students who have transformed their careers through our academy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
                <FormatQuoteIcon className="text-indigo-200" />
              </div>

              <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Story */}
        <div className="mt-16 bg-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Success story"
                className="rounded-xl shadow-md"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Featured Success Story
              </h3>
              <p className="text-slate-600 mb-6">
                "After 10 years in a completely different industry, I was able
                to transition into tech and double my salary within a year of
                graduating. The structured curriculum and supportive community
                made all the difference."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=56&width=56&text=DP"
                    alt="David Parker"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-slate-900">David Parker</div>
                  <div className="text-sm text-slate-500">
                    Product Manager at InnovateTech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
