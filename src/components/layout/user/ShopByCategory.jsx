import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import womenDressImg from "../../../assets/women.jpg"
import unisexTshirtImg from "../../../assets/men.jpg"
import minimalistShirtImg from "../../../assets/minimalist.jpg"
import { useNavigate } from "react-router-dom"

const categories = [
  {
    id: "womens-dress",
    name: "Women's Dress",
    description: "Elegant and sophisticated dresses for every occasion.",
    image: womenDressImg,
    button: "Explore Collection",
  },
  {
    id: "unisex-tshirt",
    name: "Unisex T-Shirt",
    description: "Trendy, comfortable styles for everyone.",
    image: unisexTshirtImg,
    button: "Explore Collection",
  },
  {
    id: "minimalist-shirt",
    name: "Minimalist Shirt",
    description: "Simple, timeless shirts for a refined look.",
    image: minimalistShirtImg,
    button: "Explore Collection",
  },
]

const ShopByCategory = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleProductClick = (categoryId) => {
    navigate(`/ProductPage/${categoryId}`)
  }

  return (
    <section id="categories" className="py-10 " ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h2 className="text-4xl font-plusjakarta font-bold text-gray-900 mb-3">
          SHOP BY CATEGORY
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-10"
      >
        <p className="text-gray-600 font-plusjakarta max-w-2xl mx-auto">
          Discover curated picks across our most-loved departments. Explore what
          inspires you today.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 lg:gap-8 gap-8 px-6 md:px-16">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            onClick={() => handleProductClick(category.id)}
          >
            <div className=" overflow-hidden rounded-2xl">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full font-plusjakarta object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

            <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white p-6">
              <h3 className="text-2xl sm:text-base md:text-lg lg:text-2xl  font-plusjakarta font-bold mb-2">
                {category.name}
              </h3>
              <p className="text-sm sm:text-xs md:text-sm lg:text-lg font-plusjakarta mb-4">{category.description}</p>
              <button
                className="px-5 py-2 sm:text-xs md:text-sm lg:text-xl font-plusjakarta bg-white text-black rounded-full hover:bg-red-500 hover:text-white transition whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation()
                  handleProductClick(category.id)
                }}
              >
                Explore Collection
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ShopByCategory