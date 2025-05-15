import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Assessment() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
              Take Our Free Career Assessment
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Not sure which path is right for you? Our assessment will analyze your skills, interests, and goals to
              recommend the perfect program.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Personalized program recommendations",
                "Detailed skills analysis",
                "Career path insights",
                "Salary potential information",
                "Free consultation with an advisor",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="text-indigo-600 mt-0.5" />
                  <span className="text-slate-700 text-base">{feature}</span>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-sm font-medium">
              Start Free Assessment
              <ArrowForwardIcon className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Right Form Card */}
          <div className="relative">
            <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
              <div className="h-2 bg-indigo-600 w-full"></div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Career Assessment</h3>

                <div className="space-y-6">
                  {/* Career Status */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      What is your current career status?
                    </label>
                    <select className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Select an option</option>
                      <option>Student</option>
                      <option>Employed in different field</option>
                      <option>Unemployed</option>
                      <option>Looking to advance in current field</option>
                    </select>
                  </div>

                  {/* Interest Area */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Which area interests you the most?
                    </label>
                    <select className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Select an option</option>
                      <option>Software Development</option>
                      <option>Data Science & Analytics</option>
                      <option>UX/UI Design</option>
                      <option>Product Management</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      What is your experience level with technology?
                    </label>
                    <div className="space-y-2">
                      {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            type="radio"
                            id={`level-${i}`}
                            name="experience-level"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`level-${i}`} className="ml-2 text-slate-700 text-sm">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button className="w-full inline-flex justify-center items-center px-4 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-sm font-medium">
                    Continue
                    <ArrowForwardIcon className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -z-10 -bottom-6 -right-6 h-32 w-32 rounded-full bg-indigo-200"></div>
            <div className="absolute -z-10 -top-6 -left-6 h-32 w-32 rounded-full bg-indigo-100"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
