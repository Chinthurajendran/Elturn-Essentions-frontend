import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus } from "lucide-react"

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

  const [openSections, setOpenSections] = useState({
    sort: false,
    color: false,
    size: false,
    fabric: false,
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

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
          <h2 className="text-lg font-plusjakarta uppercase font-extrabold">
            Filters & Sorting
          </h2>
          <button onClick={() => setShowFilter(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Sort By */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("sort")}
            >
              <label className="block font-plusjakarta uppercase">
                Sort By
              </label>
              {openSections.sort ? <Minus size={16} /> : <Plus size={16} />}
            </div>

            <AnimatePresence>
              {openSections.sort && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-2"
                >
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Alphabetically, A-Z", value: "az" },
                      { label: "Alphabetically, Z-A", value: "za" },
                      { label: "Price, low to high", value: "low" },
                      { label: "Price, high to low", value: "high" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setFilters((f) => ({ ...f, sort: option.value }))
                        }
                        className={`text-left text-sm hover:underline ${
                          filters.sort === option.value
                            ? "font-semibold text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {option.label}
                        {filters.sort === option.value && " ✓"}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Color Filter */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("color")}
            >
              <label className="block font-plusjakarta uppercase">Color</label>
              {openSections.color ? <Minus size={16} /> : <Plus size={16} />}
            </div>
            <AnimatePresence>
              {openSections.color && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-2 flex gap-2 flex-wrap"
                >
                  {uniqueColors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        filters.color === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFilters((f) => ({ ...f, color }))}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Size Filter */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("size")}
            >
              <label className="block font-plusjakarta uppercase">Size</label>
              {openSections.size ? <Minus size={16} /> : <Plus size={16} />}
            </div>
            <AnimatePresence>
              {openSections.size && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-2 flex gap-2 flex-wrap"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fabric Filter */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("fabric")}
            >
              <label className="block font-plusjakarta uppercase">Fabric</label>
              {openSections.fabric ? <Minus size={16} /> : <Plus size={16} />}
            </div>
            <AnimatePresence>
              {openSections.fabric && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-2 flex gap-2 flex-wrap"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
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
