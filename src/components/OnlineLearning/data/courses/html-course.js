export const htmlCourseData = {
  id: "html",
  title: "Complete HTML Mastery",
  subtitle: "India's Best HTML Course for Beginners",
  iconName: "Language", // Use string instead of component
  color: "from-orange-500 to-red-500",
  duration: "4 Days",
  level: "Beginner",
  projects: 4,
  category: "markup",
  rating: 4.9,
  students: "12.5k+",
  lectures: 4,
  isPopular: true,
  features: ["Semantic HTML", "Forms", "Media", "SEO", "Projects"],
  overview: `Welcome to Complete HTML Mastery, a premium course crafted specifically for learners who want to master HTML from the ground up. Whether you're a beginner, a student, or a digital marketing professional, this course is designed to help you build strong foundational knowledge in HTML. Aligned with Skill India guidelines and optimized for YouTube delivery, this course comprises 4 detailed 30-minute sessions packed with practical insights, live demos, real-world use cases, storytelling, and engaging mini-projects.`,

  description:
    "Master HTML from basics to advanced with 4 comprehensive sessions, hands-on projects, and real-world examples designed for Indian learners.",

  targetAudience: [
    "Beginners with no coding experience",
    "Students of computer science, IT, or digital marketing",
    "Aspiring web developers",
    "Bloggers and content creators",
    "Anyone preparing for Skill India certification",
    "Teachers and trainers",
  ],

  achievements: [
    "Deep, confident knowledge of HTML",
    "4+ hands-on mini-projects ready for your resume",
    "Foundation to jump into CSS, JavaScript, React",
    "Skill India certification-ready learning experience",
    "Templates and snippets to reuse in your real work",
  ],

  lectures: [
    {
      id: 1,
      title: "Web Fundamentals + HTML Basics",
      subtitle: "What is HTML? Structure of a Web Page – The Real Beginning",
      duration: "30 minutes",
      youtubeUrl: "https://youtube.com/watch?v=example1",
      hasQuiz: true,
      hasProject: true,
      objectives: [
        "Understand how the web works (client-server interaction)",
        "Set up your development environment",
        "Create your first HTML document and explore its anatomy",
      ],
      topics: [
        {
          timeRange: "00:00 – 03:00",
          title: "Journey of the Web",
          description: 'Understanding what happens when you type "www.google.com"',
          keyPoints: [
            "Browser requests and server responses",
            "How HTML loads in the browser",
            "Story-based animation explanation",
          ],
        },
        {
          timeRange: "03:01 – 05:00",
          title: "What is HTML, really?",
          description: "HTML as the language of structure",
          keyPoints: [
            "Why browsers understand only HTML/CSS/JS",
            "Analogy: HTML is like the bricks and blueprint of a house",
          ],
        },
        {
          timeRange: "05:01 – 10:00",
          title: "Setting Up Tools (With Demo)",
          description: "Complete development environment setup",
          keyPoints: [
            "Install VS Code",
            "Install Live Server",
            "Folder structure: /projects/html-course/index.html",
            "Extensions, icons, and file formats",
          ],
        },
        {
          timeRange: "10:01 – 15:00",
          title: "HTML Skeleton: The Building Blocks",
          description: "Understanding the basic structure of HTML",
          keyPoints: [
            "Doctype explained in layman's terms",
            "Create full skeleton with: <!DOCTYPE html>, <html>, <head>, <body>",
            "How browser reads top to bottom",
          ],
        },
        {
          timeRange: "15:01 – 22:00",
          title: "Displaying Text: Headings + Paragraphs",
          description: "Working with text content in HTML",
          keyPoints: [
            "Demo all heading tags <h1> to <h6>",
            "Compare them visually in browser",
            "Paragraphs with <p>, break lines with <br>, horizontal line <hr>",
            "Readability, spacing, and clarity",
          ],
        },
        {
          timeRange: "22:01 – 27:00",
          title: "Formatting Text (Emphasis & Meaning)",
          description: "Adding meaning and emphasis to text",
          keyPoints: [
            "<b> vs <strong> (meaningful bold)",
            "<i> vs <em> (emphasis for screen readers)",
            "<mark> to highlight keywords",
            "<sup>, <sub> in formulas",
          ],
        },
        {
          timeRange: "27:01 – 30:00",
          title: "Hands-On + Challenge",
          description: "Build your first HTML page",
          keyPoints: [
            'Build an "About Me" page',
            "Include headings, bio, line breaks, and formatting",
            "Bonus: Add favorite quote using <blockquote>",
          ],
        },
      ],
      challenge: {
        description: 'Build an "About Me" page using everything learned in this lecture.',
        requirements: [
          "Use proper HTML skeleton structure",
          "Include at least 3 different heading levels",
          "Write a short bio using paragraphs",
          "Add line breaks and formatting",
          "Include a favorite quote using blockquote",
        ],
      },
      quiz: {
        description: "Test your understanding of HTML basics",
        questions: [
          "What does DOCTYPE html tell the browser?",
          "What's the difference between <b> and <strong> tags?",
          "Which tag is used for the main content area of a webpage?",
        ],
      },
    },
    {
      id: 2,
      title: "Links, Lists, Images & Semantic HTML",
      subtitle: "Adding Media & Navigation – HTML That Talks",
      duration: "30 minutes",
      youtubeUrl: "https://youtube.com/watch?v=example2",
      hasQuiz: true,
      hasProject: true,
      objectives: [
        "Create hyperlinks to connect pages and sections",
        "Insert and customize images for responsive design",
        "Understand semantic HTML layout for modern websites",
      ],
      topics: [
        {
          timeRange: "00:00 – 05:00",
          title: "The Power of Hyperlinks",
          description: "Creating connections between pages and content",
          keyPoints: [
            '<a href="...">Link</a> syntax',
            "Difference: external vs internal links",
            "Link to YouTube video, email, and phone number",
            "Target attribute demo",
          ],
        },
        {
          timeRange: "05:01 – 10:00",
          title: "Types of Lists",
          description: "Organizing content with different list types",
          keyPoints: [
            "Unordered list: <ul>",
            "Ordered list: <ol>",
            "Definition list: <dl>",
            "Nested lists and practical use in menus",
          ],
        },
        {
          timeRange: "10:01 – 17:00",
          title: "Adding Images",
          description: "Working with images in HTML",
          keyPoints: [
            '<img src="...">, alt, title, width, height',
            "Best practices for SEO and speed",
            "Responsive example with percentage width",
          ],
        },
        {
          timeRange: "17:01 – 22:00",
          title: "Semantic Tags for Real Layouts",
          description: "Modern HTML structure with semantic elements",
          keyPoints: [
            "Difference between <div> and <section>",
            "Real-life structure: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>",
            "Demo layout of a newspaper/blog using HTML only",
          ],
        },
        {
          timeRange: "22:01 – 28:00",
          title: "Live Project Demo",
          description: "Building a complete blog template",
          keyPoints: [
            "Create a blog template with all tags used so far",
            "Use dummy content (Lorem Ipsum) + placeholder image",
          ],
        },
        {
          timeRange: "28:01 – 30:00",
          title: "Quiz + Challenge",
          description: "Test knowledge and build a travel blog",
          keyPoints: [
            "3 MCQs: Find the correct tag, fix broken HTML",
            "Build a travel blog homepage with image, heading, and menu",
          ],
        },
      ],
      challenge: {
        description: "Create a travel blog homepage with navigation, images, and semantic structure.",
        requirements: [
          "Use semantic HTML tags for layout",
          "Include a navigation menu with links",
          "Add at least 2 images with proper alt text",
          "Create both ordered and unordered lists",
          "Use proper heading hierarchy",
        ],
      },
      quiz: {
        description: "Test your knowledge of links, lists, and semantic HTML",
        questions: [
          "Which attribute makes a link open in a new tab?",
          "What's the difference between <section> and <div>?",
          "Which tag is best for the main navigation of a website?",
        ],
      },
    },
    {
      id: 3,
      title: "Forms, Inputs, Tables & Media",
      subtitle: "HTML That Interacts – Forms, Tables & Videos",
      duration: "30 minutes",
      youtubeUrl: "https://youtube.com/watch?v=example3",
      hasQuiz: true,
      hasProject: true,
      objectives: [
        "Accept data through forms and user inputs",
        "Display structured data in tables",
        "Embed videos, audio, and YouTube content",
      ],
      topics: [
        {
          timeRange: "00:00 – 05:00",
          title: "Forms: Why They Matter",
          description: "Understanding the importance of forms in web development",
          keyPoints: ["Login forms, feedback, checkout forms", "Anatomy: <form>, action, method"],
        },
        {
          timeRange: "05:01 – 12:00",
          title: "Inputs in Detail",
          description: "Different types of form inputs and their uses",
          keyPoints: [
            "<input> types: text, email, password, checkbox, radio, range",
            "<textarea>, <select>, <option>",
            "Use of label, required, placeholder, disabled",
          ],
        },
        {
          timeRange: "12:01 – 17:00",
          title: "Create a Feedback Form",
          description: "Building a complete interactive form",
          keyPoints: ["Full example: name, email, rating, message", "Add a submit and reset button"],
        },
        {
          timeRange: "17:01 – 22:00",
          title: "HTML Tables Explained",
          description: "Displaying structured data with tables",
          keyPoints: ["<table>, <tr>, <td>, <th>", "Styling basics, header/footer rows, merging cells"],
        },
        {
          timeRange: "22:01 – 26:00",
          title: "Multimedia Content",
          description: "Adding rich media to your websites",
          keyPoints: [
            "Add a video with <video controls>",
            "Add background music using <audio>",
            "Embed YouTube with <iframe> and autoplay",
          ],
        },
        {
          timeRange: "26:01 – 30:00",
          title: "Activity + Quiz",
          description: "Hands-on practice and knowledge check",
          keyPoints: ["Build a course registration form with table summary", "Quiz: Match tags with functions"],
        },
      ],
      challenge: {
        description: "Build a complete course registration form with multimedia elements.",
        requirements: [
          "Create a registration form with various input types",
          "Include a table showing course details",
          "Add a video or audio element",
          "Use proper labels and form validation",
          "Include submit and reset buttons",
        ],
      },
      quiz: {
        description: "Test your understanding of forms, tables, and media",
        questions: [
          "Which input type is best for email addresses?",
          "What tag is used for table headers?",
          "How do you make a form field required?",
        ],
      },
    },
    {
      id: 4,
      title: "SEO, Final Project & Best Practices",
      subtitle: "From Learner to Creator – HTML Masterclass Finale",
      duration: "30 minutes",
      youtubeUrl: "https://youtube.com/watch?v=example4",
      hasQuiz: true,
      hasProject: true,
      objectives: [
        "Optimize HTML with meta tags for SEO",
        "Build a complete website from scratch",
        "Apply clean code, accessibility and validation rules",
      ],
      topics: [
        {
          timeRange: "00:00 – 05:00",
          title: "Meta Tags for Search Engines",
          description: "Optimizing your HTML for search engines",
          keyPoints: ['<meta charset>, <meta name="viewport">', "SEO tags: description, keywords, social preview"],
        },
        {
          timeRange: "05:01 – 12:00",
          title: "Accessibility & Professional Code",
          description: "Writing clean, accessible HTML",
          keyPoints: [
            "Role of alt text, aria-labels, and tab order",
            "Commenting HTML code",
            "Indentation and spacing",
            "Naming conventions",
          ],
        },
        {
          timeRange: "12:01 – 25:00",
          title: "Final Project: Personal Portfolio Website",
          description: "Building a complete website from scratch",
          keyPoints: [
            "Homepage: photo + intro + skills",
            "Contact page: form + footer",
            "Internal links for navigation",
            "Project deployment suggestion (GitHub Pages)",
          ],
        },
        {
          timeRange: "25:01 – 30:00",
          title: "Recap & Future Scope",
          description: "Course summary and next steps",
          keyPoints: [
            "Recap all 4 lectures",
            "What's next? CSS, JS, Responsive Design",
            "Motivation: You can build websites that change lives",
            "Encourage learners to upload projects on GitHub or Google Drive",
          ],
        },
      ],
      challenge: {
        description: "Build a complete personal portfolio website using all HTML concepts learned.",
        requirements: [
          "Create multiple pages with navigation",
          "Include proper SEO meta tags",
          "Use semantic HTML structure",
          "Add a contact form",
          "Include images, links, and multimedia",
          "Follow accessibility best practices",
        ],
      },
      quiz: {
        description: "Final assessment of HTML mastery",
        questions: [
          "Which meta tag is essential for mobile responsiveness?",
          "What's the purpose of the alt attribute in images?",
          "How do you create internal links between pages?",
        ],
      },
    },
  ],
}
