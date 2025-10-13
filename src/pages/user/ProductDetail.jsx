// ProductDetail.jsx
import React, { useState } from "react"
import { Header } from "../../components/layout/Header"
import { Footer } from "../../components/layout/Footer"
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import RelatedProductsSlider from "../../components/layout/RelatedProductsSlider"

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


import prod1 from "../../assets/Product1.png"
import prod2 from "../../assets/Product2.png"
import prod3 from "../../assets/Product3.png"
import prod4 from "../../assets/Product4.png"

// Product Details
const productDetails = [
  {
    productName: "ANIME T-Shirt",
    price: 499,
    images: [prod1, prod2, prod3, prod4],
    sizes: [
      { size: "S", quantity: 5 },
      { size: "M", quantity: 6 },
      { size: "L", quantity: 7 },
      { size: "XL", quantity: 9 },
    ],
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    description:
      "A premium-quality anime-themed cotton T-shirt offering comfort, durability, and style for everyday casual wear with multiple sizes and colors.",
  },
]

const relatedProducts = [
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

export default function ProductDetail() {
  const product = productDetails[0]

  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [prevQuantity, setPrevQuantity] = useState(1)

  const selectedSizeData = product.sizes.find(
    (s) => s.size === selectedSize
  )?.quantity

  // Quantity change function for animation
  const changeQuantity = (newQty) => {
    setPrevQuantity(quantity)
    setQuantity(newQty)
  }

  const handleNext = () => {
    setMainImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const handlePrev = () => {
    setMainImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20 overflow-hidden">
      <Header />

      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* LEFT: Description */}
          <div className="lg:w-1/4 flex flex-col justify-center text-gray-700 text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-red-600">
                Description
              </h2>
              <p>{product.description}</p>
            </div>
          </div>

          {/* CENTER: Image Carousel */}
          <div className="lg:w-1/2 flex flex-col items-center relative">
            <img
              src={product.images[mainImageIndex]}
              alt={product.productName}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-50 text-red-600 p-3 rounded-full shadow hover:bg-red-100 transition"
            >
              <FaChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-50 text-red-600 p-3 rounded-full shadow hover:bg-red-100 transition"
            >
              <FaChevronRight size={22} />
            </button>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:w-1/4 flex flex-col gap-5">
            <h1 className="text-3xl font-bold text-red-600">
              {product.productName}
            </h1>
            <p className="text-2xl font-semibold text-gray-900">
              ₹{product.price}
            </p>

            {/* Color Options */}
            <div>
              <h3 className="font-semibold mb-2">Available Colors:</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      selectedColor === color
                        ? "border-red-600 scale-110"
                        : "border-gray-300"
                    } transition`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Sizes & Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Select Size:</h3>
              <div className="flex gap-3 mb-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => {
                      setSelectedSize(s.size)
                      changeQuantity(1) // Reset quantity when size changes
                    }}
                    className={`px-4 py-2 border rounded transition ${
                      selectedSize === s.size
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-red-600 border-red-600 hover:bg-red-100"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* Animated Quantity Counter */}
              <div className="flex items-center gap-3 mt-8">
                <span className="font-semibold">Quantity:</span>
                <button
                  onClick={() => changeQuantity(Math.max(1, quantity - 1))}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform shadow-md"
                >
                  <FaMinus />
                </button>

                <div className="w-10 h-6 relative overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={quantity}
                      initial={{
                        y: quantity > prevQuantity ? -20 : 20,
                        opacity: 0,
                      }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{
                        y: quantity > prevQuantity ? 20 : -20,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-full text-center font-semibold text-gray-800"
                    >
                      {quantity}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={() =>
                    changeQuantity(Math.min(quantity + 1, selectedSizeData))
                  }
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform shadow-md"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-6 w-full lg:w-3/4">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                Buy Now
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-red-600 text-red-600 font-bold py-3 px-4 rounded-lg hover:bg-red-50 shadow-sm transition-all duration-300 transform hover:scale-105">
                <FaShoppingCart /> Add to Cart
              </button>

              <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-600 shadow-sm transition-all duration-300 transform hover:scale-105 py-3 px-4 rounded-lg w-full">
                <FaHeart size={18} /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="relative py-10 px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl font-semibold mb-6 text-red-600">
            Related Products
          </h2>
          <RelatedProductsSlider relatedProducts={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
