import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = (e) => {
    e.preventDefault()
    console.log("OTP sent to:", email)
    setOtpSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-400 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Sign up using your email to receive an OTP
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendOtp} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
          >
            Send OTP
            <ArrowRight size={18} />
          </button>
        </form>

        {/* OTP Sent Message */}
        {otpSent && (
          <div className="mt-6 text-center">
            <p className="text-sm text-green-600 font-medium">
              OTP sent successfully to your email
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <span className="text-red-600 font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
