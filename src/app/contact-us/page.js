import ContactMapSection from "@/components/ContactUs/ContactMap"
import Footer from "@/components/FooterEl"

const { default: ContactHero } = require("@/components/ContactUs/ContactHero")


const About=()=>{
  return (
    <>
    <ContactHero/>
    <ContactMapSection/>
    <Footer/>
    
    </>
  )
}
export default About