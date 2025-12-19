import React from "react"
import { Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const products = [
  {
    id: 1,
    name: "Men Casual Shirt",
    category: "Men",
    price: 1299,
    stock: 25,
    status: "Active",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Women Denim Jacket",
    category: "Women",
    price: 2499,
    stock: 0,
    status: "Out of Stock",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Footwear",
    price: 3199,
    stock: 12,
    status: "Low Stock",
    image: "https://via.placeholder.com/50",
  },
]

export default function AllProducts() {
    const navigate = useNavigate()
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700" onClick={()=>(navigate("/AdminHome/AddProduct"))}>
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800" onClick={()=>(navigate("/AdminHome/EditProduct"))}>
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
