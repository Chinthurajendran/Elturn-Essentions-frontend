import { useState } from "react"
import { Eye, EyeOff, Mail, User, Phone, Lock } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [form, setForm] = useState({
    email: "user@email.com", // verified email
    username: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT SIDE (Info) */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-red-600 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Join Us Today
          </h2>
          <p className="text-red-100 text-lg leading-relaxed">
            Complete your registration and unlock exclusive features,
            personalized content, and seamless access.
          </p>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="p-8 sm:p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Registration
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email (Verified) */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Username */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all mt-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
