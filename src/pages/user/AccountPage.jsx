import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaEdit,
  FaDownload,
  FaTimes,
  FaTrash,
  FaUser,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaPlus,
  FaPhone,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa"

export default function AccountPageModern() {
  const [profilePic, setProfilePic] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
  )
  const [activeTab, setActiveTab] = useState("profile")
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home Address",
      phone: "+91 9876543210",
      address: "123 MG Road",
      city: "Kochi",
      pincode: "682016",
      country: "India",
    },
    {
      id: 2,
      label: "Work Address",
      phone: "+91 9876543211",
      address: "456 Business Park",
      city: "Kochi",
      pincode: "682017",
      country: "India",
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Classic Red T-Shirt",
      date: "2025-10-18",
      status: "Shipped",
      billUrl: "#",
      amount: "₹1,299",
    },
    {
      id: 2,
      product: "Denim Jeans",
      date: "2025-10-17",
      status: "Delivered",
      billUrl: "#",
      amount: "₹2,499",
    },
    {
      id: 3,
      product: "Casual Sneakers",
      date: "2025-10-15",
      status: "Delivered",
      billUrl: "#",
      amount: "₹3,999",
    },
  ])

  const [editingAddress, setEditingAddress] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]))
    }
  }

  const openAddressModal = (addr = null) => {
    setEditingAddress(
      addr || {
        id: null,
        label: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        country: "India",
      }
    )
    setIsModalOpen(true)
  }

  const saveAddress = () => {
    if (editingAddress.id) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? editingAddress : addr
        )
      )
    } else {
      setAddresses((prev) => [...prev, { ...editingAddress, id: Date.now() }])
    }
    setIsModalOpen(false)
  }

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Add your logout logic here
      console.log("User logged out")
      // Example: redirect to login page or clear user session
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              {/* Profile Card */}

              <div
                className="relative w-full h-64 text-white"
                style={{
                  backgroundImage: `url(${profilePic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Edit Button */}
                <label className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition shadow-lg z-10">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                  <FaEdit className="text-[#e60023] text-sm" />
                </label>
              </div>

              {/* Navigation */}
              <div className="p-2">
                {[
                  { id: "profile", label: "Profile Info", icon: FaUser },
                  { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
                  { id: "orders", label: "Order History", icon: FaShoppingBag },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition ${
                      activeTab === tab.id
                        ? "bg-red-50 text-[#e60023] font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="text-lg" />
                    <span>{tab.label}</span>
                  </button>
                ))}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-2 text-gray-600 hover:bg-red-50 hover:text-[#e60023] transition border-t border-gray-100"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FaUser className="text-[#e60023]" />
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          defaultValue="JohnDoe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <FaEnvelope className="text-[#e60023]" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="johndoe@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <FaPhone className="text-[#e60023]" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+91 9876543210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Gender
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="px-6 py-3 bg-[#e60023] text-white rounded-xl hover:bg-[#c4001d] transition font-semibold shadow-lg">
                      Save Changes
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaMapMarkerAlt className="text-[#e60023]" />
                        Saved Addresses
                      </h2>
                      <button
                        onClick={() => openAddressModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#e60023] text-white rounded-xl hover:bg-[#c4001d] transition font-semibold shadow-lg"
                      >
                        <FaPlus /> Add New
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <motion.div
                          key={addr.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="border-2 border-gray-200 rounded-xl p-5 hover:border-[#e60023] transition group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#e60023] rounded-full"></div>
                              <h3 className="font-bold text-gray-800">
                                {addr.label}
                              </h3>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openAddressModal(addr)}
                                className="p-2 text-[#e60023] hover:bg-red-50 rounded-lg transition"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => deleteAddress(addr.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {addr.address}
                          </p>
                          <p className="text-gray-600 text-sm mb-2">
                            {addr.city}, {addr.country} - {addr.pincode}
                          </p>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <FaPhone className="text-xs" />
                            {addr.phone}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FaShoppingBag className="text-[#e60023]" />
                    Order History
                  </h2>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-800 mb-1">
                              {order.product}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Order #{order.id} • {order.date}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                          <p className="font-bold text-lg text-[#e60023]">
                            {order.amount}
                          </p>
                          <a
                            href={order.billUrl}
                            download
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
                          >
                            <FaDownload /> Download Bill
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingAddress?.id ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Label (e.g., Home, Work)"
                  value={editingAddress?.label || ""}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      label: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={editingAddress?.phone || ""}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                />
                <textarea
                  rows="3"
                  placeholder="Full Address"
                  value={editingAddress?.address || ""}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={editingAddress?.city || ""}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={editingAddress?.pincode || ""}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        pincode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                  />
                </div>
                <select
                  value={editingAddress?.country || "India"}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      country: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                >
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveAddress}
                  className="flex-1 bg-[#e60023] text-white rounded-xl py-3 hover:bg-[#c4001d] transition font-bold shadow-lg"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
