import { useState, useRef } from "react"

export default function OtpVerification() {
  const [otp, setOtp] = useState(Array(6).fill(""))
  const inputRefs = useRef([])

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("OTP:", otp.join(""))
  }

  const handleResend = () => {
    console.log("Resend OTP")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-400 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6">
          <span className="text-sm text-gray-500">
            Didn’t receive the OTP?{" "}
          </span>
          <button
            onClick={handleResend}
            className="text-sm text-red-600 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  )
}
