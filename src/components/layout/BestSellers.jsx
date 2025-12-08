import React, {useRef } from "react"
import { motion, useInView } from "framer-motion"
import RelatedProductsSlider from "./RelatedProductsSlider"

import img1 from "../../assets/T-shirt1.jpg"
import img2 from "../../assets/T-shirt2.jpg"
import img3 from "../../assets/T-shirt3.jpg"
import img4 from "../../assets/T-shirt4.jpg"
import img5 from "../../assets/T-shirt5.jpg"
import img6 from "../../assets/T-shirt6.jpg"
import img7 from "../../assets/T-shirt7.jpg"
import img8 from "../../assets/T-shirt8.jpg"
import img9 from "../../assets/T-shirt9.jpg"
import img10 from "../../assets/T-shirt10.jpg"

const bestSellers = [
  {
    name: "Crimson Eagle",
    image: img1,
    price: "₹899",
    category: "Men's T-Shirt",
    id: 1,
    colors: ["#FF0000", "#000000", "#FFFFFF"],
  },
  {
    name: "Dragon Shirt",
    image: img2,
    price: "₹1,099",
    category: "Men's T-Shirt",
    id: 2,
    colors: ["#0000FF", "#FFFF00"],
  },
  {
    name: "Raven Embroidered",
    image: img3,
    price: "₹999",
    category: "Women's T-Shirt",
    id: 3,
    colors: ["#000000", "#FFFFFF"],
  },
  {
    name: "Wolf Embroidered",
    image: img4,
    price: "₹1,299",
    category: "Men's T-Shirt",
    id: 4,
    colors: ["#808080", "#000000"],
  },
  {
    name: "Sunset Blaze",
    image: img5,
    price: "₹899",
    category: "Unisex",
    id: 5,
    colors: ["#FF4500", "#FFD700", "#FFFFFF"],
  },
  {
    name: "Modern Minimalist",
    image: img6,
    price: "₹799",
    category: "Men's T-Shirt",
    id: 6,
    colors: ["#FFFFFF", "#000000"],
  },
  {
    name: "Floral Elegance",
    image: img7,
    price: "₹899",
    category: "Women's T-Shirt",
    id: 7,
    colors: ["#FFC0CB", "#FFFFFF", "#FF69B4"],
  },
  {
    name: "Casual Comfort",
    image: img8,
    price: "₹749",
    category: "Unisex",
    id: 8,
    colors: ["#ADD8E6", "#FFFFFF"],
  },
  {
    name: "Urban Explorer",
    image: img9,
    price: "₹999",
    category: "Men's T-Shirt",
    id: 9,
    colors: ["#000000", "#808080", "#FFFFFF"],
  },
  {
    name: "Classic Heritage",
    image: img10,
    price: "₹1,099",
    category: "Unisex",
    id: 10,
    colors: ["#800000", "#FFD700", "#FFFFFF"],
  },
]

export default function BestSellers() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      className="relative  px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0 }}
        className="text-center font-plusjakarta text-red-600 font-bold text-3xl sm:text-5xl tracking-wide uppercase"
      >
        Best Sellers
      </motion.h2>
      <RelatedProductsSlider relatedProducts={bestSellers} />
    </section>
  )
}
