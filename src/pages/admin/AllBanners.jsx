import { useState } from "react"
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Image, Video  } from "lucide-react"
import { useNavigate } from "react-router-dom"

const initialBanners = [
  {
    id: 1,
    title: "Summer Sale",
    type: "Image",
    status: true,
    image: "https://via.placeholder.com/120x50",
    createdAt: "01 Mar 2025",
  },
  {
    id: 2,
    title: "New Arrivals Promo",
    type: "Video",
    status: false,
    image: "https://via.placeholder.com/120x50",
    createdAt: "05 Mar 2025",
  },
]

export default function AllBanners() {
  const [banners, setBanners] = useState(initialBanners)
  const navigate = useNavigate()

  const toggleStatus = (id) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: !b.status } : b
      )
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600">Banners</h1>
          <p className="text-gray-600">Manage promotional banners</p>
        </div>

        <button
          onClick={() => navigate("/AdminHome/AddBannerPage")}
          className="bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3 text-left">Preview</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Created On</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((b) => {
                return (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                            <img
                                src={b.image}
                                alt="banner"
                                className="w-28 h-12 rounded object-cover" />
                        </td>

                        <td className="p-3 font-medium">{b.title}</td>

                        <td className="p-3">
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      ${b.type === "Image"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-purple-100 text-purple-700"}`}
                            >
                                {b.type === "Image" ? (
                                    <>
                                        <Image size={14} />
                                        Image
                                    </>
                                ) : (
                                    <>
                                        <Video size={14} />
                                        Video
                                    </>
                                )}
                            </span>
                        </td>


                        <td className="p-3 text-sm text-gray-600">
                            {b.createdAt}
                        </td>

                        <td className="p-3">
                            <button onClick={() => toggleStatus(b.id)}>
                                {b.status ? (
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
                                onClick={() => navigate("/AdminHome/EditBannerPage")} />
                            <Trash2
                                size={18}
                                className="text-red-600 cursor-pointer" />
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
