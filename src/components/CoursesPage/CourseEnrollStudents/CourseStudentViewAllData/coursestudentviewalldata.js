const studentViewAllData = {
  "rahul-sharma": {
    name: "Rahul Sharma",
    image: "/images/rahul.jpg",
    email: "rahul@example.com",
    contact: "rahul@example.com",
    linkedin: "https://linkedin.com/in/rahulsharma",
    address: "Ranchi, Jharkhand",
    qualification: "B.Sc IT",
    course: "MERN Stack",
    journey: [
      {
        day: 1,
        date: "2025-04-01",
        topic: "Introduction to MERN",
        homework: "Done",
        homeworkLink: "/homework/day1-homework.pdf",
        lectureLink: "https://youtube.com/lecture1",
        resourceLink: "/resources/mern_intro.pdf"
      },
      {
        day: 2,
        date: "2025-04-02",
        topic: "Node.js Basics",
        homework: "Pending",
        homeworkLink: "",
        lectureLink: "https://youtube.com/lecture2",
        resourceLink: "/resources/node_basics.pdf"
      }
      // Add more entries up to day 60 following the same pattern
    ]
  }
};

export default studentViewAllData;
