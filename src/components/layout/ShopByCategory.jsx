import React from "react"
import { motion } from "framer-motion"
import womenDressImg from "../../assets/women.jpg"
import unisexTshirtImg from "../../assets/men.jpg"
import minimalistShirtImg from "../../assets/minimalist.jpg"

const categories = [
  {
    name: "Women's Dress",
    description: "Elegant and sophisticated dresses for every occasion.",
    image: womenDressImg,
    button: "Explore Collection",
  },
  {
    name: "Unisex T-Shirt",
    description: "Trendy, comfortable styles for everyone.",
    image: unisexTshirtImg,
    button: "Explore Collection",
  },
  {
    name: "Minimalist Shirt",
    description: "Simple, timeless shirts for a refined look.",
    image: minimalistShirtImg,
    button: "Explore Collection",
  },
]

const ShopByCategory = () => {
  return (
    <section id="categories" className="py-10 ">
      <motion.h1
        initial={{ opacity: 0, y: 50 }} // Starting state
        animate={{ opacity: 1, y: 0 }} // Final state
        transition={{ duration: 2.5 }} // How long it takes
        className="text-center mb-5"
      >
        <h2 className="text-4xl font-worksans font-bold text-gray-900 mb-3">
          SHOP BY CATEGORY
        </h2>
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 50 }} // Starting state
        animate={{ opacity: 1, y: 0 }} // Final state
        transition={{ duration: 2.5, delay: 0.2 }} // How long it takes
        className="text-center mb-10"
      >
        <p className="text-gray-600 font-worksans max-w-2xl mx-auto">
          Discover curated picks across our most-loved departments. Explore what
          inspires you today.
        </p>
      </motion.h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: index * 0.5 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

            <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white p-6">
              {category.name}
              <p className="text-sm mb-4">{category.description}</p>
              <button className="px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-red-500 hover:text-white transition">
                {category.button}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ShopByCategory
