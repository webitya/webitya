import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Roles() {
  const careers = [
    {
      title: "Software Developer",
      salary: "$70,000 - $120,000",
      duration: "14 weeks",
      skills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
      popular: true,
    },
    {
      title: "Data Scientist",
      salary: "$85,000 - $130,000",
      duration: "16 weeks",
      skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
      popular: false,
    },
    {
      title: "UX/UI Designer",
      salary: "$65,000 - $110,000",
      duration: "12 weeks",
      skills: ["User Research", "Wireframing", "Prototyping", "Figma", "Design Systems"],
      popular: true,
    },
    {
      title: "Product Manager",
      salary: "$80,000 - $140,000",
      duration: "10 weeks",
      skills: ["Product Strategy", "User Stories", "Roadmapping", "Analytics", "Agile"],
      popular: false,
    },
    {
      title: "Cybersecurity Analyst",
      salary: "$75,000 - $125,000",
      duration: "14 weeks",
      skills: ["Network Security", "Threat Analysis", "Security Tools", "Compliance", "Incident Response"],
      popular: false,
    },
    {
      title: "Digital Marketer",
      salary: "$60,000 - $100,000",
      duration: "8 weeks",
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics", "PPC"],
      popular: true,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Career Paths We Offer</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Specialized training programs designed to prepare you for in-demand roles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, index) => (
            <div
              key={index}
              className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden bg-white"
            >
              <div className="h-2 bg-indigo-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">{career.title}</h3>
                  {career.popular && (
                    <Chip label="Popular" size="small" color="warning" variant="outlined" />
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-slate-500">Average Salary</div>
                    <div className="text-lg font-medium text-slate-900">{career.salary}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Program Duration</div>
                    <div className="text-lg font-medium text-slate-900">{career.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-2">Key Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, i) => (
                        <Chip
                          key={i}
                          label={skill}
                          size="small"
                          variant="outlined"
                          className="!text-xs"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  Learn More
                  <ArrowForwardIcon className="ml-2 text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center">
            View all career paths
            <ArrowForwardIcon className="ml-1 text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}
