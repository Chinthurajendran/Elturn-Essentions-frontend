import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Reset link sent to:", email)
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-400 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
              size={20}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all"
          >
            Send Reset Link
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Success Message */}
        {sent && (
          <p className="text-center text-sm text-green-600 mt-6 font-medium">
            Password reset link sent to your email
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Remembered your password?{" "}
          <span className="text-red-600 font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
