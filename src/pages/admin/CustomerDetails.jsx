import React, { useState } from "react"
import {
  Ban,
  CheckCircle,
  Unlock,
  ShieldCheck,
  Mail,
  Phone,
  User,
} from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"

export default function CustomerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // MOCK CUSTOMER DATA (replace with API later)
  const [customer, setCustomer] = useState({
    id,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    gender: "Male",
    dob: "1996-04-12",
    status: "Active", // Active | Blocked
    emailVerified: true,
    phoneVerified: true,
    joined: "12 Jan 2024",
    lastLogin: "18 Jan 2025",
    PreviousLogin: "10 Jan 2025", 
    device: "Chrome · Windows",

    analytics: {
      totalOrders: 12,
      totalSpent: 45600,
      cancelled: 1,
      returned: 2,
    },

    wallet: {
      balance: 1200,
      codCount: 3,
      refunds: 2,
    },

    addresses: {
      shipping: "MG Road, Kochi, Kerala - 682016",
      billing: "MG Road, Kochi, Kerala - 682016",
    },
  })

  const toggleStatus = () => {
    setCustomer((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Blocked" : "Active",
    }))
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 mb-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-red-600">Customer Details</h1>
          <p className="text-sm text-gray-500">Customer ID: {customer.id}</p>
        </div>

        <button
          onClick={toggleStatus}
          className={`px-6 py-2 rounded-xl font-semibold transition
            ${
              customer.status === "Active"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
        >
          {customer.status === "Active" ? "Block Customer" : "Unblock Customer"}
        </button>
      </div>

      {/* STATUS BADGE */}
      <div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold
            ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {customer.status}
        </span>
      </div>

      {/* PROFILE */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-red-600 mb-3">Profile</h2>
          <p className="flex items-center gap-2"><User size={16} /> {customer.name}</p>
          <p className="flex items-center gap-2"><Mail size={16} /> {customer.email}
            {customer.emailVerified && <ShieldCheck size={14} className="text-green-600" />}
          </p>
          <p className="flex items-center gap-2"><Phone size={16} /> {customer.phone}
            {customer.phoneVerified && <ShieldCheck size={14} className="text-green-600" />}
          </p>
          <p>Gender: {customer.gender}</p>
          <p>DOB: {customer.dob}</p>
          <p>Joined: {customer.joined}</p>
        </div>

        {/* ANALYTICS */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-red-600 mb-3">Customer Analytics</h2>
          <p>Total Orders: {customer.analytics.totalOrders}</p>
          <p>Total Spent: ₹{customer.analytics.totalSpent}</p>
          <p>Cancelled Orders: {customer.analytics.cancelled}</p>
          <p>Returned Orders: {customer.analytics.returned}</p>
        </div>
      </div>

      {/* WALLET & PAYMENT */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-red-600 mb-3">Wallet & Payments</h2>
          <p>Wallet Balance: ₹{customer.wallet.balance}</p>
          <p>Refunds Count: {customer.wallet.refunds}</p>
          <p>COD Usage: {customer.wallet.codCount}</p>
        </div>

        {/* SECURITY */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-red-600 mb-3">Security</h2>
          <p>Last Login: {customer.lastLogin}</p>
          <p>Previous Login: {customer.PreviousLogin}</p>
          <p>Device: {customer.device}</p>
        </div>
      </div>

      {/* ADDRESSES */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold text-red-600 mb-3">Addresses</h2>
        <p><strong>Shipping:</strong> {customer.addresses.shipping}</p>
        <p><strong>Billing:</strong> {customer.addresses.billing}</p>
      </div>

      {/* ADMIN ACTIONS */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold text-red-600 mb-3">Admin Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            Reset Password
          </button>
          <button className="px-4 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            Force Logout
          </button>
          <button className="px-4 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            Send Notification
          </button>
          <button className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100">
            Soft Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
