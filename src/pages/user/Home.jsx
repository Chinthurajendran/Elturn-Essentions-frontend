import { Header } from "../../components/layout/user/Header"
import ThumbnailVideo from "../../components/layout/user/ThumbnailVideo"
import ShopByCategory from "../../components/layout/user/ShopByCategory"
import BestSellers from "../../components/layout/user/BestSellers"
import { ScrollBasedText } from "../../components/layout/user/ScrollBasedText"
import ScrollingTestimonials from "../../components/layout/user/ScrollingTestimonials"
import NewArrivals from "../../components/layout/user/NewArrivals"
import { Footer } from "../../components/layout/user/Footer"



function Home() {
  return (
    <div id="home" className=" bg-[#f5f5f7]">
      {/* <Section /> */}
      <Header/>
      <ThumbnailVideo/>
      <ShopByCategory />
      <ScrollBasedText />
      <NewArrivals/>
      <BestSellers />
      <ScrollingTestimonials/>
      <Footer />
    </div>
  )
}

export default Home
