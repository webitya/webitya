import Footer from "@/components/FooterEl"
import PortfolioCTA from "@/components/PortfolioPage/PortfolioCTA"
import PortfolioHeroSection from "@/components/PortfolioPage/PortfolioHeroSection"
import PortfolioOurProcessSection from "@/components/PortfolioPage/PortfolioOurProcess"
import PortfolioProjectsSection from "@/components/PortfolioPage/PortfolioProjects"


const Portfolio=()=>{
  return(
    <>
    <PortfolioHeroSection/>
     <PortfolioProjectsSection/>
     <PortfolioOurProcessSection/>
     <PortfolioCTA/>
    <Footer/>
    </>
  )
}
export default Portfolio