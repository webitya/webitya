const influencers = [ 
  {
    slug: "pravin-brother",
    name: "Pravin Brother",
    category: "Actor | Content Creator",
    image: "/influencers/pravinbrother.png",
    followers: "326K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Pravin%20Brother",
    description: "Pravin is a talented actor and content creator known for his unique storytelling and charm.",
    age: 25,
    height: "5'8\"",
    startingPrice: "₹2,000",
    workingFields: {
      collaborator: "₹5,000 - ₹8,000",
      shopPromotion: "₹4,000 - ₹7,000",
      storyPromotion: "₹2,000 - ₹3,500",
      brandPromotion: "₹6,000 - ₹10,000"
    },
    demoVideos: ["/influencers/1.mp4", "/influencers/1.mp4", "/influencers/1.mp4"],
    gallery: ["/influencers/pravinbrother.png", "/influencers/pravinbrother.png", "/influencers/pravinbrother.png", "/influencers/pravinbrother.png"]
  },
  {
    slug: "anjali-mahto",
    name: "Anjali Mahto",
    category: "Fashion",
    image: "/influencers/anjalimahto.png",
    followers: "709K+",
    link: "https://bookwith.me/anjali",
    description: "Anjali is a trending fashion influencer from Ranchi who collaborates with popular brands.",
    age: 22,
    height: "5'6\"",
    startingPrice: "₹1,500",
    workingFields: {
      collaborator: "₹3,000 - ₹6,000",
      shopPromotion: "₹2,500 - ₹5,000",
      storyPromotion: "₹1,500 - ₹2,500",
      brandPromotion: "₹4,000 - ₹7,000"
    },
    demoVideos: ["/demos/anjali1.mp4", "/demos/anjali2.mp4", "/demos/anjali3.mp4"],
    gallery: ["/gallery/anjali1.jpg", "/gallery/anjali2.jpg", "/gallery/anjali3.jpg"]
  },
  {
    slug: "sau-mya",
    name: "Sau Mya",
    category: "Fashion Model Content-Creator",
    image: "/influencers/sau-mya/img4.jpg",
    followers: "7.2K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Preeti%20Raj",
    description: "Preeti is a rising fashion model known for bold style and elegant shoots.",
    age: 18,
    height: "5'3\"",
    startingPrice: "₹3,000",
    workingFields: {
      collaborator: "₹4,000 - ₹5,000",
      shopPromotion: "₹3,000 - ₹5,000",
      storyPromotion: "₹3,000 - ₹4,500",
      brandPromotion: "₹4,000 - ₹5,000"
    },
    demoVideos: ["/influencers/sau-mya/1.mp4", "/influencers/sau-mya/2.mp4", "/influencers/sau-mya/3.mp4"],
    gallery: ["/influencers/sau-mya/img1.webp", "/influencers/sau-mya/img2.webp", "/influencers/sau-mya/img3.webp", "/influencers/sau-mya/img4.webp"]
  },
  {
    slug: "rahul-chauhan",
    name: "Rahul Chauhan",
    category: "Lifestyle | For Ads",
    image: "/influencers/rahulchauhan.png",
    followers: "430K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Rahul%20Chauhan",
    description: "Rahul shares powerful lifestyle content and is open for brand collaborations.",
    age: 27,
    height: "5'9\"",
    startingPrice: "₹2,000",
    workingFields: {
      collaborator: "₹5,000 - ₹7,500",
      shopPromotion: "₹4,000 - ₹6,500",
      storyPromotion: "₹2,000 - ₹3,500",
      brandPromotion: "₹7,000 - ₹11,000"
    },
    demoVideos: ["/demos/rahul1.mp4", "/demos/rahul2.mp4", "/demos/rahul3.mp4"],
    gallery: ["/gallery/rahul1.jpg", "/gallery/rahul2.jpg", "/gallery/rahul3.jpg"]
  },
  {
    slug: "nisha-soni",
    name: "Nisha Soni",
    category: "Beauty | Influencer",
    image: "/influencers/nishasoni.png",
    followers: "650K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Nisha%20Soni",
    description: "Nisha shares beauty tips and skincare routines with a growing audience.",
    age: 23,
    height: "5'5\"",
    startingPrice: "₹3,000",
    workingFields: {
      collaborator: "₹6,000 - ₹9,000",
      shopPromotion: "₹5,000 - ₹7,500",
      storyPromotion: "₹3,000 - ₹4,000",
      brandPromotion: "₹9,000 - ₹13,000"
    },
    demoVideos: ["/demos/nisha1.mp4", "/demos/nisha2.mp4", "/demos/nisha3.mp4"],
    gallery: ["/gallery/nisha1.jpg", "/gallery/nisha2.jpg", "/gallery/nisha3.jpg"]
  },
  {
    slug: "aman-singh",
    name: "Aman Singh",
    category: "Fitness | Creator",
    image: "/influencers/amansingh.png",
    followers: "390K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Aman%20Singh",
    description: "Aman is a fitness enthusiast and motivator for the youth.",
    age: 26,
    height: "6'0\"",
    startingPrice: "₹2,000",
    workingFields: {
      collaborator: "₹4,000 - ₹7,000",
      shopPromotion: "₹3,000 - ₹5,000",
      storyPromotion: "₹2,000 - ₹3,000",
      brandPromotion: "₹6,000 - ₹9,000"
    },
    demoVideos: ["/demos/aman1.mp4", "/demos/aman2.mp4", "/demos/aman3.mp4"],
    gallery: ["/gallery/aman1.jpg", "/gallery/aman2.jpg", "/gallery/aman3.jpg"]
  },
  {
    slug: "akjali-mahto",
    name: "Akjali Mahto",
    category: "Creator | Influencer",
    image: "/influencers/anjalimahto.png",
    followers: "709K",
    link: "https://wa.me/917323839108?text=I%20want%20to%20book%20Akjali%20Mahto",
    description: "Akjali creates fun, trendy content that resonates with young audiences.",
    age: 21,
    height: "5'4\"",
    startingPrice: "₹2,500",
    workingFields: {
      collaborator: "₹5,500 - ₹8,500",
      shopPromotion: "₹4,500 - ₹7,000",
      storyPromotion: "₹2,500 - ₹4,000",
      brandPromotion: "₹7,000 - ₹11,000"
    },
    demoVideos: ["/demos/akjali1.mp4", "/demos/akjali2.mp4", "/demos/akjali3.mp4"],
    gallery: ["/gallery/akjali1.jpg", "/gallery/akjali2.jpg", "/gallery/akjali3.jpg", "/gallery/akjali3.jpg"]
  }
];

export default influencers;
