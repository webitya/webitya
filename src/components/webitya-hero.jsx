"use client"
import Footer from "./FooterEl"
import HomeBusinessSection from "./Homepage/BusinessSection"
import HomeClientLogos from "./Homepage/ClientLogos"
import HomeAboutUs from "./Homepage/HomeAboutUs"
import HomeCallToAction from "./Homepage/HomeCallToAction"
import HomeFaqs from "./Homepage/HomeFaqs"
import HomeHero from "./Homepage/HomeHero"
import HomeTestimonials from "./Homepage/HomeTestimonials"
import HomeServicesSection from "./Homepage/Services"


const WebityaHero = () => {
  return (
    <>
      <HomeHero />
      <HomeAboutUs />
      <HomeBusinessSection />
      <HomeServicesSection />
      <HomeClientLogos />
      <HomeTestimonials />
      <HomeFaqs />
      <HomeCallToAction />
      <Footer />
    </>
  )
}

export default WebityaHero
