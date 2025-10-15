import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FilterDrawer } from "../../components/layout/FilterDrawer"
import { Header } from "../../components/layout/Header"
import { Footer } from "../../components/layout/Footer"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Dummy images
import prod1 from "../../assets/T-shirt1.jpg"
import prod2 from "../../assets/T-shirt2.jpg"
import prod3 from "../../assets/T-shirt3.jpg"
import prod4 from "../../assets/T-shirt4.jpg"
import prod12 from "../../assets/Product2.png"
import prod13 from "../../assets/Product3.png"
import prod14 from "../../assets/Product4.png"

const products = [
  {
    id: 1,
    productName: "ANIME T-Shirt",
    price: 499,
    images: [prod1, prod12, prod13, prod14],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    category: "Unisex T-Shirt",
    fabric: "Cotton",
  },
  {
    id: 2,
    productName: "Classic T-Shirt",
    price: 599,
    images: [prod2, prod3],
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#FFFFFF"],
    category: "Unisex T-Shirt",
    fabric: "Cotton",
  },
  {
    id: 3,
    productName: "Floral Top",
    price: 799,
    images: [prod1, prod2],
    sizes: ["M", "L"],
    colors: ["#FF69B4", "#FFFFFF"],
    category: "Tops",
    fabric: "Georgette",
  },
  {
    id: 4,
    productName: "Casual Linen Shirt",
    price: 899,
    images: [prod2, prod3],
    sizes: ["M", "L", "XL"],
    colors: ["#A9A9A9", "#1E90FF"],
    category: "Minimalist Shirt",
    fabric: "Linen",
  },
  {
    id: 5,
    productName: "Party Lehenga",
    price: 2999,
    images: [prod3, prod4],
    sizes: ["M", "L"],
    colors: ["#FFD700", "#800080"],
    category: "Lehenga",
    fabric: "Silk",
  },
  {
    id: 6,
    productName: "Cotton Top",
    price: 699,
    images: [prod1, prod4],
    sizes: ["S", "M"],
    colors: ["#FFC0CB", "#FFFFFF"],
    category: "Tops",
    fabric: "Cotton",
  },
  {
    id: 7,
    productName: "Office Shirt",
    price: 1099,
    images: [prod4, prod1],
    sizes: ["M", "L", "XL"],
    colors: ["#1E90FF", "#000000"],
    category: "Minimalist Shirt",
    fabric: "Linen",
  },
  {
    id: 8,
    productName: "Casual Lehenga",
    price: 2599,
    images: [prod2, prod3],
    sizes: ["S", "M"],
    colors: ["#FFD700", "#FF1493"],
    category: "Lehenga",
    fabric: "Silk",
  },
  {
    id: 9,
    productName: "Urban T-Shirt",
    price: 499,
    images: [prod1, prod2],
    sizes: ["M", "L"],
    colors: ["#000000", "#FFFFFF"],
    category: "Unisex T-Shirt",
    fabric: "Cotton",
  },
  {
    id: 10,
    productName: "Elegant Top",
    price: 899,
    images: [prod3, prod4],
    sizes: ["S", "M"],
    colors: ["#F08080", "#FFF0F5"],
    category: "Tops",
    fabric: "Georgette",
  },
]

export function ProductPage() {
  const navigate = useNavigate()
  const categories = ["Tops", "Lehenga", "Unisex T-Shirt", "Minimalist Shirt"]

  const [selectedCategory, setSelectedCategory] = useState("Unisex T-Shirt")
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    fabric: "",
    sort: "",
  })
  const [showFilter, setShowFilter] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  )

  const filteredProducts = useMemo(() => {
    let result = categoryProducts

    if (filters.color)
      result = result.filter((p) => p.colors.includes(filters.color))
    if (filters.size)
      result = result.filter((p) => p.sizes.includes(filters.size))
    if (filters.fabric)
      result = result.filter((p) => p.fabric === filters.fabric)
    if (filters.sort === "high")
      result = [...result].sort((a, b) => b.price - a.price)
    else if (filters.sort === "low")
      result = [...result].sort((a, b) => a.price - b.price)

    return result
  }, [categoryProducts, filters])

  // Unique filter values
  const uniqueColors = [...new Set(categoryProducts.flatMap((p) => p.colors))]
  const uniqueSizes = [...new Set(categoryProducts.flatMap((p) => p.sizes))]
  const uniqueFabrics = [...new Set(categoryProducts.map((p) => p.fabric))]

  const handleNextImage = (productId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % totalImages,
    }))
  }

  const handlePrevImage = (productId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + totalImages) % totalImages,
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] pt-20 overflow-hidden">
      <Header />

      {/* Category Title & Filter Button */}
      <div className="flex justify-between items-center mb-6 lg:px-8">
        <h2 className="font-plusjakarta text-2xl font-bold">
          {selectedCategory}
        </h2>
        <button
          className="flex font-plusjakarta items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => setShowFilter(true)}
        >
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Category Switch Bar */}
      <div className="font-plusjakarta flex gap-4 mb-8 lg:px-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === cat
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 pb-10 lg:grid-cols-4 gap-6 px-6 lg:px-10">
        {filteredProducts.map((product) => {
          const activeIndex = currentImageIndex[product.id] || 0
          return (
            <motion.div
              key={product.id}
              className="relative group cursor-pointer"
              onClick={() =>
                navigate(`/product/${product.id}`, { state: product })
              }
              onMouseEnter={() => {
                setHoveredProduct(product.id)
                setCurrentImageIndex((prev) => ({ ...prev, [product.id]: 0 }))
              }}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden ">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={product.images[activeIndex]}
                    alt={product.productName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-90 object-cover"
                  />
                </AnimatePresence>

                {/* Arrows only on hover */}
                {hoveredProduct === product.id && product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevImage(product.id, product.images.length)
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2  p-2"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNextImage(product.id, product.images.length)
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2  p-2 "
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              <div className="font-plusjakarta flex justify-between mt-3 text-sm font-semibold px-1">
                <span>{product.productName}</span>
                <span>₹{product.price}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {showFilter && (
          <FilterDrawer
            filters={filters}
            setFilters={setFilters}
            uniqueColors={uniqueColors}
            uniqueSizes={uniqueSizes}
            uniqueFabrics={uniqueFabrics}
            setShowFilter={setShowFilter}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
