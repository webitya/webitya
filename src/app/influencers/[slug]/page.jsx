import influencers from "../../../components/InfluencerPage/InfluencerPersonData/influencerPersondata";
import { notFound } from "next/navigation";
import InfluencerDetailClient from "../../../components/InfluencerPage/InfluencerDetailClient";

export async function generateStaticParams() {
  return influencers.map((inf) => ({
    slug: inf.slug,
  }));
}

const InfluencerDetail = ({ params }) => {
  const influencer = influencers.find((inf) => inf.slug === params.slug);

  if (!influencer) {
    notFound();
  }

  return <InfluencerDetailClient influencer={influencer} />;
};

export default InfluencerDetail;
