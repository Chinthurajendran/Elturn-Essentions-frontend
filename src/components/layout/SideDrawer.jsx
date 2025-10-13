// src/components/layout/SideDrawer.jsx
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function SideDrawer({
  activeDrawer,
  setActiveDrawer,
  cartItems,
  handleQuantityChange,
  removeItem,
}) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <AnimatePresence>
      {activeDrawer && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setActiveDrawer(null)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-[30%] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-red-600 text-white">
              <h2 className="text-lg font-semibold">
                {activeDrawer === "cart"
                  ? `Your Bag (${cartItems.length} article${
                      cartItems.length !== 1 ? "s" : ""
                    })`
                  : "Your Wishlist"}
              </h2>
              <X
                className="cursor-pointer"
                onClick={() => setActiveDrawer(null)}
              />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {activeDrawer === "cart" ? (
                cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center mt-20">
                    Your bag is empty.
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.color}, Size: {item.size}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-l"
                            onClick={() =>
                              handleQuantityChange(item.id, -1)
                            }
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-r"
                            onClick={() =>
                              handleQuantityChange(item.id, +1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
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
              ) : (
                <p className="text-gray-500 text-center mt-20">
                  Your wishlist is empty.
                </p>
              )}
            </div>

            {/* Footer */}
            {activeDrawer === "cart" && cartItems.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition">
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
