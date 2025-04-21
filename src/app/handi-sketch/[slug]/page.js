import Footer from "@/components/FooterEl";
import HandiSketchData from "@/components/HandiSketch/Data/HandiSketchData";
import PortraitDetailDynamic from "@/components/HandiSketch/PotraitDetailDynamic";
// import UploadPhotos from "@/components/HandiSketch/UploadDataEmail";


export async function generateStaticParams() {
  return HandiSketchData.map((item) => ({
    slug: item.slug,
  }));
}

export default function PortraitDetail({ params }) {
  const portrait = HandiSketchData.find((item) => item.slug === params.slug);

  if (!portrait) return <div>Portrait not found</div>;

  return (
    <>
      <PortraitDetailDynamic portrait={portrait} />
      <Footer />
    </>
  );
}
