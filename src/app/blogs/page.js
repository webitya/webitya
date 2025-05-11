import BlogsPageLayout from "@/components/BlogsData/LayoutEl";
import Footer from "@/components/FooterEl";

export const metadata = {
  title: "Webitya Blog | Digital Marketing Insights, SEO Tips & Trends",
  description:
    "Read expert-written blogs on Digital Marketing, SEO, Content Strategy, Social Media Marketing, and more from Webitya to stay ahead in 2025.",
  keywords: [
    "Digital Marketing Blog",
    "SEO Tips",
    "Webitya",
    "Marketing Trends 2025",
    "Social Media Strategy",
    "Online Marketing Blog",
    "Content Marketing",
    "Email Marketing",
  ],
  alternates: {
    canonical: "https://www.webitya.com/blogs",
  },
  openGraph: {
    title: "Webitya Blog | Digital Marketing Insights, SEO Tips & Trends",
    description:
      "Stay updated with the latest digital marketing blogs, expert strategies, and SEO tips from Webitya’s professionals.",
    url: "https://www.webitya.com/blogs",
    type: "website",
  },
};

const Blogs = () => {
  return (
    <main className="mx-auto">
      <BlogsPageLayout />
      <Footer />
    </main>
  );
};

export default Blogs;
