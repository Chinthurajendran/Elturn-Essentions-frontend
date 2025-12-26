import { useState, useEffect } from "react"
import {
  Tag,
  Percent,
  Calendar,
  Users,
  DollarSign,
  Package,
  Clock,
  Shield,
  ArrowLeft,
  Save,
} from "lucide-react"

export default function EditCouponPage() {
  // Simulated coupon data - in real app, fetch from API based on coupon ID
  const existingCouponData = {
    id: "CPN001",
    name: "New Year Sale",
    code: "SAVE2025",
    type: "percentage",
    value: "20",
    category: "Men",
    subCategory: "Shirts",
    minOrder: "1500",
    maxDiscount: "500",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    usageLimit: "100",
    perUserLimit: "1",
    status: true,
  }

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "percentage",
    value: "",
    category: "All",
    subCategory: "",
    minOrder: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    perUserLimit: "",
    status: true,
  })

  // Sub-category options based on selected category
  const subCategoryOptions = {
    All: [],
    Men: [
      "Shirts",
      "T-Shirts",
      "Jeans",
      "Trousers",
      "Jackets",
      "Shoes",
      "Accessories",
    ],
    Women: [
      "Tops",
      "Dresses",
      "Jeans",
      "Trousers",
      "Jackets",
      "Shoes",
      "Accessories",
      "Handbags",
    ],
    Unisex: [
      "T-Shirts",
      "Hoodies",
      "Caps",
      "Sunglasses",
      "Watches",
      "Backpacks",
    ],
  }

  const [loading, setLoading] = useState(false)

  // Load existing coupon data on component mount
  useEffect(() => {
    // In real app: fetch coupon data from API
    setForm(existingCouponData)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    // Reset sub-category when category changes
    if (name === "category") {
      setForm({ ...form, [name]: value, subCategory: "" })
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Updated Coupon Data:", form)
      // API call: await api.updateCoupon(form.id, form)
      setLoading(false)
      alert("Coupon updated successfully!")
    }, 1000)
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2 flex items-center gap-3">
            <Tag className="text-red-600" size={36} />
            Edit Coupon
          </h1>
          <p className="text-red-800/70">Update coupon details and settings</p>
          <div className="mt-2 inline-block bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm font-semibold">
            Coupon ID: {existingCouponData.id}
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-red-100 border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Tag size={20} />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coupon Name */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Coupon Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., New Year Sale"
                  className="w-full border-2 border-red-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                />
              </div>

              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Coupon Code *
                </label>
                <div className="flex gap-2">
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    required
                    placeholder="SAVE2025"
                    className="flex-1 uppercase border-2 border-red-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 transition-colors bg-gray-50"
                    disabled
                  />
                </div>
                <p className="text-xs text-red-600/60 mt-1">
                  Coupon code cannot be changed after creation
                </p>
              </div>
            </div>
          </div>

          {/* Discount Details Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-red-100 border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Percent size={20} />
              Discount Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discount Type */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Discount Type *
                </label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full appearance-none border-2 border-red-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 transition-colors bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                  <span className="absolute right-3 top-3.5 text-red-400 font-medium">
                    {form.type === "percentage" ? "%" : "₹"}
                  </span>
                </div>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Discount Value *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none">
                    {form.type === "percentage" ? "%" : "₹"}
                  </span>
                  <input
                    name="value"
                    type="number"
                    value={form.value}
                    onChange={handleChange}
                    required
                    placeholder={form.type === "percentage" ? "10" : "500"}
                    className="w-full border-2 border-red-200 rounded-xl pl-10 px-4 py-3
               focus:outline-none focus:border-red-400 transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Applicable Category
                </label>
                <div className="relative">
                  <Package
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none"
                    size={18}
                  />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full appearance-none border-2 border-red-200 rounded-xl pl-10 px-4 py-3 focus:outline-none focus:border-red-400 transition-colors bg-white"
                  >
                    <option>All</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Unisex</option>
                  </select>
                </div>
              </div>

              {/* Sub-Category - Only show if category is not "All" */}

              {form.category !== "All" &&
                subCategoryOptions[form.category]?.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-red-900 mb-2">
                      Sub-Category (Optional)
                    </label>
                    <div className="relative">
                      <Package
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none"
                        size={18}
                      />
                      <select
                        name="subCategory"
                        value={form.subCategory}
                        onChange={handleChange}
                        className="w-full appearance-none border-2 border-red-200 rounded-xl pl-10 px-4 py-3 focus:outline-none focus:border-red-400 transition-colors bg-white"
                      >
                        <option value="">All {form.category} Products</option>
                        {subCategoryOptions[form.category].map((subCat) => (
                          <option key={subCat} value={subCat}>
                            {subCat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

              {/* Minimum Order */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Minimum Order Value
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none"
                    size={18}
                  />
                  <input
                    name="minOrder"
                    type="number"
                    value={form.minOrder}
                    onChange={handleChange}
                    placeholder="999"
                    className="w-full border-2 border-red-200 rounded-xl pl-10 px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                  />
                </div>
              </div>

              {/* Max Discount */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Maximum Discount Amount (optional)
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none"
                    size={18}
                  />
                  <input
                    name="maxDiscount"
                    type="number"
                    value={form.maxDiscount}
                    onChange={handleChange}
                    placeholder="5000"
                    className="w-full border-2 border-red-200 rounded-xl pl-10 px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                  />
                </div>
                <p className="text-xs text-red-600/60 mt-1">
                  Only applicable for percentage discounts
                </p>
              </div>
            </div>
          </div>

          {/* Validity Period Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-red-100 border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Calendar size={20} />
              Validity Period
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 rounded-xl pl-10 px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                  />
                  <Clock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-full border-2 border-red-200 rounded-xl pl-10 px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                  />
                  <Clock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium pointer-events-none"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Usage Limits Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-red-100 border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Users size={20} />
              Usage Limits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Usage Limit */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Total Usage Limit
                </label>
                <input
                  name="usageLimit"
                  type="number"
                  value={form.usageLimit}
                  onChange={handleChange}
                  placeholder="100"
                  className="w-full border-2 border-red-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                />
                <p className="text-xs text-red-600/60 mt-1">
                  Total number of times this coupon can be used
                </p>
              </div>

              {/* Per User Limit */}
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Per User Limit
                </label>
                <input
                  name="perUserLimit"
                  type="number"
                  value={form.perUserLimit}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full border-2 border-red-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
                />
                <p className="text-xs text-red-600/60 mt-1">
                  How many times one user can use this coupon
                </p>
              </div>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="bg-white rounded-2xl shadow-lg shadow-red-100 border border-red-100 p-6 sm:p-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="status"
                  checked={form.status}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-red-200 rounded-full peer-checked:bg-red-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md"></div>
              </div>
              <div>
                <span className="font-semibold text-red-900 block">
                  Active Coupon
                </span>
                <span className="text-sm text-red-600/60">
                  {form.status
                    ? "Coupon is currently active"
                    : "Coupon is currently inactive"}
                </span>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Coupon
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
