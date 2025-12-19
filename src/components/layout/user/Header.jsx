import { Link, useNavigate } from "react-router-dom"
import { ShoppingBag, Search, User, Menu, Heart, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import { SideDrawer } from "./SideDrawer"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeDrawer, setActiveDrawer] = useState(null) // cart | wishlist
  const dropdownRef = useRef(null)

  const navigate = useNavigate()

  const categories = {
    men: {
      title: "Men’s Collection",
      items: ["Shirts", "T-Shirts", "Jeans", "Jackets", "Shoes"],
    },
    women: {
      title: "Women’s Collection",
      items: ["Dresses", "Tops", "Jeans"],
    },
  }

  const isActive = Boolean(activeCategory)

  // ================= GSAP DROP-UP =================
  useEffect(() => {
    if (!dropdownRef.current) return

    if (activeCategory) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })
    }
  }, [activeCategory])

  return (
    <>
      {/* ================= BLUR OVERLAY ================= */}
      <AnimatePresence>
        {(isActive || mobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"
            onMouseEnter={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>

      {/* ================= DROPDOWN ================= */}
      <div
        ref={dropdownRef}
        className="
            absolute left-0 w-full  z-50 
            bg-red-600   text-white shadow-xl
            overflow-hidden origin-bottom
          "
        style={{ height: 0, opacity: 0 }}
        onMouseLeave={() => setActiveCategory(null)}
      >
        {activeCategory && (
          <div className="container mx-auto px-6 py-16 grid grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {categories[activeCategory].title}
              </h3>
              <ul className="space-y-2">
                {categories[activeCategory].items.map((item, i) => (
                  <li key={i} className="cursor-pointer hover:underline">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ================= HEADER ================= */}
      <header className="absolute top-0 left-0 w-full z-50">
        {/* HEADER BAR */}
        <div
          className={`transition-colors duration-300 ${
            isActive ? "bg-transparent text-white" : "bg-transparent text-black"
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="text-2xl font-bold">
                ELTURN
              </Link>

              <nav className=" hidden md:flex gap-10">
                {["men", "women"].map((cat) => (
                  <button
                    key={cat}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className="text-lg font-medium hover:text-gray-100 transition"
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 cursor-pointer" />
                <User
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => navigate("/AccountPage")}
                />
                <Heart
                  onClick={() => setActiveDrawer("wishlist")}
                  className={`h-5 w-5 cursor-pointer ${
                    isActive ? "text-white" : "text-black"
                  }`}
                />
                <ShoppingBag
                  onClick={() => setActiveDrawer("cart")}
                  className={`h-5 w-5 cursor-pointer ${
                    isActive ? "text-white" : "text-black"
                  }`}
                />
                <Menu
                  className="w-6 h-6 cursor-pointer md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ===== MOBILE MENU ===== */}{" "}
        <AnimatePresence>
          {" "}
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-0 right-0 w-64 h-full bg-red-600 text-white shadow-lg z-50 p-6"
            >
              {" "}
              <X
                className="h-6 w-6 absolute top-4 right-4 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />{" "}
              <h2 className="text-xl font-bold mb-6">CATEGORIES</h2>{" "}
              <div className="flex flex-col gap-6">
                {" "}
                {["men", "women"].map((cat) => (
                  <div key={cat}>
                    {" "}
                    <h3 className="text-lg font-semibold mb-2">
                      {cat.toUpperCase()}
                    </h3>{" "}
                    <ul className="space-y-2">
                      {" "}
                      {categories[cat].items.map((item, i) => (
                        <li key={i} className="cursor-pointer hover:underline">
                          {" "}
                          {item}{" "}
                        </li>
                      ))}{" "}
                    </ul>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>
        {/* ===== SIDE DRAWER ===== */}
        <SideDrawer
          activeDrawer={activeDrawer}
          setActiveDrawer={setActiveDrawer}
          whislist
        />
      </header>
    </>
  )
}
