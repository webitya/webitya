// This file contains mock data and functions to simulate fetching blog data
// In a real application, this would be replaced with actual API calls or database queries

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "10 SEO Strategies That Actually Work in 2025",
    slug: "seo-strategies-2025",
    excerpt:
      "Discover the most effective SEO strategies that are driving real results in 2025, from AI-powered content optimization to voice search tactics.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=SEO+Strategies",
    date: "May 10, 2025",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=200&width=200&text=SJ",
    authorBio: "SEO Specialist with over 10 years of experience helping businesses improve their search rankings.",
    category: "SEO",
    tags: ["seo", "digital marketing", "content", "google algorithm"],
    readTime: 8,
    sponsored: false,
    content: [
      {
        type: "paragraph",
        content:
          "Search Engine Optimization continues to evolve at a rapid pace. What worked a few years ago might not be effective today. In this article, we'll explore the most effective SEO strategies that are driving real results in 2025.",
      },
      {
        type: "heading",
        content: "1. AI-Powered Content Optimization",
      },
      {
        type: "paragraph",
        content:
          "With the advancement of AI technologies, content optimization has reached new heights. AI tools can now analyze top-performing content in your niche and provide specific recommendations for improving your content's relevance and quality.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800&text=AI+Content+Optimization",
        alt: "AI Content Optimization",
        caption: "AI tools analyzing content performance and providing optimization suggestions",
      },
      {
        type: "heading",
        content: "2. Voice Search Optimization",
      },
      {
        type: "paragraph",
        content:
          "As voice assistants become more prevalent, optimizing for voice search is no longer optional. Focus on conversational keywords and questions that people might ask when using voice search.",
      },
      {
        type: "list",
        items: [
          "Use conversational, long-tail keywords",
          "Create FAQ pages that answer common questions",
          "Optimize for featured snippets",
          "Improve your local SEO for voice searches",
        ],
      },
      {
        type: "heading",
        content: "3. User Experience Signals",
      },
      {
        type: "paragraph",
        content:
          "Google's algorithms now heavily weigh user experience signals when determining rankings. This includes page load speed, mobile-friendliness, and overall site usability.",
      },
      {
        type: "quote",
        content:
          "In 2025, the websites that provide the best user experience will win the SEO game, regardless of how many backlinks they have.",
      },
      {
        type: "youtube",
        videoId: "dQw4w9WgXcQ",
        caption: "Watch our detailed tutorial on improving user experience signals",
      },
      {
        type: "heading",
        content: "4. E-E-A-T Principles",
      },
      {
        type: "paragraph",
        content:
          "Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) have become crucial ranking factors. Ensure your content demonstrates these qualities by including author bios, citing sources, and showcasing your expertise in your field.",
      },
      {
        type: "heading",
        content: "5. Semantic SEO",
      },
      {
        type: "paragraph",
        content:
          "Rather than focusing solely on keywords, semantic SEO involves understanding the context and intent behind search queries. Create comprehensive content that covers topics in-depth and answers related questions.",
      },
    ],
    youtubeVideos: [
      {
        videoId: "dQw4w9WgXcQ",
        title: "SEO Strategies for 2025 - Expert Tips",
      },
      {
        videoId: "dQw4w9WgXcQ",
        title: "How to Optimize for Voice Search",
      },
    ],
  },
  {
    id: 2,
    title: "Social Media Marketing Trends to Watch in 2025",
    slug: "social-media-trends-2025",
    excerpt:
      "Stay ahead of the curve with these emerging social media marketing trends that will dominate the digital landscape in 2025.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Social+Media+Trends",
    date: "May 8, 2025",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=200&width=200&text=MC",
    authorBio: "Social Media Strategist who has worked with Fortune 500 companies to develop their digital presence.",
    category: "Social Media",
    tags: ["social media", "digital marketing", "trends", "tiktok", "instagram"],
    readTime: 6,
    sponsored: false,
    content: [
      {
        type: "paragraph",
        content:
          "The social media landscape is constantly evolving, with new platforms, features, and trends emerging regularly. To stay competitive, marketers need to stay ahead of these changes and adapt their strategies accordingly.",
      },
      {
        type: "heading",
        content: "1. AI-Generated Content",
      },
      {
        type: "paragraph",
        content:
          "AI tools are now capable of creating engaging social media content, from captions to images and even short videos. While human creativity is still essential, AI can help scale content production and provide inspiration.",
      },
      {
        type: "heading",
        content: "2. Augmented Reality Experiences",
      },
      {
        type: "paragraph",
        content:
          "AR filters and experiences have become a staple of social media marketing. Brands are creating interactive AR experiences that allow users to virtually try products or engage with branded content in new ways.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800&text=AR+Experiences",
        alt: "Augmented Reality Social Media Experiences",
        caption: "Users engaging with AR filters and experiences on social media",
      },
    ],
  },
  {
    id: 3,
    title: "Email Marketing Automation: A Complete Guide",
    slug: "email-marketing-automation-guide",
    excerpt:
      "Learn how to implement effective email marketing automation to nurture leads, increase conversions, and save time.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Email+Marketing",
    date: "May 5, 2025",
    author: "Emily Rodriguez",
    authorImage: "/placeholder.svg?height=200&width=200&text=ER",
    authorBio: "Email Marketing Specialist with expertise in automation and conversion optimization.",
    category: "Email Marketing",
    tags: ["email marketing", "automation", "lead nurturing", "conversions"],
    readTime: 10,
    sponsored: false,
    content: [],
  },
  {
    id: 4,
    title: "Content Marketing Strategy for B2B Companies",
    slug: "b2b-content-marketing-strategy",
    excerpt: "Develop a content marketing strategy that generates high-quality leads for your B2B business.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=B2B+Content",
    date: "May 3, 2025",
    author: "David Wilson",
    authorImage: "/placeholder.svg?height=200&width=200&text=DW",
    authorBio: "B2B Marketing Consultant who has helped over 50 companies develop effective content strategies.",
    category: "Content Marketing",
    tags: ["b2b", "content marketing", "lead generation", "strategy"],
    readTime: 9,
    sponsored: false,
    content: [],
  },
  {
    id: 5,
    title: "The Ultimate Guide to Google Analytics 5",
    slug: "google-analytics-5-guide",
    excerpt:
      "Master the latest version of Google Analytics with this comprehensive guide to tracking, reporting, and analyzing your website data.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Google+Analytics",
    date: "May 1, 2025",
    author: "Alex Thompson",
    authorImage: "/placeholder.svg?height=200&width=200&text=AT",
    authorBio: "Data Analytics Expert specializing in Google Analytics and data-driven marketing strategies.",
    category: "Analytics",
    tags: ["google analytics", "data", "reporting", "website analytics"],
    readTime: 12,
    sponsored: false,
    content: [],
  },
  {
    id: 6,
    title: "Maximize Your ROI with These PPC Strategies",
    slug: "maximize-ppc-roi",
    excerpt:
      "Discover proven strategies to improve your pay-per-click advertising ROI across Google, Facebook, and other platforms.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=PPC+Strategies",
    date: "April 28, 2025",
    author: "Jennifer Lee",
    authorImage: "/placeholder.svg?height=200&width=200&text=JL",
    authorBio: "PPC Specialist who has managed over $10 million in ad spend for clients across various industries.",
    category: "PPC",
    tags: ["ppc", "google ads", "facebook ads", "roi", "advertising"],
    readTime: 7,
    sponsored: true,
    sponsorLink: "https://webitya.com/services/ppc",
    content: [],
  },
  {
    id: 7,
    title: "Video Marketing Trends for 2025",
    slug: "video-marketing-trends-2025",
    excerpt:
      "Explore the latest video marketing trends and learn how to incorporate them into your digital marketing strategy.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Video+Marketing",
    date: "April 25, 2025",
    author: "Ryan Garcia",
    authorImage: "/placeholder.svg?height=200&width=200&text=RG",
    authorBio: "Video Marketing Strategist with a background in film production and digital marketing.",
    category: "Video Marketing",
    tags: ["video", "youtube", "tiktok", "content creation"],
    readTime: 8,
    sponsored: false,
    content: [],
  },
  {
    id: 8,
    title: "The Complete Guide to Influencer Marketing",
    slug: "influencer-marketing-guide",
    excerpt:
      "Learn how to identify, partner with, and measure the success of influencer marketing campaigns for your brand.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Influencer+Marketing",
    date: "April 22, 2025",
    author: "Sophia Kim",
    authorImage: "/placeholder.svg?height=200&width=200&text=SK",
    authorBio: "Influencer Marketing Manager who has worked with creators across Instagram, TikTok, and YouTube.",
    category: "Influencer Marketing",
    tags: ["influencers", "partnerships", "social media", "brand awareness"],
    readTime: 9,
    sponsored: false,
    content: [],
  },
  {
    id: 9,
    title: "How to Create a Digital Marketing Strategy from Scratch",
    slug: "digital-marketing-strategy-guide",
    excerpt: "A step-by-step guide to developing a comprehensive digital marketing strategy for your business.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Digital+Strategy",
    date: "April 20, 2025",
    author: "James Anderson",
    authorImage: "/placeholder.svg?height=200&width=200&text=JA",
    authorBio: "Digital Marketing Director with experience working with startups and established businesses.",
    category: "Strategy",
    tags: ["strategy", "planning", "digital marketing", "business growth"],
    readTime: 11,
    sponsored: true,
    sponsorLink: "https://webitya.com/services/strategy",
    content: [],
  },
  {
    id: 10,
    title: "Local SEO: How to Dominate Your Local Market",
    slug: "local-seo-dominate-market",
    excerpt:
      "Implement these local SEO tactics to improve your visibility in local search results and attract more customers.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Local+SEO",
    date: "April 18, 2025",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=200&width=200&text=SJ",
    authorBio: "SEO Specialist with over 10 years of experience helping businesses improve their search rankings.",
    category: "SEO",
    tags: ["local seo", "google my business", "local search", "maps"],
    readTime: 7,
    sponsored: false,
    content: [],
  },
  {
    id: 11,
    title: "The Future of E-commerce: Trends to Watch",
    slug: "future-ecommerce-trends",
    excerpt:
      "Explore the emerging technologies and trends that will shape the future of e-commerce in the coming years.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Ecommerce+Trends",
    date: "April 15, 2025",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=200&width=200&text=MC",
    authorBio:
      "E-commerce Consultant who has helped businesses increase their online sales and optimize their customer experience.",
    category: "E-commerce",
    tags: ["ecommerce", "online shopping", "retail", "trends"],
    readTime: 8,
    sponsored: false,
    content: [],
  },
  {
    id: 12,
    title: "Content Personalization: The Ultimate Guide",
    slug: "content-personalization-guide",
    excerpt: "Learn how to implement content personalization to improve engagement, conversions, and customer loyalty.",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Content+Personalization",
    date: "April 12, 2025",
    author: "Emily Rodriguez",
    authorImage: "/placeholder.svg?height=200&width=200&text=ER",
    authorBio: "Content Strategist specializing in personalization and customer experience optimization.",
    category: "Content Marketing",
    tags: ["personalization", "customer experience", "content strategy", "conversions"],
    readTime: 10,
    sponsored: true,
    sponsorLink: "https://webitya.com/services/content-marketing",
    content: [],
  },
]

// Function to get all blogs
export async function getAllBlogs() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return blogs
}

// Function to get blog by slug
export async function getBlogBySlug(slug) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return blogs.find((blog) => blog.slug === slug) || null
}

// Function to get related blogs
export async function getRelatedBlogs(category, currentId, limit = 3) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Filter blogs by category and exclude current blog
  const related = blogs.filter((blog) => blog.category === category && blog.id !== currentId).slice(0, limit)

  // If not enough related blogs by category, add some random ones
  if (related.length < limit) {
    const randomBlogs = blogs
      .filter((blog) => blog.id !== currentId && !related.some((r) => r.id === blog.id))
      .slice(0, limit - related.length)

    return [...related, ...randomBlogs]
  }

  return related
}

// Function to get categories
export async function getCategories() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Extract unique categories
  const categories = [...new Set(blogs.map((blog) => blog.category))]
  return categories
}

// Function to search blogs
export async function searchBlogs(query) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (!query) return blogs

  const lowercaseQuery = query.toLowerCase()

  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(lowercaseQuery) ||
      blog.excerpt.toLowerCase().includes(lowercaseQuery) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

// Function to get blogs by category
export async function getBlogsByCategory(category) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (category === "All") return blogs

  return blogs.filter((blog) => blog.category === category)
}

// Function to get popular tags
export async function getPopularTags(limit = 10) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Extract all tags and count occurrences
  const tagCounts = {}
  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  // Sort tags by count and return top ones
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}
