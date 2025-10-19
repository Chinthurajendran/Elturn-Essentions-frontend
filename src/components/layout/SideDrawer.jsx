// src/components/layout/SideDrawer.jsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Dummy images (replace with actual imports)
import img1 from "../../assets/T-shirt1.jpg"
import img2 from "../../assets/T-shirt2.jpg"
import img3 from "../../assets/T-shirt3.jpg"
import img4 from "../../assets/T-shirt4.jpg"
import img5 from "../../assets/T-shirt5.jpg"

export function SideDrawer({ activeDrawer, setActiveDrawer }) {
  const navigate = useNavigate()

  // Dummy cart items with stock
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      category: "Men's T-Shirt",
      name: "Urban Explorer",
      image: img1,
      size: "M",
      color: "#808080",
      quantity: 1,
      price: 999,
      stock: 5,
    },
    {
      id: 2,
      category: "Men's Shirt",
      name: "Classic Heritage",
      image: img2,
      size: "L",
      color: "#800000",
      quantity: 2,
      price: 1099,
      stock: 2,
    },
    {
      id: 3,
      category: "Men's Jacket",
      name: "Winter Breeze",
      image: img3,
      size: "XL",
      color: "#000080",
      quantity: 1,
      price: 2499,
      stock: 3,
    },
    {
      id: 4,
      category: "Men's Shoes",
      name: "Urban Runner",
      image: img4,
      size: "42",
      color: "#FFD700",
      quantity: 1,
      price: 2999,
      stock: 1,
    },
    {
      id: 5,
      category: "Men's Cap",
      name: "Street Style",
      image: img5,
      size: "Free",
      color: "#008000",
      quantity: 3,
      price: 499,
      stock: 3,
    },
  ])

  // Dummy wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 6,
      category: "Women's Dress",
      name: "Summer Glow",
      image: img1,
      size: "M",
      color: "#FF69B4",
      quantity: 1,
      price: 1299,
    },
    {
      id: 7,
      category: "Women's T-Shirt",
      name: "Casual Chic",
      image: img2,
      size: "S",
      color: "#FFA500",
      quantity: 2,
      price: 799,
    },
    {
      id: 8,
      category: "Women's Jacket",
      name: "Autumn Vibe",
      image: img3,
      size: "L",
      color: "#800080",
      quantity: 1,
      price: 2199,
    },
    {
      id: 9,
      category: "Women's Shoes",
      name: "City Walk",
      image: img4,
      size: "38",
      color: "#000000",
      quantity: 1,
      price: 2599,
    },
    {
      id: 10,
      category: "Women's Hat",
      name: "Sun Shine",
      image: img5,
      size: "Free",
      color: "#FFFF00",
      quantity: 1,
      price: 399,
    },
  ])

  // Handle quantity change for cart items
  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta
          return {
            ...item,
            quantity: Math.min(Math.max(1, newQuantity), item.stock),
          }
        }
        return item
      })
    )
  }

  // Handle remove item from cart or wishlist
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckOutClick = () => {
    navigate(`/CheckoutPage`)
  }
  //   const handleCheckOutClick = () => {
  //   setActiveDrawer(null)
  //   setTimeout(() => navigate("/CheckoutPage"), 300)
  // }

  return (
    <AnimatePresence>
      {activeDrawer && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setActiveDrawer(null)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7 }}
            className="fixed top-0 right-0 h-full w-[30%] bg-[#f5f5f7] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-red-600 text-white">
              <h2 className="text-lg font-plusjakarta">
                {activeDrawer === "cart"
                  ? `Your Bag (${cartItems.length} item${
                      cartItems.length !== 1 ? "s" : ""
                    })`
                  : `Your Wishlist (${wishlistItems.length} item${
                      wishlistItems.length !== 1 ? "s" : ""
                    })`}
              </h2>
              <X
                className="cursor-pointer"
                onClick={() => setActiveDrawer(null)}
              />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {activeDrawer === "cart" ? (
                cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center mt-20">
                    Your bag is empty.
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[136px] h-[195px] object-cover"
                      />
                      <div className="flex-1 ml-4 mt-5 mb-5">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.category}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center mt-1 gap-2">
                          <span className="text-sm text-gray-500">Color:</span>
                          <span
                            className="w-4 h-4"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Stock: {item.stock}
                        </p>

                        <div className="flex items-center mt-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-l disabled:opacity-50"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-r disabled:opacity-50"
                            onClick={() => handleQuantityChange(item.id, +1)}
                            disabled={item.quantity === item.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right pr-5 pt-5">
                        <p>₹{item.price * item.quantity}</p>
                        <button
                          className="text-sm text-red-500 mt-1"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : wishlistItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-20">
                  Your wishlist is empty.
                </p>
              ) : (
                wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[136px] h-[195px] object-cover"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                      <div className="flex items-center mt-1 gap-2">
                        <span className="text-sm text-gray-500">Color:</span>
                        <span
                          className="w-4 h-4"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </div>
                      <button
                        className="text-sm text-red-500 mt-1"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {activeDrawer === "cart" && cartItems.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between mb-4">
                  <span>Total:</span>
                  <span>₹{totalAmount}</span>
                </div>
                <button
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                  onClick={handleCheckOutClick}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
