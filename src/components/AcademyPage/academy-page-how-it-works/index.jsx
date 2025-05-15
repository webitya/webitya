import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Path",
      description:
        "Browse our range of specialized tracks and select the one that aligns with your career goals.",
    },
    {
      number: "02",
      title: "Learn at Your Pace",
      description:
        "Access our curriculum online and progress through modules at a schedule that works for you.",
    },
    {
      number: "03",
      title: "Apply Your Knowledge",
      description:
        "Work on real-world projects that build your portfolio and demonstrate your skills.",
    },
    {
      number: "04",
      title: "Get Certified",
      description:
        "Complete your track and earn a certification that validates your expertise to employers.",
    },
    {
      number: "05",
      title: "Launch Your Career",
      description:
        "Work with our career services team to find opportunities and land your dream job.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Our Academy Works</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A simple, structured approach to help you achieve your career goals.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform md:-translate-x-1/2"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-indigo-600 rounded-full transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>

                {/* Left Spacer */}
                <div className="md:w-1/2"></div>

                {/* Step Card */}
                <div className="pl-12 md:pl-0 md:w-1/2">
                  <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
                    <div className="text-4xl font-bold text-indigo-200 mb-2">{step.number}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Explore Our Learning Paths
            <ArrowForwardIcon className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
