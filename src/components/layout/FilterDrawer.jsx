import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function FilterDrawer({
  filters,
  setFilters,
  uniqueColors,
  uniqueSizes,
  uniqueFabrics,
  setShowFilter,
}) {
  const resetFilters = () =>
    setFilters({ color: "", size: "", fabric: "", sort: "" })

  // Disable body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        onClick={() => setShowFilter(false)}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg z-50 p-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold uppercase">Filters & Sorting</h2>
          <button onClick={() => setShowFilter(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Sorting */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Sort By</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.sort}
              onChange={(e) =>
                setFilters((f) => ({ ...f, sort: e.target.value }))
              }
            >
              <option value="">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Color Filter */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Color</label>
            <div className="flex gap-2 flex-wrap">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${
                    filters.color === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFilters((f) => ({ ...f, color }))}
                />
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Size</label>
            <div className="flex gap-2 flex-wrap">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setFilters((f) => ({ ...f, size }))}
                  className={`px-3 py-1 rounded border ${
                    filters.size === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Fabric</label>
            <div className="flex gap-2 flex-wrap">
              {uniqueFabrics.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => setFilters((f) => ({ ...f, fabric }))}
                  className={`px-3 py-1 rounded border ${
                    filters.fabric === fabric
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {fabric}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset button fixed at bottom */}
        <div className="mt-4 flex-shrink-0">
          <button
            onClick={resetFilters}
            className="w-full px-6 py-2 bg-red-600 text-white font-plusjakarta hover:bg-white hover:text-red-600 border border-red-600 transition-all rounded"
          >
            Reset
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
