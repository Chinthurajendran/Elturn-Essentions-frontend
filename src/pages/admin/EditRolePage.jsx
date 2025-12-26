import { useState, useEffect } from "react"
import { Shield, ChevronDown, ChevronUp } from "lucide-react"

/* ================= MODULE CONFIG ================= */

export const modules = [
  { name: "Dashboard", permissions: ["View"] },
  {
    name: "Products",
    subModules: [
      {
        name: "AllProducts",
        permissions: ["View", "Create", "Update", "Delete"],
      },
      {
        name: "Categories",
        permissions: ["View", "Create", "Update", "Delete"],
      },
    ],
  },
  { name: "Orders", permissions: ["View", "Update", "Delete"] },
  { name: "Customers", permissions: ["View", "Update"] },
  { name: "Payments", permissions: ["View", "Update"] },
  {
    name: "Marketing",
    subModules: [
      { name: "Coupons", permissions: ["View", "Create", "Update", "Delete"] },
      { name: "Offers", permissions: ["View", "Create", "Update", "Delete"] },
      { name: "Banners", permissions: ["View", "Create", "Update", "Delete"] },
      { name: "Reviews", permissions: ["View", "Delete"] },
    ],
  },
  {
    name: "Reports",
    subModules: [
      { name: "SalesReports", permissions: ["View"] },
      { name: "UserReports", permissions: ["View"] },
      { name: "ProductReports", permissions: ["View"] },
    ],
  },
  {
    name: "AdminManagement",
    subModules: [
      {
        name: "AdminUsers",
        permissions: ["View", "Create", "Update", "Delete"],
      },
      {
        name: "RolePermissions",
        permissions: ["View", "Create", "Update", "Delete"],
      },
    ],
  },
  {
    name: "Support",
    subModules: [
      { name: "HelpDesk", permissions: ["View", "Create", "Update", "Delete"] },
      { name: "ActivityLogs", permissions: ["View"] },
    ],
  },
]

/* ================= MOCK DATA FOR EDITING ================= */
const mockExistingRole = {
  roleName: "Store Manager",
  description: "Manages daily store operations",
  permissions: {
    Dashboard: { View: true },
    Products: {
      AllProducts: { View: true, Create: true, Update: true },
      Categories: { View: true, Create: true },
    },
    Orders: { View: true, Update: true },
  },
}

/* ================= PAGE ================= */

export default function EditRolePage() {
  const [roleName, setRoleName] = useState("")
  const [description, setDescription] = useState("")
  const [selected, setSelected] = useState({})
  const [expandedModules, setExpandedModules] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  /* ================= LOAD EXISTING DATA ================= */
  useEffect(() => {
    // Simulate fetching existing role data
    const loadRoleData = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      setTimeout(() => {
        setRoleName(mockExistingRole.roleName)
        setDescription(mockExistingRole.description)
        setSelected(mockExistingRole.permissions)
        setIsLoading(false)
      }, 500)

      /*
      // Real API call would look like:
      const response = await fetch("/api/roles/123");
      const data = await response.json();
      setRoleName(data.roleName);
      setDescription(data.description);
      setSelected(data.permissions);
      setIsLoading(false);
      */
    }

    loadRoleData()
  }, [])

  /* ================= TOGGLE ================= */

  const toggleModule = (moduleName) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }))
  }

  const togglePermission = (module, subModule, action) => {
    setSelected((prev) => {
      const data = structuredClone(prev)

      if (!subModule) {
        data[module] ??= {}
        data[module][action] = !data[module][action]
        if (!data[module][action]) delete data[module][action]
        if (!Object.keys(data[module]).length) delete data[module]
        return data
      }

      data[module] ??= {}
      data[module][subModule] ??= {}
      data[module][subModule][action] = !data[module][subModule][action]

      if (!data[module][subModule][action]) {
        delete data[module][subModule][action]
      }
      if (!Object.keys(data[module][subModule]).length) {
        delete data[module][subModule]
      }
      if (!Object.keys(data[module]).length) {
        delete data[module]
      }

      return data
    })
  }

  const isChecked = (module, subModule, action) => {
    if (!subModule) return !!selected[module]?.[action]
    return !!selected[module]?.[subModule]?.[action]
  }

  const getPermissionCount = (moduleName) => {
    if (!selected[moduleName]) return 0
    let count = 0
    Object.values(selected[moduleName]).forEach((val) => {
      if (typeof val === "boolean") count++
      else count += Object.keys(val).length
    })
    return count
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!roleName.trim()) {
      alert("Please enter a role name")
      return
    }

    const payload = {
      roleName,
      description,
      permissions: selected,
    }

    console.log("UPDATE TO BACKEND:", payload)

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)

    /*
    await fetch("/api/roles/123", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    */
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading role data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Role</h1>
            <p className="text-slate-600 text-sm">
              Update role permissions and access levels
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg animate-pulse">
            <p className="text-green-800 font-medium">
              ✓ Role updated successfully!
            </p>
          </div>
        )}

        {/* Role Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Role Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Store Manager"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="Brief description of the role"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Module Permissions
            </h2>
            <span className="text-sm text-gray-500">
              {Object.keys(selected).length} modules selected
            </span>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => {
              const permCount = getPermissionCount(mod.name)
              const isExpanded = expandedModules[mod.name]

              return (
                <div
                  key={mod.name}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  {/* Module Header */}
                  <div
                    className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer select-none"
                    onClick={() => toggleModule(mod.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-700 font-medium">
                        {mod.name}
                      </div>
                      {permCount > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {permCount} selected
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  {/* Module Content */}
                  {isExpanded && (
                    <div className="p-4 bg-white">
                      {/* Direct Permissions */}
                      {mod.permissions && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          {mod.permissions.map((perm) => (
                            <label
                              key={perm}
                              className="flex items-center gap-2 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                                checked={isChecked(mod.name, null, perm)}
                                onChange={() =>
                                  togglePermission(mod.name, null, perm)
                                }
                              />
                              <span className="text-sm text-gray-700 group-hover:text-red-600 transition">
                                {perm}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* Sub Modules */}
                      {mod.subModules && (
                        <div className="space-y-4">
                          {mod.subModules.map((sub) => (
                            <div
                              key={sub.name}
                              className="pl-4 border-l-2 border-gray-200"
                            >
                              <p className="font-medium text-gray-700 mb-2 text-sm">
                                {sub.name}
                              </p>
                              <div className="flex flex-wrap gap-3">
                                {sub.permissions.map((perm) => (
                                  <label
                                    key={perm}
                                    className="flex items-center gap-2 cursor-pointer group"
                                  >
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                                      checked={isChecked(
                                        mod.name,
                                        sub.name,
                                        perm
                                      )}
                                      onChange={() =>
                                        togglePermission(
                                          mod.name,
                                          sub.name,
                                          perm
                                        )
                                      }
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-red-600 transition">
                                      {perm}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={() => {
              // Reset to original loaded data
              setRoleName(mockExistingRole.roleName)
              setDescription(mockExistingRole.description)
              setSelected(mockExistingRole.permissions)
            }}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Reset Changes
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  )
}