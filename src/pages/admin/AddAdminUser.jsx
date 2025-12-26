import { useState } from "react";
import { Save, X, User, Mail, Lock, Shield, Eye, EyeOff } from "lucide-react";

const roles = ["Admin", "Support"];

export default function AddAdminUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    status: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New User Data:", form);
    alert("User added successfully!");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center">
            <User className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold"> Add Admin User</h1>
            <p className="text-slate-600 text-sm">
              Create a new administrator account
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="text-gray-400" size={20} />
                  </div>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 appearance-none bg-white cursor-pointer"
                  >
                    {roles.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Save size={20} />
              <span>Save User</span>
            </button>
            <button
              type="button"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            All fields are required. The user will receive a confirmation email.
          </p>
        </div>
      </div>
    </div>
  );
}
