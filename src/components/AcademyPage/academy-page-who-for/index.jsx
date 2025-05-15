import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import GroupIcon from "@mui/icons-material/Group";

export default function WhoFor() {
  const audiences = [
    {
      icon: <SchoolIcon className="text-indigo-600" style={{ fontSize: 40 }} />,
      title: "Recent Graduates",
      description:
        "Bridge the gap between academic knowledge and industry requirements with practical skills that employers are looking for.",
    },
    {
      icon: <WorkIcon className="text-indigo-600" style={{ fontSize: 40 }} />,
      title: "Career Changers",
      description:
        "Transition to a new career path with structured learning programs designed to build your skills from the ground up.",
    },
    {
      icon: <CodeIcon className="text-indigo-600" style={{ fontSize: 40 }} />,
      title: "Professionals",
      description:
        "Upgrade your existing skills and stay current with the latest industry trends and technologies.",
    },
    {
      icon: <GroupIcon className="text-indigo-600" style={{ fontSize: 40 }} />,
      title: "Teams & Organizations",
      description:
        "Upskill your workforce with customized training programs that align with your business objectives.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Who Our Academy Is For
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our programs are designed to serve diverse learning needs and career goals.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-indigo-50 rounded-full">{audience.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">
                {audience.title}
              </h3>
              <p className="text-slate-600 text-center">{audience.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Not sure if it's right for you?
              </h3>
              <p className="text-indigo-100 mb-6">
                Take our free career assessment to discover the perfect learning path for your goals and background.
              </p>
              <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-colors">
                Take Free Assessment
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Career assessment"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
