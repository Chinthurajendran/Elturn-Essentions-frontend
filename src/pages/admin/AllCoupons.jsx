
import { useState } from "react"
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const initialCoupons = [
  {
    id: 1,
    name: "New Year Sale",
    code: "NEW20",
    type: "Percentage",
    value: "20%",
    category: "All",
    minOrder: 999,
    used: 34,
    status: true,
    validity: "01 Jan 2025 - 31 Jan 2025",
  },
  {
    id: 2,
    name: "Men Festive",
    code: "MEN300",
    type: "Flat",
    value: "₹300",
    category: "Men",
    minOrder: 1499,
    used: 12,
    status: false,
    validity: "10 Jan 2025 - 20 Jan 2025",
  },
]

export default function AllCoupons() {
  const [coupons, setCoupons] = useState(initialCoupons)
  const navigate = useNavigate()

  const toggleStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: !c.status } : c))
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-600">Coupons</h1>
          <p className="text-gray-600">Manage discount coupons </p>
        </div>
        <button className="mt-4 sm:mt-0 bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        onClick={() => navigate("/AdminHome/AddCouponPage")}>
          <Plus size={18} /> Add Coupon
        </button>
      </div>

      {/* Stats */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
  {[
    { label: "Active Coupons", value: 8 },
    { label: "Expired", value: 3 },
    { label: "Total Used", value: 120 },
  ].map((item, i) => (
    <div
      key={i}
      className="border border-red-200 rounded-2xl p-4 text-center"
    >
      <p className="text-sm text-gray-500">{item.label}</p>
      <h3 className="text-xl font-bold text-red-600">{item.value}</h3>
    </div>
  ))}
</div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Min Order</th>
              <th className="p-3 text-left">Used</th>
              <th className="p-3 text-left">Validity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.code}</td>
                <td className="p-3">{c.type}</td>
                <td className="p-3 font-semibold">{c.value}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">₹{c.minOrder}</td>
                <td className="p-3">{c.used}</td>
                <td className="p-3">{c.validity}</td>
                <td className="p-3">
                  <button onClick={() => toggleStatus(c.id)}>
                    {c.status ? (
                      <ToggleRight className="text-green-600" />
                    ) : (
                      <ToggleLeft className="text-gray-400" />
                    )}
                  </button>
                </td>
                <td className="p-3 flex gap-3">
                  <Edit className="text-blue-600 cursor-pointer" size={18}
                  onClick={() => navigate("/AdminHome/EditCouponPage")} />
                  <Trash2 className="text-red-600 cursor-pointer" size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
