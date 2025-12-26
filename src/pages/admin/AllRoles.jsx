import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ToggleRight,
  ToggleLeft,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all modules",
    status: true,
  },
  {
    id: 2,
    name: "Support",
    description: "Limited access to support and orders",
    status: true,
  },
]

export default function AllRoles() {
  const [roles, setRoles] = useState(initialRoles)
  const navigate = useNavigate()

  const toggleRoleStatus = (id) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    )
  }

  const deleteRole = (id) => {
    if (window.confirm("Are you sure to delete this role?")) {
      setRoles((prev) => prev.filter((r) => r.id !== id))
    }
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Roles & Permissions</h1>
        <button className="bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2">
          <Plus
            size={18}
            onClick={() => navigate(`/AdminHome/AddRolePage`)}
          />{" "}
          Add Role
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3">Role Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{role.name}</td>
                <td className="p-3">{role.description}</td>
                <td className="p-3">
                  <button onClick={() => toggleRoleStatus(role.id)}>
                    {role.status ? (
                      <ToggleRight className="text-green-600" />
                    ) : (
                      <ToggleLeft className="text-gray-400" />
                    )}
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <Edit size={18} onClick={() => navigate(`/AdminHome/EditRolePage`)} className="text-blue-600 cursor-pointer" />
                  <Trash2
                    size={18}
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteRole(role.id)}
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
