import { Link } from "react-router-dom"
import { ShoppingBag, Search, User, Menu, Heart, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import womenDressImg from "../../assets/women.jpg"
import unisexTshirtImg from "../../assets/men.jpg"
import { SideDrawer } from "./SideDrawer"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null) // men | women

  const [activeDrawer, setActiveDrawer] = useState(null) // cart | wishlist

  const isActive = Boolean(activeCategory)

  const menCategory = {
    title: "Men’s Clothing",
    items: ["Shirts", "T-Shirts", "Hoodies"],
    image: unisexTshirtImg,
  }

  const womenCategory = {
    title: "Women’s Clothing",
    items: ["Dresses", "Tops", "Jeans", "Sarees", "Lehenga"],
    image: womenDressImg,
  }
  console.log(activeCategory)

  return (
    <header
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-0 ease-in-out ${
        isActive ? "bg-red-600 text-white" : "bg-transparent text-black"
      }`}
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* ===== HEADER MAIN ===== */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span
              className={`font-plusjakarta text-2xl font-bold ${
                isActive ? "text-white" : "text-black"
              }`}
            >
              ELTURN
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <div
              className="relative"
              onMouseEnter={() => setActiveCategory("men")}
            >
              <button
                className={`font-plusjakarta text-lg font-normal transition-colors ${
                  isActive
                    ? "text-white hover:text-gray-100"
                    : "text-black hover:text-red-600"
                }`}
              >
                MEN
              </button>
            </div>
            <div
              className="relative"
              onMouseEnter={() => setActiveCategory("women")}
            >
              <button
                className={`font-plusjakarta text-lg font-normal transition-colors ${
                  isActive
                    ? "text-white hover:text-gray-100"
                    : "text-black hover:text-red-600"
                }`}
              >
                WOMEN
              </button>
            </div>
          </nav>

          {/* ACTION ICONS */}
          <div className="flex items-center gap-4">
            <Search
              className={`h-5 w-5 cursor-pointer ${
                isActive ? "text-white" : "text-black"
              }`}
            />
            <User
              className={`h-5 w-5 cursor-pointer ${
                isActive ? "text-white" : "text-black"
              }`}
            />
            <Heart
              onClick={() => setActiveDrawer("wishlist")}
              className={`h-5 w-5 cursor-pointer ${
                isActive ? "text-white" : "text-black"
              }`}
            />
            <div className="relative">
              <ShoppingBag
                onClick={() => setActiveDrawer("cart")}
                className={`h-5 w-5 cursor-pointer ${
                  isActive ? "text-white" : "text-black"
                }`}
              />
            </div>
            <Menu
              className={`h-5 w-5 md:hidden cursor-pointer ${
                isActive ? "text-white" : "text-black"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* ===== CATEGORY SECTION ===== */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.0, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-full bg-red-600 text-white shadow-lg z-40 overflow-hidden"
          >
            <div className="container mx-auto px-8 py-10 grid grid-cols-3 gap-10">
              {activeCategory === "men" ? (
                <>
                  <div>
                    <h3 className="text-xl font-plusjakarta mb-4">
                      {menCategory.title}
                    </h3>
                    <ul className="space-y-2">
                      {menCategory.items.map((item, i) => (
                        <li key={i} className="hover:underline cursor-pointer">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="col-span-2 flex justify-center items-center">
                    <img
                      src={menCategory.image}
                      alt="Men"
                      className="w-80 h-80 object-cover rounded-2xl shadow-md"
                    />
                  </div> */}
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-plusjakarta mb-4">
                      {womenCategory.title}
                    </h3>
                    <ul className="space-y-2">
                      {womenCategory.items.map((item, i) => (
                        <li key={i} className="hover:underline cursor-pointer">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="col-span-2 flex justify-center items-center">
                    <img
                      src={womenCategory.image}
                      alt="Women"
                      className="w-80 h-80 object-cover rounded-2xl shadow-md"
                    />
                  </div> */}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SIDE DRAWER ===== */}
      <SideDrawer
        activeDrawer={activeDrawer}
        setActiveDrawer={setActiveDrawer}
        whislist
      />
    </header>
  )
}
