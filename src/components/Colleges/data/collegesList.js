export const colleges = [
  {
    id: 1,
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    shortDescription: "Premier engineering and technology institute known for excellence in education and research.",
    metaTitle: "IIT Delhi - Top Engineering College in India | Admission, Courses, Fees",
    metaDescription:
      "Get details about IIT Delhi, one of India's premier engineering institutes. Learn about courses, admission process, fees, placements, and campus facilities.",
    description:
      "IIT Delhi is one of India's most prestigious engineering institutions, known for its rigorous academic programs and cutting-edge research. Established in 1961, it has consistently ranked among the top engineering colleges in India and has produced numerous successful alumni who have made significant contributions globally.",
    history:
      "Established in 1961 as the College of Engineering, it was later declared an Institution of National Importance under the Institutes of Technology Act and renamed Indian Institute of Technology Delhi in 1963.",
    type: "Government",
    established: 1961,
    state: "Delhi",
    city: "New Delhi",
    address: "Hauz Khas, New Delhi, Delhi 110016",
    location: {
      latitude: 28.5456,
      longitude: 77.1926,
    },
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=400&width=1200",
    website: "https://home.iitd.ac.in/",
    email: "info@iitd.ac.in",
    phone: "+91-11-26591999",
    verified: true,
    accreditation: "NAAC A++",
    tags: ["Engineering", "Technology", "Research", "Premier Institute", "NIRF Top 10"],
    achievements: [
      "Ranked #1 in Engineering by NIRF 2023",
      "QS World University Ranking: Top 200",
      "Over 15 centers of excellence",
      "Recipient of Institution of Eminence status",
    ],
    facilities: [
      "State-of-the-art laboratories",
      "Central library with over 300,000 books",
      "Sports complex with Olympic-sized swimming pool",
      "Incubation center for startups",
      "On-campus housing for students and faculty",
    ],
    campusImages: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Main Academic Building",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Central Library",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Student Activity Center",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Research Park",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Hostels",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Sports Complex",
      },
    ],
    courses: [
      {
        id: 101,
        name: "B.Tech in Computer Science and Engineering",
        level: "Undergraduate",
        duration: "4 Years",
        seats: 120,
        description:
          "The B.Tech program in Computer Science and Engineering provides a strong foundation in computer science theory and practice, preparing students for careers in software development, artificial intelligence, and more.",
        eligibility: [
          "10+2 with Physics, Chemistry, and Mathematics",
          "JEE Advanced qualification",
          "Minimum 75% aggregate in qualifying examination",
        ],
        specializations: ["Artificial Intelligence", "Data Science", "Cybersecurity", "Cloud Computing"],
        fees: [
          {
            category: "General",
            amount: 222000,
            duration: "Per Semester",
          },
          {
            category: "SC/ST/PwD",
            amount: 111000,
            duration: "Per Semester",
          },
        ],
      },
      {
        id: 102,
        name: "B.Tech in Electrical Engineering",
        level: "Undergraduate",
        duration: "4 Years",
        seats: 100,
        description:
          "The Electrical Engineering program covers power systems, control systems, signal processing, and communications, preparing students for careers in power, electronics, and telecommunications industries.",
        eligibility: [
          "10+2 with Physics, Chemistry, and Mathematics",
          "JEE Advanced qualification",
          "Minimum 75% aggregate in qualifying examination",
        ],
        specializations: ["Power Systems", "Control Systems", "Communications", "Microelectronics"],
        fees: [
          {
            category: "General",
            amount: 222000,
            duration: "Per Semester",
          },
          {
            category: "SC/ST/PwD",
            amount: 111000,
            duration: "Per Semester",
          },
        ],
      },
      {
        id: 103,
        name: "M.Tech in Artificial Intelligence",
        level: "Postgraduate",
        duration: "2 Years",
        seats: 50,
        description:
          "The M.Tech program in Artificial Intelligence focuses on advanced machine learning, deep learning, computer vision, and natural language processing techniques.",
        eligibility: [
          "B.Tech/B.E. in Computer Science, IT, or related field",
          "GATE qualification",
          "Minimum 7.5 CGPA or 75% in qualifying degree",
        ],
        specializations: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing"],
        fees: [
          {
            category: "General",
            amount: 250000,
            duration: "Per Semester",
          },
          {
            category: "SC/ST/PwD",
            amount: 125000,
            duration: "Per Semester",
          },
        ],
      },
    ],
    admissionSchedule: [
      {
        title: "JEE Advanced Registration",
        date: "2023-05-01",
        description: "Registration for JEE Advanced examination opens for B.Tech admissions.",
      },
      {
        title: "JEE Advanced Examination",
        date: "2023-06-15",
        description: "JEE Advanced examination for B.Tech admissions.",
      },
      {
        title: "Result Declaration",
        date: "2023-07-10",
        description: "Declaration of JEE Advanced results.",
      },
      {
        title: "Counseling Process Begins",
        date: "2023-07-20",
        description: "Joint Seat Allocation Authority (JoSAA) counseling process begins.",
        important: "Candidates must register for counseling separately.",
      },
      {
        title: "First Round Seat Allocation",
        date: "2023-07-25",
        description: "First round of seat allocation by JoSAA.",
      },
      {
        title: "Fee Payment Deadline",
        date: "2023-08-05",
        description: "Last date for fee payment and document verification for confirmed seats.",
        important: "Failure to pay fees will result in cancellation of admission.",
      },
      {
        title: "Orientation Program",
        date: "2023-08-25",
        description: "Orientation program for newly admitted students.",
      },
      {
        title: "Commencement of Classes",
        date: "2023-09-01",
        description: "Classes begin for the new academic session.",
      },
    ],
    news: [
      {
        title: "IIT Delhi Researchers Develop Low-Cost COVID-19 Testing Kit",
        date: "2023-04-15",
        content:
          "Researchers at IIT Delhi have developed a low-cost RT-PCR testing kit for COVID-19, which has been approved by ICMR. The kit costs significantly less than imported kits and provides results in just 3 hours.",
        image: "/placeholder.svg?height=300&width=500",
        link: "#",
      },
      {
        title: "IIT Delhi Ranks 1st in Engineering Category in NIRF Rankings 2023",
        date: "2023-06-20",
        content:
          "IIT Delhi has been ranked as the top engineering institute in India according to the National Institutional Ranking Framework (NIRF) 2023 rankings released by the Ministry of Education.",
        image: "/placeholder.svg?height=300&width=500",
        link: "#",
      },
      {
        title: "IIT Delhi Launches New BTech Program in Energy Engineering",
        date: "2023-07-05",
        content:
          "IIT Delhi has announced a new B.Tech program in Energy Engineering starting from the academic year 2023-24. The program aims to address the growing demand for professionals in renewable energy and sustainable development sectors.",
        link: "#",
      },
    ],
    videos: [
      {
        title: "Campus Tour - IIT Delhi",
        youtubeId: "dQw4w9WgXcQ",
        description: "Take a virtual tour of our beautiful campus and state-of-the-art facilities.",
      },
      {
        title: "Research at IIT Delhi",
        youtubeId: "dQw4w9WgXcQ",
        description: "Learn about the cutting-edge research happening at IIT Delhi across various disciplines.",
      },
    ],
  },
  {
    id: 2,
    slug: "aiims-delhi",
    name: "All India Institute of Medical Sciences",
    shortDescription: "India's premier medical institution offering world-class education and healthcare services.",
    metaTitle: "AIIMS Delhi - Top Medical College in India | Courses, Admission, Fees",
    metaDescription:
      "Explore AIIMS Delhi, India's premier medical institution. Get information about MBBS, MD/MS programs, admission process, healthcare facilities, and research opportunities.",
    description:
      "AIIMS Delhi is India's foremost public healthcare institution, established to serve as a referral and role model for state health systems. It provides comprehensive healthcare services, medical education, and conducts research in national health priorities.",
    history:
      "Established in 1956 as an autonomous institution through an Act of Parliament, AIIMS was created to develop patterns of teaching in undergraduate and postgraduate medical education that would demonstrate a high standard of medical education to all medical colleges in India.",
    type: "Government",
    established: 1956,
    state: "Delhi",
    city: "New Delhi",
    address: "Ansari Nagar East, New Delhi, Delhi 110029",
    location: {
      latitude: 28.5672,
      longitude: 77.21,
    },
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=400&width=1200",
    website: "https://www.aiims.edu/",
    email: "director@aiims.edu",
    phone: "+91-11-26588500",
    verified: true,
    accreditation: "NAAC A++",
    tags: ["Medical", "Healthcare", "Research", "Premier Institute", "NIRF Top 10"],
    achievements: [
      "Ranked #1 in Medical category by NIRF 2023",
      "Recognized as Institution of National Importance",
      "World-class trauma center",
      "Pioneer in numerous medical breakthroughs",
    ],
    facilities: [
      "State-of-the-art hospitals and trauma center",
      "Advanced diagnostic equipment",
      "Specialized centers",
    ],
    campusImages: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Main Hospital Building",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Diagnostic Center",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Research Lab",
      },
    ],
    courses: [
      {
        id: 201,
        name: "MBBS",
        level: "Undergraduate",
        duration: "5 Years",
        seats: 150,
        description:
          "MBBS program at AIIMS Delhi offers comprehensive medical education, preparing students for careers in medicine and healthcare.",
        eligibility: [
          "10+2 with Biology, Physics, and Chemistry",
          "NEET qualification",
          "Minimum 75% aggregate in qualifying examination",
        ],
        specializations: ["Internal Medicine", "Surgery", "Pediatrics", "Obstetrics and Gynecology"],
        fees: [
          {
            category: "General",
            amount: 200000,
            duration: "Per Year",
          },
          {
            category: "SC/ST/PwD",
            amount: 100000,
            duration: "Per Year",
          },
        ],
      },
      {
        id: 202,
        name: "M.D. in Internal Medicine",
        level: "Postgraduate",
        duration: "3 Years",
        seats: 50,
        description:
          "M.D. program in Internal Medicine focuses on the diagnosis and treatment of diseases affecting internal organs.",
        eligibility: ["MBBS degree", "NEET PG qualification", "Minimum 60% aggregate in qualifying degree"],
        specializations: ["Cardiology", "Gastroenterology", "Respiratory Medicine", "Endocrinology"],
        fees: [
          {
            category: "General",
            amount: 250000,
            duration: "Per Year",
          },
          {
            category: "SC/ST/PwD",
            amount: 125000,
            duration: "Per Year",
          },
        ],
      },
    ],
    admissionSchedule: [
      {
        title: "NEET Registration",
        date: "2023-03-01",
        description: "Registration for NEET examination opens for MBBS admissions.",
      },
      {
        title: "NEET Examination",
        date: "2023-05-15",
        description: "NEET examination for MBBS admissions.",
      },
      {
        title: "Result Declaration",
        date: "2023-06-10",
        description: "Declaration of NEET results.",
      },
      {
        title: "Counseling Process Begins",
        date: "2023-06-20",
        description: "AIIMS counseling process begins.",
        important: "Candidates must register for counseling separately.",
      },
      {
        title: "First Round Seat Allocation",
        date: "2023-06-25",
        description: "First round of seat allocation by AIIMS.",
      },
      {
        title: "Fee Payment Deadline",
        date: "2023-07-15",
        description: "Last date for fee payment and document verification for confirmed seats.",
        important: "Failure to pay fees will result in cancellation of admission.",
      },
      {
        title: "Orientation Program",
        date: "2023-08-05",
        description: "Orientation program for newly admitted students.",
      },
      {
        title: "Commencement of Classes",
        date: "2023-09-01",
        description: "Classes begin for the new academic session.",
      },
    ],
    news: [
      {
        title: "AIIMS Delhi Launches New M.D. Program in Internal Medicine",
        date: "2023-06-01",
        content:
          "AIIMS Delhi has introduced a new M.D. program in Internal Medicine starting from the academic year 2023-24. The program aims to enhance the skills of medical professionals in diagnosing and treating internal diseases.",
        link: "#",
      },
      {
        title: "AIIMS Delhi Receives National Award for Healthcare Excellence",
        date: "2023-05-25",
        content:
          "AIIMS Delhi has been awarded the National Award for Excellence in Healthcare Services for its outstanding contributions to medical education and patient care.",
        link: "#",
      },
    ],
    videos: [
      {
        title: "Campus Tour - AIIMS Delhi",
        youtubeId: "dQw4w9WgXcQ",
        description: "Explore the world-class facilities and campus of AIIMS Delhi.",
      },
      {
        title: "Medical Research at AIIMS Delhi",
        youtubeId: "dQw4w9WgXcQ",
        description: "Discover the latest medical research happening at AIIMS Delhi.",
      },
    ],
  },
  // Adding a new college with different state and city
  {
    id: 3,
    slug: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    shortDescription: "Premier business school known for excellence in management education and research.",
    metaTitle: "IIM Ahmedabad - Top MBA College in India | Courses, Admission, Placements",
    metaDescription:
      "Discover IIM Ahmedabad, India's premier business school. Learn about MBA programs, admission process, fees, placements, and campus life at this top-ranked management institute.",
    type: "Government",
    established: 1961,
    state: "Gujarat",
    city: "Ahmedabad",
    address: "Vastrapur, Ahmedabad, Gujarat 380015",
    location: {
      latitude: 23.0325,
      longitude: 72.5292,
    },
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=400&width=1200",
    website: "https://www.iima.ac.in/",
    email: "info@iima.ac.in",
    phone: "+91-79-66324000",
    verified: true,
    accreditation: "NAAC A++",
    tags: ["Management", "Business", "Research", "Premier Institute", "NIRF Top 10"],
  },
  // Adding another college with different state and city
  {
    id: 4,
    slug: "nit-trichy",
    name: "National Institute of Technology Tiruchirappalli",
    shortDescription: "Leading technical institution known for engineering education and research.",
    metaTitle: "NIT Trichy - Top Engineering College in South India | Courses, Admission, Fees",
    metaDescription:
      "Explore NIT Tiruchirappalli, one of India's top engineering institutes. Get details about B.Tech and M.Tech programs, admission process, campus facilities, and placement opportunities.",
    type: "Government",
    established: 1964,
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    address: "Tiruchirappalli, Tamil Nadu 620015",
    location: {
      latitude: 10.7605,
      longitude: 78.8144,
    },
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=400&width=1200",
    website: "https://www.nitt.edu/",
    email: "info@nitt.edu",
    phone: "+91-431-2503000",
    verified: true,
    accreditation: "NAAC A+",
    tags: ["Engineering", "Technology", "Research", "Premier Institute"],
  },
  // Adding a private college
  {
    id: 5,
    slug: "manipal-university",
    name: "Manipal Academy of Higher Education",
    shortDescription: "Leading private university offering programs in healthcare, engineering, and management.",
    metaTitle: "Manipal University - Top Private University in India | Courses, Admission, Fees",
    metaDescription:
      "Discover Manipal Academy of Higher Education, a leading private university in India. Explore programs in medicine, engineering, management, and more, along with admission details and campus facilities.",
    type: "Private",
    established: 1953,
    state: "Karnataka",
    city: "Manipal",
    address: "Madhav Nagar, Manipal, Karnataka 576104",
    location: {
      latitude: 13.3524,
      longitude: 74.7937,
    },
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=400&width=1200",
    website: "https://manipal.edu/",
    email: "info@manipal.edu",
    phone: "+91-820-2922675",
    verified: true,
    accreditation: "NAAC A+",
    tags: ["Medical", "Engineering", "Management", "Private University"],
  },
]

export const sponsoredColleges = [
  {
    id: 101,
    slug: "vit-vellore",
    name: "Vellore Institute of Technology",
    shortDescription:
      "Leading private university offering engineering, science, and management programs with global recognition.",
    metaTitle: "VIT Vellore - Top Engineering University in India | Courses, Admission, Placements",
    metaDescription:
      "Explore VIT Vellore, a premier private engineering university. Learn about B.Tech, M.Tech programs, admission process, international collaborations, and excellent placement opportunities.",
    type: "Private",
    established: 1984,
    state: "Tamil Nadu",
    city: "Vellore",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://vit.ac.in/",
    verified: true,
    tags: ["Engineering", "Technology", "Research", "International Collaborations", "Placement Excellence"],
  },
  {
    id: 102,
    slug: "amity-noida",
    name: "Amity University",
    shortDescription: "One of India's leading private education groups with campuses across the country and abroad.",
    metaTitle: "Amity University Noida - Top Private University | Courses, Admission, Fees",
    metaDescription:
      "Discover Amity University Noida, one of India's largest private education groups. Explore diverse programs in engineering, management, law, and more, along with global campus opportunities.",
    type: "Private",
    established: 2003,
    state: "Uttar Pradesh",
    city: "Noida",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://www.amity.edu/",
    verified: true,
    tags: ["Multi-disciplinary", "Global Campus", "Industry Connections", "Research"],
  },
  {
    id: 103,
    slug: "srm-chennai",
    name: "SRM Institute of Science and Technology",
    shortDescription: "Leading private university known for engineering, medicine, management, and science programs.",
    metaTitle: "SRM Chennai - Top Engineering & Medical University | Courses, Admission, Fees",
    metaDescription:
      "Explore SRM Institute of Science and Technology, Chennai. Get details about engineering, medical, and management programs, admission process, international collaborations, and placement opportunities.",
    type: "Private",
    established: 1985,
    state: "Tamil Nadu",
    city: "Chennai",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://www.srmist.edu.in/",
    verified: true,
    tags: ["Engineering", "Medical", "Management", "International Collaborations"],
  },
  // Adding a new sponsored college with different state and city
  {
    id: 104,
    slug: "bits-pilani",
    name: "BITS Pilani",
    shortDescription: "Premier private technical university known for engineering and science education.",
    metaTitle: "BITS Pilani - Top Technical University in India | Courses, Admission, Placements",
    metaDescription:
      "Discover BITS Pilani, a leading technical university in India. Learn about engineering and science programs, admission process through BITSAT, campus facilities, and excellent placement record.",
    type: "Private",
    established: 1964,
    state: "Rajasthan",
    city: "Pilani",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://www.bits-pilani.ac.in/",
    verified: true,
    tags: ["Engineering", "Technology", "Research", "Private University"],
  },
  // Adding another sponsored college with different state and city
  {
    id: 105,
    slug: "symbiosis-pune",
    name: "Symbiosis International University",
    shortDescription: "Leading private university known for management, law, and liberal arts programs.",
    metaTitle: "Symbiosis Pune - Top University for Management & Law | Courses, Admission, Fees",
    metaDescription:
      "Explore Symbiosis International University, Pune. Get information about management, law, and liberal arts programs, admission process, international student opportunities, and campus facilities.",
    type: "Deemed",
    established: 2002,
    state: "Maharashtra",
    city: "Pune",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://www.symbiosis.ac.in/",
    verified: true,
    tags: ["Management", "Law", "Liberal Arts", "International Students"],
  },
]
