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
    navigate(`/ProductDetail/${productId}`)
  }

  // Calculate the translation percentage based on card width
  const cardWidthPercentage = 100 / visibleCount
  const translateX = -(currentIndex * cardWidthPercentage)

  return (
    <section ref={sectionRef} className="relative py-10  px-4 md:px-8 lg:px-12">
      <div className="w-full">
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: `${translateX}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: `${(relatedProducts.length / visibleCount) * 55}%` }}
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white overflow-hidden cursor-pointer group flex-shrink-0"
              style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 16 / visibleCount}px)` }}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-[350px] sm:h-[400px] md:h-[400px] object-cover transition-transform duration-700"
              />

              {/* Hover Button */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%] flex items-center justify-center bg-[#f5f5f7] opacity-0 group-hover:opacity-100 translate-y-[20%] group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="p-4 text-center rounded-xl w-[90%] max-w-sm">
                  {/* Product colors */}
                  <div className="flex justify-center mb-2 gap-2">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>

                  {/* Product name */}
                  <h3 className="text-gray-900 font-plusjakarta text-base sm:text-lg">
                    {product.name}
                  </h3>

                  {/* Category */}
                  <p className="text-gray-500 font-plusjakarta mt-1 text-sm">
                    {product.category}
                  </p>

                  {/* Price */}
                  <p className="text-red-600 font-plusjakarta font-bold mt-2 text-base sm:text-lg">
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Left Arrow */}
      {currentIndex > 0 && (
        <button
          onClick={prevProduct}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#e2e2e4]/90 shadow-md p-2 sm:p-3 rounded-full z-10 hover:bg-[#d2d2d4] transition-colors"
        >
          <FaChevronLeft size={22} color="#68686a" />
        </button>
      )}

      {/* Right Arrow */}
      {currentIndex < relatedProducts.length - visibleCount && (
        <button
          onClick={nextProduct}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#e2e2e4]/90 shadow-md p-2 sm:p-3 rounded-full z-10 hover:bg-[#d2d2d4] transition-colors"
        >
          <FaChevronRight size={22} color="#68686a" />
        </button>
      )}
    </section>
  )
}