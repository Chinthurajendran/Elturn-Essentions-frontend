import React, { useEffect, useState } from "react"
import { Plus, X, Upload, Package } from "lucide-react"
import { useParams } from "react-router-dom"

const DEFAULT_SIZES = ["S", "M", "L", "XL"]

export default function EditProduct() {
  const { productId } = useParams()

  // ---------- BASIC INFO ----------
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [subCategories, setSubCategories] = useState({
    Men: ["Shirts", "Pants"],
    Women: ["Tops", "Dresses"],
    Unisex: ["Hoodies"],
  })
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [showSubModal, setShowSubModal] = useState(false)
  const [newSubCategory, setNewSubCategory] = useState("")

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

  // ---------- FETCH PRODUCT ----------
  useEffect(() => {
    // 🔹 Replace with real API
    const product = {
      name: "Oversized Hoodie",
      description: "Premium cotton hoodie",
      category: "Unisex",
      subCategory: "Hoodies",
      mainImage: "https://via.placeholder.com/600",
      galleryImages: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/301",
      ],
      variants: [
        {
          color: "#000000",
          sizes: [
            { size: "M", stock: 10 },
            { size: "L", stock: 5 },
          ],
        },
      ],
    }

    setName(product.name)
    setDescription(product.description)
    setCategory(product.category)
    setSelectedSubCategory(product.subCategory)
    setMainImagePreview(product.mainImage)
    setPreviewGallery(product.galleryImages)
    setVariants(product.variants)
  }, [productId])

  // ---------- HANDLERS ----------
  const addColor = () => {
    if (variants.some((v) => v.color === selectedColor)) return
    setVariants([...variants, { color: selectedColor, sizes: [] }])
  }

  const removeColor = (index) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const toggleSize = (colorIndex, size) => {
    const updated = [...variants]
    const exists = updated[colorIndex].sizes.find((s) => s.size === size)

    if (exists) {
      updated[colorIndex].sizes = updated[colorIndex].sizes.filter(
        (s) => s.size !== size
      )
    } else {
      updated[colorIndex].sizes.push({ size, stock: "" })
    }
    setVariants(updated)
  }

  const updateStock = (colorIndex, size, stock) => {
    const updated = [...variants]
    const s = updated[colorIndex].sizes.find((s) => s.size === size)
    if (s) s.stock = stock
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
    setPreviewGallery(files.map((f) => URL.createObjectURL(f)))
  }

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
    setPreviewGallery(previewGallery.filter((_, i) => i !== index))
  }

  // ---------- SUBMIT ----------
  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedProduct = {
      name,
      description,
      category,
      subCategory: selectedSubCategory,
      mainImage,
      galleryImages,
      variants,
    }

    console.log("UPDATED PRODUCT 👉", updatedProduct)
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center">
            <Package className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <p className="text-slate-600 text-sm">Update product details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-full" />
              Basic Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Product Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  placeholder="Describe your product..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      setSelectedSubCategory("")
                    }}
                    className="w-full px-4 py-3 rounded-xl border"
                  >
                    <option value="">Select Category</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Unisex</option>
                  </select>
                </div>

                {category && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Sub Category
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border"
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories[category]?.map((sub) => (
                          <option key={sub}>{sub}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowSubModal(true)}
                        className="px-4 py-3 bg-red-600 text-white rounded-xl"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>

          {/* IMAGES */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-full" />
              Product Images
            </h2>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Main Image (Front View)
            </label>
            {/* MAIN IMAGE */}
            {!mainImagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-slate-400 group-hover:text-red-600 transition-colors mb-3" />
                  <p className="text-sm text-slate-600 font-medium">
                    Click to upload main image
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImage}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={mainImagePreview}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setMainImagePreview(null)}
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Gallery Images */}
            <div className="pt-5">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Gallery Images (Max 4)
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                  <div className="flex flex-col items-center justify-center">
                    <Plus className="w-10 h-10 text-slate-400 group-hover:text-red-600 transition-colors mb-2" />
                    <p className="text-sm text-slate-600 font-medium">
                      Upload gallery images
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Multiple files allowed
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryImages}
                    className="hidden"
                  />
                </label>
                {previewGallery.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      className="w-full h-32 object-cover rounded-xl"
                      alt={`Gallery ${i + 1}`}
                    />
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
            </div>
          </div>

          {/* VARIANTS */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-full" />
              Color Variants & Stock
            </h2>
            <div className="flex gap-3 items-center p-4 bg-slate-50 rounded-xl">
              <label className="text-sm font-semibold text-slate-700">
                Add Color:
              </label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-14 h-14"
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

            {variants.map((variant, i) => (
              <div key={i} className="border-2 rounded-xl p-6 mb-4">
                <div className="flex justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ background: variant.color }}
                  />
                  <button onClick={() => removeColor(i)}>
                    <X />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {sizes.map((size) => {
                    const checked = variant.sizes.some((s) => s.size === size)
                    return (
                      <label
                        key={size}
                        className={`px-4 py-2 rounded-lg border cursor-pointer ${
                          checked ? "bg-red-600 text-white" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          hidden
                          checked={checked}
                          onChange={() => toggleSize(i, size)}
                        />
                        {size}
                      </label>
                    )
                  })}

                  <button
                    type="button"
                    onClick={() => setSizeModalIndex(i)}
                    className="px-4 py-2 border-dashed border rounded-lg"
                  >
                    + Custom
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {variant.sizes.map((s) => (
                    <input
                      key={s.size}
                      type="number"
                      value={s.stock}
                      onChange={(e) => updateStock(i, s.size, e.target.value)}
                      placeholder={`${s.size} Stock`}
                      className="px-3 py-2 border rounded-lg"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-red-600 text-white rounded-2xl text-lg font-bold"
          >
            Update Product
          </button>
        </form>

        {/* SUB CATEGORY MODAL */}
        {showSubModal && (
          <Modal
            title="Add Sub Category"
            onClose={() => setShowSubModal(false)}
          >
            <input
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border"
            />
            <button
              onClick={() => {
                if (newSubCategory.trim()) {
                  setSubCategories({
                    ...subCategories,
                    [category]: [...subCategories[category], newSubCategory],
                  })
                  setNewSubCategory("")
                  setShowSubModal(false)
                }
              }}
              className="w-full py-3 bg-red-600 text-white rounded-xl"
            >
              Add Sub Category
            </button>
          </Modal>
        )}

        {/* SIZE MODAL */}
        {sizeModalIndex !== null && (
          <Modal
            title="Add Custom Size"
            onClose={() => setSizeModalIndex(null)}
          >
            <input
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border"
            />
            <button
              onClick={() => {
                if (newSize.trim() && !sizes.includes(newSize)) {
                  setSizes([...sizes, newSize])
                  setNewSize("")
                  setSizeModalIndex(null)
                }
              }}
              className="w-full py-3 bg-red-600 text-white rounded-xl"
            >
              Add Size
            </button>
          </Modal>
        )}
      </div>
    </div>
  )
}

// ---------- MODAL ----------
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0  bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-xl">{title}</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
