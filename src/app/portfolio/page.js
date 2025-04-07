import Footer from "@/components/FooterEl"
import PortfolioHeroSection from "@/components/PortfolioPage/PortfolioHeroSection"
import PortfolioOurProcessSection from "@/components/PortfolioPage/PortfolioOurProcess"
import PortfolioProjectsSection from "@/components/PortfolioPage/PortfolioProjects"


const Portfolio=()=>{
  return(
    <>
    <PortfolioHeroSection/>
     <PortfolioProjectsSection/>
     <PortfolioOurProcessSection/>
    <Footer/>
    </>
  )
}
export default Portfolio