import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: true,
    lastLogin: "2025-12-25 14:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Support",
    status: false,
    lastLogin: "2025-12-24 10:15",
  },
];

export default function AllAdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const navigate = useNavigate();

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: !u.status } : u))
    );
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Admin Users</h1>
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          onClick={() => navigate(`/AdminHome/AddAdminUser`)}
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Last Login</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.lastLogin}</td>
                <td className="p-3">
                  <button onClick={() => toggleUserStatus(user.id)}>
                    {user.status ? (
                      <ToggleRight className="text-green-600" />
                    ) : (
                      <ToggleLeft className="text-gray-400" />
                    )}
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <Edit
                    size={18}
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                      navigate(`/AdminHome/EditAdminUser`)
                    }
                  />
                  <Trash2
                    size={18}
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteUser(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
