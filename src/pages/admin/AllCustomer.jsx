import React from "react"
import { Info, Ban, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const customers = [
  {
    id: "CUST001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    status: "Active",
    verified: true,
    orders: 12,
    spent: 45600,
    joined: "2024-01-12",
    lastLogin: "2025-01-15",
  },
  {
    id: "CUST002",
    name: "Anjali Verma",
    email: "anjali@gmail.com",
    phone: "+91 9988776655",
    status: "Blocked",
    verified: false,
    orders: 3,
    spent: 5600,
    joined: "2024-03-02",
    lastLogin: "2025-01-10",
  },
  {
    id: "CUST003",
    name: "Arjun Nair",
    email: "arjun@gmail.com",
    phone: "+91 8899776655",
    status: "Active",
    verified: true,
    orders: 20,
    spent: 89999,
    joined: "2023-11-22",
    lastLogin: "2025-01-18",
  },
]

export default function AllCustomers() {
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-600">All Customers</h1>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-red-50 text-red-600">
            <tr>
              <th className="p-4 text-left">Customer ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Verified</th>
              <th className="p-4 text-left">Orders</th>
              <th className="p-4 text-left">Total Spent</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{customer.id}</td>
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {customer.status}
                  </span>
                </td>

                {/* VERIFIED */}
                <td className="p-4">
                  {customer.verified ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                      <CheckCircle size={14} /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 text-xs font-semibold">
                      <Ban size={14} /> Unverified
                    </span>
                  )}
                </td>

                <td className="p-4">{customer.orders}</td>
                <td className="p-4">₹{customer.spent}</td>
                <td className="p-4">{customer.joined}</td>

                {/* ACTION */}
                <td className="p-4">
                  <div className="flex justify-center">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() =>
                        navigate(`/AdminHome/CustomerDetails/${customer.id}`)
                      }
                    >
                      <Info size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}
