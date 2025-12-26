import { useState } from "react"
import { Percent, Calendar, Tag } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function EditOfferPage() {
  const navigate = useNavigate()

  // Prefilled offer data (later replace with API data)
  const [form, setForm] = useState({
    title: "Summer Sale",
    type: "percentage",
    value: "30",
    category: "Men",
    subCategory: "T-Shirts",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
  })

  const subCategoryOptions = {
    All: [],
    Men: ["Shirts", "T-Shirts", "Jeans", "Trousers", "Jackets"],
    Women: ["Tops", "Dresses", "Jeans", "Handbags"],
    Unisex: ["T-Shirts", "Hoodies", "Caps"],
  }

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === "category") {
      setForm({ ...form, category: value, subCategory: "" })
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      console.log("Updated Offer:", form)
      setLoading(false)
      alert("Offer updated successfully!")
      navigate(-1)
    }, 1000)
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 flex items-center gap-3">
            <Tag size={36} />
            Edit Offer
          </h1>
          <p className="text-red-800/70">
            Update offer details
          </p>
        </div>

        <div className="space-y-6">

          {/* Offer Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6">
              Offer Information
            </h2>

            <label className="block text-sm font-semibold text-red-900 mb-2">
              Offer Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border-2 border-red-200 rounded-xl px-4 py-3 focus:border-red-400 outline-none"
            />
          </div>

          {/* Discount Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Percent size={20} /> Discount Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Discount Type *
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border-2 border-red-200 rounded-xl px-4 py-3 bg-white focus:border-red-400 outline-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              {/* Value */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Discount Value *
                </label>
                <input
                  type="number"
                  name="value"
                  value={form.value}
                  onChange={handleChange}
                  className="w-full border-2 border-red-200 rounded-xl px-4 py-3 focus:border-red-400 outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border-2 border-red-200 rounded-xl px-4 py-3 bg-white focus:border-red-400 outline-none"
                >
                  <option>All</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>
              </div>

              {/* Sub Category */}
              {form.category !== "All" && (
                <div>
                  <label className="block text-sm font-semibold text-red-900 mb-2">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 rounded-xl px-4 py-3 bg-white focus:border-red-400 outline-none"
                  >
                    <option value="">All {form.category}</option>
                    {subCategoryOptions[form.category].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Validity */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Calendar size={20} /> Validity Period
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="border-2 border-red-200 rounded-xl px-4 py-3"
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="border-2 border-red-200 rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Offer"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
