import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const initialOffers = [
  {
    id: 1,
    title: "Summer Sale",
    type: "Percentage",
    value: "30%",
    applicableTo: "All Products",
    minOrder: 999,
    status: true,
    validity: "01 Apr 2025 - 30 Apr 2025",
  },
  {
    id: 2,
    title: "Men Wear Offer",
    type: "Flat",
    value: "₹500",
    applicableTo: "Men Category",
    minOrder: 1999,
    status: false,
    validity: "10 Mar 2025 - 20 Mar 2025",
  },
]

export default function AllOffers() {
  const [offers, setOffers] = useState(initialOffers)
  const navigate = useNavigate()

  const toggleStatus = (id) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: !o.status } : o
      )
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Offers
          </h1>
          <p className="text-gray-600">
            Manage product & category offers
          </p>
        </div>
        <button
          onClick={() => navigate("/AdminHome/AddOfferPage")}
          className="mt-4 sm:mt-0 bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Offer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active Offers", value: 5 },
          { label: "Expired", value: 2 },
          { label: "Total Used", value: 7 },
        ].map((item, i) => (
          <div
            key={i}
            className="border border-red-200 rounded-2xl p-4 text-center"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h3 className="text-xl font-bold text-red-600">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3 text-left">Offer Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Applicable To</th>
              <th className="p-3 text-left">Min Order</th>
              <th className="p-3 text-left">Validity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((o) => (
              <tr
                key={o.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{o.title}</td>
                <td className="p-3">{o.type}</td>
                <td className="p-3 font-semibold">{o.value}</td>
                <td className="p-3">{o.applicableTo}</td>
                <td className="p-3">₹{o.minOrder}</td>
                <td className="p-3">{o.validity}</td>

                <td className="p-3">
                  <button onClick={() => toggleStatus(o.id)}>
                    {o.status ? (
                      <ToggleRight className="text-green-600" />
                    ) : (
                      <ToggleLeft className="text-gray-400" />
                    )}
                  </button>
                </td>

                <td className="p-3 flex gap-3">
                  <Edit
                    size={18}
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                      navigate("/AdminHome/EditOfferPage")
                    }
                  />
                  <Trash2
                    size={18}
                    className="text-red-600 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
