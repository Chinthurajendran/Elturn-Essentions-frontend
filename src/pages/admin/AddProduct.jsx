import React, { useState } from "react"
import { Plus, X, Upload, Image as ImageIcon, Package } from "lucide-react"

const DEFAULT_SIZES = ["S", "M", "L", "XL"]

export default function AddProduct() {
  // ---------- BASIC INFO ----------
  const [category, setCategory] = useState("")
  const [subCategories, setSubCategories] = useState({
    Men: ["Shirts", "Pants"],
    Women: ["Tops", "Dresses"],
    Unisex: ["Hoodies"],
  })
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [newSubCategory, setNewSubCategory] = useState("")
  const [showSubModal, setShowSubModal] = useState(false)

  // ---------- IMAGES ----------
  const [mainImage, setMainImage] = useState(null)
  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [previewGallery, setPreviewGallery] = useState([])

  // ---------- VARIANTS ----------
  const [variants, setVariants] = useState([])
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [sizes, setSizes] = useState(DEFAULT_SIZES)
  const [newSize, setNewSize] = useState("")
  const [sizeModalIndex, setSizeModalIndex] = useState(null)

  // ---------- HANDLERS ----------
  const addColor = () => {
    if (variants.find(v => v.color === selectedColor)) return
    setVariants([...variants, { color: selectedColor, sizes: [] }])
  }

  const removeColor = (index) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const toggleSize = (colorIndex, size) => {
    const updated = [...variants]
    const sizeIndex = updated[colorIndex].sizes.findIndex(s => s.size === size)
    
    if (sizeIndex !== -1) {
      updated[colorIndex].sizes.splice(sizeIndex, 1)
    } else {
      updated[colorIndex].sizes.push({ size, stock: "" })
    }
    setVariants(updated)
  }

  const updateStock = (colorIndex, size, stock) => {
    const updated = [...variants]
    const sizeIndex = updated[colorIndex].sizes.findIndex(s => s.size === size)
    if (sizeIndex !== -1) {
      updated[colorIndex].sizes[sizeIndex].stock = stock
    }
    setVariants(updated)
  }

  const handleMainImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMainImage(file)
      setMainImagePreview(URL.createObjectURL(file))
    }
  }

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setGalleryImages(files)
    setPreviewGallery(files.map(file => URL.createObjectURL(file)))
  }

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
    setPreviewGallery(previewGallery.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      description: e.target.description.value,
      category,
      subCategory: selectedSubCategory,
      mainImage,
      galleryImages,
      variants,
    }
    console.log("FINAL PRODUCT DATA 👉", data)
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
              <p className="text-slate-600 text-sm">Fill in the details to create a new product</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO CARD */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-full" />
              Basic Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your product..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="" >Select Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                {category && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Sub Category</label>
                    <div className="flex gap-2">
                      <select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-white"
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories[category]?.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowSubModal(true)}
                        className="px-4 py-3 bg-red-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* IMAGES CARD */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-full" />
              Product Images
            </h2>

            <div className="space-y-6">
              {/* Main Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Main Image (Front View)</label>
                {!mainImagePreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-slate-400 group-hover:text-red-600 transition-colors mb-3" />
                      <p className="text-sm text-slate-600 font-medium">Click to upload main image</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleMainImage} className="hidden" />
                  </label>
                ) : (
                  <div className="relative group">
                    <img src={mainImagePreview} className="w-full h-64 object-cover rounded-2xl" alt="Main" />
                    <button
                      type="button"
                      onClick={() => {
                        setMainImage(null)
                        setMainImagePreview(null)
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Gallery Images (Max 4)</label>
                {previewGallery.length === 0 ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                    <div className="flex flex-col items-center justify-center">
                      <Plus className="w-10 h-10 text-slate-400 group-hover:text-red-600 transition-colors mb-2" />
                      <p className="text-sm text-slate-600 font-medium">Upload gallery images</p>
                      <p className="text-xs text-slate-500 mt-1">Multiple files allowed</p>
                    </div>
                    <input type="file" multiple accept="image/*" onChange={handleGalleryImages} className="hidden" />
                  </label>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewGallery.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} className="w-full h-32 object-cover rounded-xl" alt={`Gallery ${i + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VARIANTS CARD */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-full" />
              Color Variants & Stock
            </h2>

            <div className="space-y-6">
              {/* Add Color */}
              <div className="flex gap-3 items-center p-4 bg-slate-50 rounded-xl">
                <label className="text-sm font-semibold text-slate-700">Add Color:</label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-14 h-14 cursor-pointer rounded-lg "
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Color
                </button>
              </div>

              {/* Color Variants */}
              {variants.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Package className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No color variants added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <div key={index} className="border-2 border-slate-200 rounded-2xl p-6 hover:border-red-300 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                            style={{ background: variant.color }}
                          />
                          <span className="font-semibold text-slate-900">Available Sizes</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Size Selection */}
                      <div className="flex gap-3 flex-wrap mb-4">
                        {sizes.map((size) => {
                          const checked = variant.sizes.some(s => s.size === size)
                          return (
                            <label
                              key={size}
                              className={`px-4 py-2 rounded-lg border-2 cursor-pointer transition-all font-medium ${
                                checked
                                  ? 'bg-red-600 text-white border-red-600'
                                  : 'bg-white text-slate-700 border-slate-300 hover:border-red-400'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleSize(index, size)}
                                className="hidden"
                              />
                              {size}
                            </label>
                          )
                        })}
                        <button
                          type="button"
                          onClick={() => setSizeModalIndex(index)}
                          className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all font-medium"
                        >
                          + Custom
                        </button>
                      </div>

                      {/* Stock Inputs */}
                      {variant.sizes.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {variant.sizes.map((s) => (
                            <div key={s.size}>
                              <label className="text-xs font-semibold text-slate-600 mb-1 block">{s.size} Stock</label>
                              <input
                                type="number"
                                placeholder="0"
                                value={s.stock}
                                onChange={(e) => updateStock(index, s.size, e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            Save Product
          </button>
        </form>

        {/* ADD SUB CATEGORY MODAL */}
        {showSubModal && (
          <Modal title="Add Sub Category" onClose={() => setShowSubModal(false)}>
            <input
              placeholder="Enter sub category name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setNewSubCategory(e.target.value)}
              value={newSubCategory}
            />
            <button
              onClick={() => {
                if (newSubCategory.trim()) {
                  setSubCategories({
                    ...subCategories,
                    [category]: [...subCategories[category], newSubCategory],
                  })
                  setShowSubModal(false)
                  setNewSubCategory("")
                }
              }}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Add Sub Category
            </button>
          </Modal>
        )}

        {/* ADD SIZE MODAL */}
        {sizeModalIndex !== null && (
          <Modal title="Add Custom Size" onClose={() => setSizeModalIndex(null)}>
            <input
              placeholder="Size (e.g., XXL, 42, 3XL)"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setNewSize(e.target.value)}
              value={newSize}
            />
            <button
              onClick={() => {
                if (newSize.trim() && !sizes.includes(newSize)) {
                  setSizes([...sizes, newSize])
                  setNewSize("")
                  setSizeModalIndex(null)
                }
              }}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Add Size
            </button>
          </Modal>
        )}
      </div>
    </div>
  )
}

// ---------- REUSABLE MODAL ----------
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-in">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}