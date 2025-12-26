import React from "react"
import { Eye,Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

const orders = [
  {
    id: "ORD001",
    customer: "Rahul Sharma",
    total: 3499,
    payment: "Paid",
    status: "Delivered",
    date: "2025-01-10",
  },
  {
    id: "ORD002",
    customer: "Anjali Verma",
    total: 2199,
    payment: "COD",
    status: "Pending",
    date: "2025-01-11",
  },
  {
    id: "ORD003",
    customer: "Arjun Nair",
    total: 4999,
    payment: "Paid",
    status: "Cancelled",
    date: "2025-01-12",
  },
]

export default function AllOrders() {
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Orders</h1>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Order Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">₹{order.total}</td>
                <td className="p-4">{order.payment}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() =>
                        navigate(`/AdminHome/Orderdetails/${order.id}`)
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
