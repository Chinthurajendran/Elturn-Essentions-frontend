import React, { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function RelatedProductsSlider({ relatedProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  // ******** AUTO-CALCULATE CARDS FIT INSIDE SCREEN ********
  useEffect(() => {
    const updateVisible = () => {
      if (!containerRef.current || !cardRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const cardWidth = cardRef.current.offsetWidth

      const count = Math.floor(containerWidth / cardWidth)
      setVisibleCount(count > 0 ? count : 1)
    }

    updateVisible()

    const observer = new ResizeObserver(updateVisible)
    observer.observe(containerRef.current)

    window.addEventListener("resize", updateVisible)

    return () => {
      window.removeEventListener("resize", updateVisible)
      observer.disconnect()
    }
  }, [])

  // ******** NEXT / PREV ********
  const nextProduct = () => {
    if (currentIndex < relatedProducts.length - visibleCount) {
      setCurrentIndex((i) => i + 1)
    }
  }

  const prevProduct = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const handleProductClick = (id) => {
    navigate(`/ProductDetail/${id}`)
  }

  // ******** DYNAMIC SLIDE MOVEMENT ********
  const translateX = -(currentIndex * (100 / visibleCount))

  return (
    <section ref={sectionRef} className="relative py-10 px-4 md:px-8 lg:px-12">
      <div ref={containerRef} className="overflow-hidden w-full">

        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: `${translateX}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: `${(relatedProducts.length * 100) / visibleCount}%`,
          }}
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              ref={index === 0 ? cardRef : null}
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white overflow-hidden cursor-pointer group flex-shrink-0"
              style={{
                width: `${100 / relatedProducts.length}%`,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[350px] sm:h-[400px] object-cover duration-700"
              />

              <div className="absolute bottom-0 left-0 right-0 h-[40%] flex items-center justify-center bg-[#f5f5f7] opacity-0 group-hover:opacity-100 translate-y-[20%] group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="p-4 text-center rounded-xl w-[90%]">
                  <div className="flex justify-center mb-2 gap-2">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <h3 className="text-gray-900 font-plusjakarta text-base sm:text-lg">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 mt-1 text-sm">
                    {product.category}
                  </p>

                  <p className="text-red-600 font-bold mt-2 text-base sm:text-lg">
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#e2e2e4]/90 shadow-md p-2 sm:p-3 rounded-full z-10 hover:bg-[#d2d2d4]"
        >
          <FaChevronLeft size={22} />
        </button>
      )}

      {/* Right Arrow */}
      {currentIndex < relatedProducts.length - visibleCount && (
        <button
          onClick={nextProduct}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#e2e2e4]/90 shadow-md p-2 sm:p-3 rounded-full z-10 hover:bg-[#d2d2d4]"
        >
          <FaChevronRight size={22} />
        </button>
      )}
    </section>
  )
}
