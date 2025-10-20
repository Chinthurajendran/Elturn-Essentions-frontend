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
  FaCamera,
} from "react-icons/fa"
import { Header } from "../../components/layout/Header"
import { Footer } from "../../components/layout/Footer"

export default function AccountPageModern() {
  // Profile state
  const [profile, setProfile] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    dob: "",
    gender: "Male",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
  })

  const [activeTab, setActiveTab] = useState("profile")
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [tempProfile, setTempProfile] = useState(profile)

  // Addresses
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

  // Orders
  const [orders] = useState([
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

  // Address modal handlers
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
      console.log("User logged out")
    }
  }

  // Handle profile update modal
  const handleProfileUpdate = () => {
    setTempProfile(profile)
    setIsProfileModalOpen(true)
  }

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTempProfile({
        ...tempProfile,
        profilePic: URL.createObjectURL(e.target.files[0]),
      })
    }
  }

  const saveProfileChanges = () => {
    setProfile(tempProfile)
    setIsProfileModalOpen(false)
  }

  return (
    <div className=" bg-[#f5f5f7] min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-20 py-8">
        <h1 className="text-3xl font-bold text-[#e60023] mb-10 text-left">
          My Account
        </h1>
        <div className="grid lg:grid-cols-4 gap-6 ">
          {/* Sidebar */}
          <div className="lg:col-span-1 ">
            <div className="bg-white rounded-2xl  overflow-hidden sticky top-6">
              <div
                className="relative w-full h-64 text-white"
                style={{
                  backgroundImage: `url(${profile.profilePic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

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
          <div className="lg:col-span-3 ">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl h-[480px]  p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FaUser className="text-[#e60023]" />
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          value={profile.username}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="flex text-sm font-semibold text-gray-600 mb-2 items-center gap-2">
                          <FaEnvelope className="text-[#e60023]" />
                          Email Address
                        </label>

                        <input
                          type="email"
                          value={profile.email}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="flex text-sm font-semibold text-gray-600 mb-2 items-center gap-2">
                          <FaPhone className="text-[#e60023]" />
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          value={profile.phone}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={profile.dob}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Gender
                        </label>
                        <input
                          type="text"
                          value={profile.gender}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleProfileUpdate}
                      className="px-6 py-3 bg-[#e60023] text-white rounded-xl hover:bg-[#c4001d] transition font-semibold shadow-lg"
                    >
                      Update
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 rounded-2xl bg-white max-h-[480px] overflow-y-auto"
                >
                  <div className="  p-8">
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
                            <FaPhone className="text-xs" /> {addr.phone}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl max-h-[480px] overflow-y-auto p-8"
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

      {/* Profile Update Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsProfileModalOpen(false)}
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
                  Update Personal Information
                </h2>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Profile Picture */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={tempProfile.profilePic}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#e60023]"
                    />
                    <label className="absolute bottom-2 right-2 bg-[#e60023] text-white p-2 rounded-full cursor-pointer hover:bg-[#c4001d] transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePicChange}
                      />
                      <FaCamera />
                    </label>
                  </div>
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={tempProfile.phone}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                />
                <input
                  type="date"
                  value={tempProfile.dob}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, dob: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                />
                <select
                  value={tempProfile.gender}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, gender: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={saveProfileChanges}
                    className="flex-1 px-6 py-3 bg-[#e60023] text-white rounded-xl hover:bg-[#c4001d] transition font-semibold shadow-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsProfileModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address Modal */}
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
                <input
                  type="text"
                  placeholder="Country"
                  value={editingAddress?.country || ""}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      country: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
                />

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={saveAddress}
                    className="flex-1 px-6 py-3 bg-[#e60023] text-white rounded-xl hover:bg-[#c4001d] transition font-semibold shadow-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
