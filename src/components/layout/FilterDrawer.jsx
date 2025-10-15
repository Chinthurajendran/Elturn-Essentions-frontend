import React from "react"
import { motion } from "framer-motion"
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

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg z-50 p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filter & Sorting</h2>
        <button onClick={() => setShowFilter(false)}>
          <X size={22} />
        </button>
      </div>

      {/* Sorting */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Sort By</label>
        <select
          className="w-full border p-2 rounded"
          value={filters.sort}
          onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
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

      {/* Reset Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={resetFilters}
          className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border border-red-600 transition-all"
        >
          Reset
        </button>
      </div>
    </motion.div>
  )
}
