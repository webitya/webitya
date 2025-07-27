export const htmlArticles = [
  {
    id: 10, // Changed ID
    slug: "essential-html5-features-guide",
    title: "Essential HTML5 Features Every Developer Should Know",
    metaTitle: "HTML5 Features Guide: Semantic Tags, Multimedia, APIs | Webitya Blog",
    metaDescription:
      "A comprehensive guide to essential HTML5 features including semantic elements, multimedia tags, and new APIs for modern web development.",
    excerpt: "Unlock the power of modern web development with a deep dive into HTML5's most impactful features.",
    content: `
      <p>HTML5 brought a revolution to web development, introducing a plethora of new features that empower developers to create richer, more interactive, and semantically meaningful web pages without relying heavily on plugins.</p>
      <h2>Semantic HTML5 Elements</h2>
      <p>Semantic tags provide meaning to the content they contain, improving accessibility and SEO:</p>
      <ul>
        <li><code>&lt;header&gt;</code>: Represents introductory content, typically containing navigation or branding.</li>
        <li><code>&lt;nav&gt;</code>: Defines a set of navigation links.</li>
        <li><code>&lt;main&gt;</code>: Represents the dominant content of the <code>&lt;body&gt;</code>.</li>
        <li><code>&lt;article&gt;</code>: Represents self-contained content, like a blog post or news article.</li>
        <li><code>&lt;section&gt;</code>: Groups related content, often with a heading.</li>
        <li><code>&lt;aside&gt;</code>: Represents content that is tangentially related to the content around it, like a sidebar.</li>
        <li><code>&lt;footer&gt;</code>: Contains authorship information, copyright data, or related documents.</li>
      </ul>
      <h2>Multimedia and Graphics</h2>
      <p>HTML5 made embedding multimedia native to the browser:</p>
      <ul>
        <li><code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code>: Native support for embedding video and audio without third-party plugins.</li>
        <li><code>&lt;canvas&gt;</code>: Provides a drawing surface for graphics, animations, and games using JavaScript.</li>
        <li><code>&lt;svg&gt;</code>: Scalable Vector Graphics for high-quality, resolution-independent images.</li>
      </ul>
      <h2>New APIs and Forms</h2>
      <p>HTML5 introduced powerful APIs and enhanced form capabilities:</p>
      <ul>
        <li><strong>Geolocation API:</strong> Access user's geographical location.</li>
        <li><strong>Drag and Drop API:</strong> Enable drag-and-drop functionality.</li>
        <li><strong>Web Storage (localStorage, sessionStorage):</strong> Client-side data storage.</li>
        <li><strong>New Input Types:</strong> <code>email</code>, <code>url</code>, <code>number</code>, <code>date</code>, <code>range</code>, etc., with built-in validation.</li>
      </ul>
      <p>Understanding and utilizing these HTML5 features is fundamental for building modern, accessible, and performant web experiences.</p>
    `,
    category: "HTML",
    author: "Aditya Kumar",
    authorBio:
      "Data Scientist, Full Stack Developer and Skill India Certified Digital marketing Trainer. Specializing in frontend technologies and web standards.",
    authorImage: "/webityaProfile.webp?height=100&width=100",
    publishDate: "2025-06-20",
    updatedDate: "2025-06-20",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=1200",
    imageAlt: "HTML5 logo with various web development icons",
    tags: ["HTML", "HTML5", "Web Standards", "Frontend", "Web Development"],
    isPopular: false,
    isRecent: true,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Essential HTML5 Features Every Developer Should Know",
      description:
        "A comprehensive guide to essential HTML5 features including semantic elements, multimedia tags, and new APIs for modern web development.",
      author: {
        "@type": "Person",
        name: "Aditya Kumar",
      },
      datePublished: "2025-06-20",
      dateModified: "2025-06-20",
      publisher: {
        "@type": "Organization",
        name: "Webitya",
        logo: {
          "@type": "ImageObject",
          url: "https://webitya.com/logo.png",
        },
      },
      keywords: "HTML5, semantic HTML, web development, multimedia, HTML APIs, frontend",
    },
  },
]
