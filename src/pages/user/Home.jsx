import React from "react"
import { Footer } from "../../components/layout/Footer"
import { Section } from "../../components/layout/Section"
import CustomerTestimonials from "../../components/layout/CustomerTestimonials"
import ShopByCategory from "../../components/layout/ShopByCategory"
import BestSellers from "../../components/layout/BestSellers"
import { ScrollBasedVelocityDemo } from "../../components/layout/ScrollBasedVelocityDemo"
import CircularGallery from "../../components/ui/CircularGallery"

function Home() {
  return (
    <div id="home" className=" bg-[#f5f5f7]">
      <Section />
      <ShopByCategory />
      <ScrollBasedVelocityDemo />
      <BestSellers />
      <div
        style={{
          height: "600px",
          position: "relative",
        }}
      >
        <CircularGallery
          bend={3}
          textColor="#000000"
          borderRadius={0.05}
          scrollEase={0.02}
          font='bold 30px "Roboto Slab"'
        />
      </div>

      <CustomerTestimonials />
      <Footer />
    </div>
  )
}

export default Home
