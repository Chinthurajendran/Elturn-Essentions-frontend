import { useState, useEffect } from "react"
import {
  Image as ImageIcon,
  Video,
  Save,
  UploadCloud,
  ArrowLeft,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function EditBannerPage() {
  const navigate = useNavigate()

  // Simulated existing banner data (replace with API)
  const existingBanner = {
    id: 1,
    title: "Summer Sale",
    type: "Image", // Image | Video
    fileUrl: "https://via.placeholder.com/1200x400",
  }

  const [form, setForm] = useState({
    title: "",
    type: "Image",
    file: null,
  })

  const [preview, setPreview] = useState(null)

  useEffect(() => {
    // Prefill data
    setForm({
      title: existingBanner.title,
      type: existingBanner.type,
      file: null,
    })
    setPreview(existingBanner.fileUrl)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === "file") {
      const file = files[0]
      setForm({ ...form, file })
      setPreview(file ? URL.createObjectURL(file) : preview)
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title) {
      alert("Banner title is required")
      return
    }

    const payload = {
      ...form,
      file: form.file || "existing-file",
    }

    console.log("Updated Banner:", payload)
    alert("Banner updated successfully")
    navigate("/AdminHome/AllBanners")
  }

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-4xl font-bold text-red-600">
          Edit Banner
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-8xl mx-auto bg-white rounded-3xl shadow-xl border border-red-100 p-8 space-y-8"
      >
        {/* Banner Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Banner Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Summer Sale Banner"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3
              focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition"
          />
        </div>

        {/* Banner Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Banner Type *
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, type: "Image", file: null })
              }
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition
                ${
                  form.type === "Image"
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <ImageIcon size={22} />
              <span className="font-semibold">Image Banner</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({ ...form, type: "Video", file: null })
              }
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition
                ${
                  form.type === "Video"
                    ? "border-purple-400 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-purple-300"
                }`}
            >
              <Video size={22} />
              <span className="font-semibold">Video Banner</span>
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Replace {form.type} (Optional)
          </label>

          <label
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed
              border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-red-400 transition"
          >
            <UploadCloud size={36} className="text-red-500" />
            <p className="font-medium text-gray-600">
              Click to upload new file
            </p>
            <p className="text-xs text-gray-400">
              Leave empty to keep existing banner
            </p>

            <input
              type="file"
              accept={
                form.type === "Image" ? "image/*" : "video/*"
              }
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="mt-6 rounded-2xl border overflow-hidden">
              {form.type === "Image" ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-64 object-cover"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full max-h-64"
                />
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-gray-300
              font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-red-600 text-white
              font-semibold flex items-center gap-2 hover:bg-red-700
              shadow-lg shadow-red-500/30 transition"
          >
            <Save size={18} />
            Update Banner
          </button>
        </div>
      </form>
    </div>
  )
}
