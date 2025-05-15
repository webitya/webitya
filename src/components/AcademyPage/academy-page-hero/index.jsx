import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white pt-24 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800')] bg-center opacity-5 bg-no-repeat bg-cover"></div>

      <div className="mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4">
                Leadership <span className="text-indigo-600">Learning Platform</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-[600px] mx-auto md:mx-0">
                Empowering organizations to make fewer mistakes and achieve faster success in sales, marketing, and business strategy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-lg font-medium">
                Get Started
                <ArrowForwardIcon className="ml-2 w-5 h-5" />
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition text-lg font-medium">
                Learn More
              </button>
            </div>

            {/* User Avatars */}
            <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt={`User ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-600">
                Join <span className="text-indigo-600 font-semibold">2,000+</span> professionals
              </p>
            </div>
          </div>

          {/* Right Side Visual / Video */}
          <div className="relative mx-auto md:ml-auto w-full max-w-md">
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Leadership training overview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-indigo-100 z-[-1]"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-indigo-200 z-[-1]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
