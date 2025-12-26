import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, X, Check } from "lucide-react"

// Simulated backend data with IDs
const mockBackendData = [
  {
    id: "cat-1",
    name: "Men",
    subcategories: [
      { id: "sub-1", name: "Shirts" },
      { id: "sub-2", name: "T-Shirts" },
      { id: "sub-3", name: "Jeans" },
    ],
  },
  {
    id: "cat-2",
    name: "Women",
    subcategories: [
      { id: "sub-4", name: "Dresses" },
      { id: "sub-5", name: "Tops" },
      { id: "sub-6", name: "Skirts" },
    ],
  },
  {
    id: "cat-3",
    name: "Unisex",
    subcategories: [
      { id: "sub-7", name: "Hoodies" },
      { id: "sub-8", name: "Caps" },
      { id: "sub-9", name: "Sneakers" },
    ],
  },
]

export default function AllCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [newSubInputs, setNewSubInputs] = useState({})

  // Simulate fetching data from backend
  useEffect(() => {
    setTimeout(() => {
      setCategories(mockBackendData)
      setLoading(false)
    }, 500)
  }, [])

  const addSubCategory = (categoryId) => {
    const newSubName = newSubInputs[categoryId]?.trim()
    if (!newSubName) return

    const newSub = {
      id: `sub-${Date.now()}`,
      name: newSubName,
    }

    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subcategories: [...cat.subcategories, newSub] }
          : cat
      )
    )

    setNewSubInputs({ ...newSubInputs, [categoryId]: "" })

    // Here you would make API call: await api.addSubcategory(categoryId, newSub)
  }

  const updateSubCategory = (categoryId, subId) => {
    const trimmedValue = editValue.trim()
    if (!trimmedValue) return

    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map((sub) =>
                sub.id === subId ? { ...sub, name: trimmedValue } : sub
              ),
            }
          : cat
      )
    )

    setEditingId(null)
    setEditValue("")

    // API call: await api.updateSubcategory(categoryId, subId, trimmedValue)
  }

  const deleteSubCategory = (categoryId, subId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.filter(
                (sub) => sub.id !== subId
              ),
            }
          : cat
      )
    )

    // API call: await api.deleteSubcategory(categoryId, subId)
  }

  const startEdit = (subId, currentName) => {
    setEditingId(subId)
    setEditValue(currentName)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-800">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white  mb-8 py-4">
          <h1 className="text-2xl font-bold text-black mb-2">
            Product Categories
          </h1>
          <p className="text-black">
            Manage your store categories and subcategories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-red-100 overflow-hidden "
            >
              {/* Category Header */}
              <div className="bg-red-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {category.name}
                  <span className="text-sm font-normal text-red-100">
                    ({category.subcategories.length})
                  </span>
                </h2>
              </div>

              {/* Subcategories List */}
              <div className="p-6">
                <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
                  {category.subcategories.length === 0 ? (
                    <p className="text-white text-center py-8 text-sm">
                      No subcategories yet
                    </p>
                  ) : (
                    category.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="group flex items-center gap-2 bg-red-50 hover:bg-red-100 px-4 py-3 rounded-xl transition-colors"
                      >
                        {editingId === sub.id ? (
                          <>
                            <input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  updateSubCategory(category.id, sub.id)
                                if (e.key === "Escape") cancelEdit()
                              }}
                              className="flex-1 bg-white border-2 border-red-400 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-500"
                              autoFocus
                            />
                            <button
                              onClick={() =>
                                updateSubCategory(category.id, sub.id)
                              }
                              className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <Check size={18} className="text-green-600" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <X size={18} className="text-red-600" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 text-red-900 font-medium">
                              {sub.name}
                            </span>
                            <button
                              onClick={() => startEdit(sub.id, sub.name)}
                              className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-200 rounded-lg transition-all"
                            >
                              <Edit2 size={16} className="text-red-600" />
                            </button>
                            <button
                              onClick={() =>
                                deleteSubCategory(category.id, sub.id)
                              }
                              className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-200 rounded-lg transition-all"
                            >
                              <Trash2 size={16} className="text-red-700" />
                            </button>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Add New Subcategory */}
                <div className="flex gap-2 pt-4 border-t border-red-100">
                  <input
                    value={newSubInputs[category.id] || ""}
                    onChange={(e) =>
                      setNewSubInputs({
                        ...newSubInputs,
                        [category.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addSubCategory(category.id)
                    }}
                    placeholder={`Add ${category.name} subcategory`}
                    className="flex-1 border-2 border-red-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-red-400 transition-colors"
                  />
                  <button
                    onClick={() => addSubCategory(category.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-lg shadow-red-500/30 transition-all hover:shadow-xl hover:shadow-red-500/40"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
