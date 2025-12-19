import React from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// -------------------- QUICK STATS --------------------
const quickStats = [
  { title: "Total Orders", value: 1245 },
  { title: "Orders Today", value: 38 },
  { title: "Pending Orders", value: 112 },
  { title: "Cancelled Orders", value: 24 },

  { title: "Total Revenue", value: "₹4,25,000" },
  { title: "Today’s Revenue", value: "₹18,200" },
  { title: "Monthly Revenue", value: "₹1,35,000" },
  { title: "Avg Order Value", value: "₹1,250" },

  { title: "Total Customers", value: 860 },
  { title: "New Users Today", value: 22 },
  { title: "Active Users", value: 740 },
  { title: "Inactive Users", value: 120 },

  { title: "Total Products", value: 320 },
  { title: "Out of Stock", value: 18 },
  { title: "Low Stock Alerts", value: 27 },
]

// -------------------- CHART DATA --------------------
const salesData = [
  { date: "Mon", revenue: 12000 },
  { date: "Tue", revenue: 18000 },
  { date: "Wed", revenue: 15000 },
  { date: "Thu", revenue: 22000 },
  { date: "Fri", revenue: 26000 },
  { date: "Sat", revenue: 30000 },
  { date: "Sun", revenue: 28000 },
]

const orderStatusData = [
  { name: "Completed", value: 820 },
  { name: "Pending", value: 260 },
  { name: "Cancelled", value: 110 },
  { name: "Returned", value: 55 },
]

const userGrowthData = [
  { day: "Mon", users: 12 },
  { day: "Tue", users: 18 },
  { day: "Wed", users: 14 },
  { day: "Thu", users: 20 },
  { day: "Fri", users: 25 },
  { day: "Sat", users: 30 },
  { day: "Sun", users: 28 },
]

const topProductsData = [
  { name: "T-Shirt", sold: 320 },
  { name: "Jeans", sold: 280 },
  { name: "Hoodie", sold: 210 },
  { name: "Jacket", sold: 170 },
]

const paymentData = [
  { name: "UPI", value: 45 },
  { name: "Card", value: 30 },
  { name: "Wallet", value: 15 },
  { name: "COD", value: 10 },
]

const COLORS = ["#16a34a", "#2563eb", "#dc2626", "#f59e0b"]

// -------------------- COMPONENT --------------------
export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8 bg-white min-h-screen">

      {/* ================= QUICK STATS ================= */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow p-4"
            >
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-xl font-bold mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SALES OVER TIME ================= */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-4">Sales Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#dc2626"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= ORDERS & USERS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Order Status */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={orderStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= PRODUCTS & PAYMENTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProductsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {paymentData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
