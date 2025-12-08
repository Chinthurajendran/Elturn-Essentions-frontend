import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, ChevronLeft, ChevronRight, Grid3x3, LayoutGrid } from "lucide-react"

// Dummy images
const prod1 = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop"
const prod2 = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop"
const prod3 = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop"
const prod4 = "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop"

const products = [
  {
    id: 1,
    productName: "ANIME T-Shirt",
    price: 499,
    images: [prod1, prod2, prod3, prod4],
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
  {
    id: 11,
    productName: "Street Style Tee",
    price: 499,
    images: [prod1, prod2],
    sizes: ["M", "L"],
    colors: ["#000000", "#FFFFFF"],
    category: "Unisex T-Shirt",
    fabric: "Cotton",
  },
  {
    id: 12,
    productName: "Modern Fit Shirt",
    price: 1299,
    images: [prod4, prod1],
    sizes: ["M", "L", "XL"],
    colors: ["#000000", "#FFFFFF"],
    category: "Minimalist Shirt",
    fabric: "Linen",
  },
]

const FilterDrawer = ({ filters, setFilters, uniqueColors, uniqueSizes, uniqueFabrics, setShowFilter }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setShowFilter(false)}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Filters</h3>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-600">Sort By</h4>
            <div className="space-y-2">
              {[
                { value: "", label: "Default" },
                { value: "low", label: "Price: Low to High" },
                { value: "high", label: "Price: High to Low" },
                { value: "az", label: "Name: A to Z" },
                { value: "za", label: "Name: Z to A" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sort"
                    checked={filters.sort === option.value}
                    onChange={() => setFilters({ ...filters, sort: option.value })}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="group-hover:text-black transition-colors">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-600">Color</h4>
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFilters({ ...filters, color: filters.color === color ? "" : color })}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    filters.color === color ? "border-black scale-110" : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-600">Size</h4>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setFilters({ ...filters, size: filters.size === size ? "" : size })}
                  className={`px-5 py-2 border-2 rounded-lg font-medium transition-all ${
                    filters.size === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-600">Fabric</h4>
            <div className="space-y-2">
              {uniqueFabrics.map((fabric) => (
                <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.fabric === fabric}
                    onChange={() => setFilters({ ...filters, fabric: filters.fabric === fabric ? "" : fabric })}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="group-hover:text-black transition-colors">{fabric}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => setFilters({ color: "", size: "", fabric: "", sort: "" })}
            className="w-full py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default function ProductPage() {
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
  const [currentImageIndex, setCurrentImageIndex] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  )
  const [gridView, setGridView] = useState(4)

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

    if (filters.sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (filters.sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (filters.sort === "az") {
      result = [...result].sort((a, b) => a.productName.localeCompare(b.productName))
    } else if (filters.sort === "za") {
      result = [...result].sort((a, b) => b.productName.localeCompare(a.productName))
    }

    return result
  }, [categoryProducts, filters])

  const uniqueColors = [...new Set(categoryProducts.flatMap((p) => p.colors))]
  const uniqueSizes = [...new Set(categoryProducts.flatMap((p) => p.sizes))]
  const uniqueFabrics = [...new Set(categoryProducts.map((p) => p.fabric))]

  const handleNextImage = (productId, totalImages, e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % totalImages,
    }))
  }

  const handlePrevImage = (productId, totalImages, e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + totalImages) % totalImages,
    }))
  }

  const gridClass = {
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">STORE</h1>
            <div className="flex items-center gap-4">
              <button className="text-sm hover:underline">Sign In</button>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Cart (0)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-[73px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all relative ${
                  selectedCategory === cat
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">{selectedCategory}</h2>
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Grid Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setGridView(3)}
                className={`p-2 rounded transition-colors ${
                  gridView === 3 ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setGridView(4)}
                className={`p-2 rounded transition-colors ${
                  gridView === 4 ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.color || filters.size || filters.fabric || filters.sort) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.color && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                <span
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: filters.color }}
                />
                <button onClick={() => setFilters({ ...filters, color: "" })}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.size && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                Size: {filters.size}
                <button onClick={() => setFilters({ ...filters, size: "" })}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.fabric && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                {filters.fabric}
                <button onClick={() => setFilters({ ...filters, fabric: "" })}>
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className={`grid ${gridClass[gridView]} gap-6`}>
          {filteredProducts.map((product) => {
            const activeIndex = currentImageIndex[product.id] || 0
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden bg-gray-100 rounded-xl mb-4 aspect-[3/4]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndex}
                      src={product.images[activeIndex]}
                      alt={product.productName}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Image Navigation */}
                  {hoveredProduct === product.id && product.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <button
                        onClick={(e) => handlePrevImage(product.id, product.images.length, e)}
                        className="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(product.id, product.images.length, e)}
                        className="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  {/* Image Indicators */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                      {product.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === activeIndex
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Quick Add Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredProduct === product.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    className="absolute inset-x-4 bottom-4 pointer-events-none"
                  >
                    <button className="w-full bg-white text-black py-3 rounded-lg font-medium shadow-lg hover:bg-gray-50 transition-colors pointer-events-auto">
                      Quick Add
                    </button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-base group-hover:underline">
                      {product.productName}
                    </h3>
                    <p className="font-semibold text-base whitespace-nowrap">
                      ₹{product.price}
                    </p>
                  </div>
                  
                  {/* Colors */}
                  <div className="flex gap-1.5">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-500 flex items-center">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-4">No products found</p>
            <button
              onClick={() => setFilters({ color: "", size: "", fabric: "", sort: "" })}
              className="text-black underline"
            >
              Clear all filters
            </button>
          </div>
        )}
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

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Sale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Customer Service</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Our Story</li>
                <li>Sustainability</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2025 Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}