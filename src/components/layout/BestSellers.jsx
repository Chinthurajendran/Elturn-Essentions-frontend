import React, { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import img1 from "../../assets/T-shirt1.jpg"
import img2 from "../../assets/T-shirt2.jpg"
import img3 from "../../assets/T-shirt3.jpg"
import img4 from "../../assets/T-shirt4.jpg"
import img5 from "../../assets/T-shirt1.jpg"
import img6 from "../../assets/T-shirt2.jpg"
import img7 from "../../assets/T-shirt3.jpg"
import img8 from "../../assets/T-shirt4.jpg"
import img9 from "../../assets/T-shirt1.jpg"
import img10 from "../../assets/T-shirt2.jpg"

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  // Responsive item count
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1 // mobile
    if (window.innerWidth < 1024) return 3 // tablet
    return 5 // desktop
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount())

  // Update on resize
  React.useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextProduct = () => {
    if (currentIndex < bestSellers.length - visibleCount)
      setCurrentIndex(currentIndex + 1)
  }

  const prevProduct = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-10 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0 }}
        className="text-center font-worksans text-red-600 font-extrabold text-3xl sm:text-9xl mb-10 tracking-wide uppercase"
      >
        Best Sellers
      </motion.h2>

      {/* Product Slider */}
      <div className="w-full ">
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: "tween", duration: 0.5 }}
          style={{ width: `${(bestSellers.length / visibleCount) * 55}%` }}
        >
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.0, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0 w-[85%] sm:w-[30%] md:w-[18%] shadow-sm hover:shadow-lg transition-all"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-[250px] sm:h-[280px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
                  View Details
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 text-center bg-gradient-to-t from-white to-transparent">
                <div className="flex justify-center mb-2 gap-2">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
                <h3 className="text-gray-900 font-semibold text-base sm:text-lg">
                  {product.name}
                </h3>
                <p className="text-gray-500 mt-1 text-sm">{product.category}</p>
                <p className="text-red-600 font-bold mt-2 text-base sm:text-lg">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Left Arrow */}
      {currentIndex > 0 && (
        <button
          onClick={prevProduct}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#e2e2e4]/90 shadow-md p-2 sm:p-3 rounded-full"
        >
          <FaChevronLeft size={22} color="#68686a" />
        </button>
      )}

      {/* Right Arrow */}
      {currentIndex < bestSellers.length - visibleCount && (
        <button
          onClick={nextProduct}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#e2e2e4]/90 shadow-md p-2 sm:p-3 rounded-full"
        >
          <FaChevronRight size={22} color="#68686a" />
        </button>
      )}
    </section>
  )
}
