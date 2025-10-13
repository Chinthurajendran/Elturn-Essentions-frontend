// RelatedProductsSlider.jsx
import React, { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function RelatedProductsSlider({ relatedProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  // Number of items visible
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 3
    return 5
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount())

  // Update visibleCount on window resize
  React.useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextProduct = () => {
    if (currentIndex < relatedProducts.length - visibleCount)
      setCurrentIndex(currentIndex + 1)
  }

  const prevProduct = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleProductClick = (productId) => {
    navigate(`ProductDetail`) // replace with your route logic
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-10 px-4 md:px-8 lg:px-12 "
    >
      {/* <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0 }}
        className="text-center font-worksans text-red-600 font-extrabold text-3xl sm:text-5xl mb-10 tracking-wide uppercase"
      >
        Related Products
      </motion.h2> */}

      {/* Product Slider */}
      <div className="w-full">
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: "tween", duration: 0.5 }}
          style={{ width: `${(relatedProducts.length / visibleCount) * 55}%` }}
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.0, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
           className="relative bg-white rounded-2xl overflow-hidden  cursor-pointer group flex-shrink-0 w-[85%] sm:w-[30%] md:w-[18%] shadow-sm hover:shadow-lg transition-all"
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
      {currentIndex < relatedProducts.length - visibleCount && (
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
