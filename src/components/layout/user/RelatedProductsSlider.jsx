// RelatedProductsSlider.jsx
import React, { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function RelatedProductsSlider({ relatedProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  // Number of items visible based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1
    const width = window.innerWidth
    if (width < 640) return 1 // Mobile
    if (width < 768) return 2 // Small tablet
    if (width < 1024) return 3 // Tablet
    if (width < 1280) return 4 // Small desktop
    return 5 // Large desktop
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount())

  // Update visibleCount on window resize with debounce
  useEffect(() => {
    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const newCount = getVisibleCount()
        setVisibleCount(newCount)
        // Adjust currentIndex if it's out of bounds
        if (currentIndex > relatedProducts.length - newCount) {
          setCurrentIndex(Math.max(0, relatedProducts.length - newCount))
        }
      }, 150)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [currentIndex, relatedProducts.length])

  const nextProduct = () => {
    if (currentIndex < relatedProducts.length - visibleCount) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`)
  }

  // Calculate the translation percentage based on card width
  const cardWidthPercentage = 100 / visibleCount
  const translateX = -(currentIndex * cardWidthPercentage)

  // Calculate proper gap in percentage
  const gapInPixels = visibleCount === 1 ? 0 : 16 // 1rem = 16px
  const gapPercentage =
    (gapInPixels / (typeof window !== "undefined" ? window.innerWidth : 1000)) *
    100

  return (
    <section
      ref={sectionRef}
      className="relative py-6 sm:py-8 md:py-10 px-4 md:px-8 lg:px-12 "
    >
      <div className="w-full ">
        <motion.div
          className="flex gap-2 sm:gap-4"
          animate={{ x: `${translateX}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white overflow-hidden cursor-pointer group flex-shrink-0  hover: transition-shadow duration-300"
              style={{
                width: `calc(${100 / visibleCount}% - ${
                  ((visibleCount - 1) / visibleCount) *
                  (visibleCount === 1 ? 0 : 16)
                }px)`,
                minWidth: visibleCount === 1 ? "100%" : "auto",
              }}
            >
              {/* Product Image */}
              <div className="relative w-full overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full
                  aspect-[4/5] sm:aspect-[3/4] 2xl:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[45%] sm:h-[40%] flex items-center justify-center bg-[#f5f5f7]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-y-[20%] group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="p-3 sm:p-4 text-center w-[95%] sm:w-[90%]">
                  {/* Product colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex justify-center mb-2 gap-1.5 sm:gap-2">
                      {product.colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 shadow-sm"
                          style={{ backgroundColor: color }}
                          aria-label={`Color option ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Product name */}
                  <h3 className="text-gray-900 font-plusjakarta text-sm sm:text-base lg:text-lg font-semibold line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Category */}
                  {product.category && (
                    <p className="text-gray-500 font-plusjakarta mt-1 text-xs sm:text-sm">
                      {product.category}
                    </p>
                  )}

                  {/* Price */}
                  <p className="text-red-600 font-plusjakarta font-bold mt-2 text-sm sm:text-base lg:text-lg">
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows - Hidden on mobile if only 1 item visible */}
      {visibleCount === 1 && relatedProducts.length <= 1 ? null : (
        <>
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={prevProduct}
              aria-label="Previous products"
              className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg p-2 sm:p-2.5 md:p-3 rounded-full z-10 hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
          )}

          {/* Right Arrow */}
          {currentIndex < relatedProducts.length - visibleCount && (
            <button
              onClick={nextProduct}
              aria-label="Next products"
              className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg p-2 sm:p-2.5 md:p-3 rounded-full z-10 hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
          )}
        </>
      )}

      {/* Optional: Dots indicator for mobile */}
      {visibleCount === 1 && relatedProducts.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 sm:hidden">
          {relatedProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to product ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gray-800 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
