import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import img1 from "../../assets/T-shirt1.jpg";
import img2 from "../../assets/T-shirt2.jpg";
import { Header } from "../../components/layout/user/Header";
import { Footer } from "../../components/layout/user/Footer";

export default function CheckoutPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("existing");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [coupon, setCoupon] = useState("");
  const [country, setCountry] = useState("India");

  const products = [
    { id: 1, name: "Classic Red T-Shirt", image: img1, quantity: 2, price: 999 },
    { id: 2, name: "Denim Jeans", image: img2, quantity: 1, price: 1799 },
  ];

  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const discount = coupon ? 200 : 0;
  const total = subtotal + gst - discount;

  return (
    <div className="bg-gray-50 min-h-screen font-plusjakarta text-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-12 pt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[#e60023] mb-10 text-left">
          Checkout – Elturn
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-2/3 space-y-8">

            {/* Contact Info */}
            {!isSignedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-[#e60023] mb-4">Contact Information</h2>
                <p className="text-gray-500 mb-4">Enter your email to continue checkout.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#e60023]"
                  />
                  <button
                    onClick={() => setIsSignedIn(true)}
                    className="bg-[#e60023] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Address Section */}
            {isSignedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-[#e60023] mb-4">Delivery Address</h2>
                <div className="flex flex-wrap gap-4 mb-5">
                  {["existing", "new"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedAddress(type)}
                      className={`px-5 py-2 rounded-lg border transition ${
                        selectedAddress === type
                          ? "border-[#e60023] text-[#e60023] bg-red-50 shadow-inner"
                          : "border-gray-300 hover:border-[#e60023]"
                      }`}
                    >
                      {type === "existing" ? "Select Existing Address" : "Add New Address"}
                    </button>
                  ))}
                </div>

                {selectedAddress === "existing" ? (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p className="font-medium">John Doe</p>
                    <p className="text-gray-500 text-sm">123 MG Road, Kochi, Kerala – 682016</p>
                    <p className="text-gray-500 text-sm">+91 9876543210</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    <input type="text" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    <textarea placeholder="Address" rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="City" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                      <input type="text" placeholder="Postal Code" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <select value={country} onChange={e => setCountry(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                )}
              </motion.div>
            )}

            {/* Payment Section */}
            {isSignedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-[#e60023] mb-4">Shipping & Payment</h2>
                <div className="space-y-4">
                  {[
                    { type: "razorpay", label: "Pay with Razorpay", icon: <SiRazorpay className="inline mr-2 text-lg" /> },
                    { type: "card", label: "Credit / Debit Card", icon: <FaCreditCard className="inline mr-2 text-lg" /> },
                    { type: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave className="inline mr-2 text-lg" /> },
                  ].map((p) => (
                    <button
                      key={p.type}
                      onClick={() => setSelectedPayment(p.type)}
                      className={`w-full text-left border rounded-lg px-4 py-3 flex items-center justify-between transition ${
                        selectedPayment === p.type ? "border-[#e60023] bg-red-50 text-[#e60023]" : "border-gray-300 hover:border-[#e60023]"
                      }`}
                    >
                      {p.icon} {p.label}
                    </button>
                  ))}

                  {selectedPayment === "card" && (
                    <div className="space-y-3 mt-3">
                      <input type="text" placeholder="Cardholder Name" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                      <input type="text" placeholder="Card Number" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                        <input type="text" placeholder="CVV" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </div>

          {/* RIGHT COLUMN – Order Summary */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6 sticky top-24 h-max">
            <h2 className="text-xl font-semibold mb-4 text-[#e60023]">Order Summary</h2>

            <div className="space-y-4 border-b pb-4">
              {products.map(p => (
                <div key={p.id} className="flex items-center justify-between gap-4">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {p.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{p.price * p.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-[#e60023]"
              />
              <button className="w-full bg-[#e60023] text-white rounded-lg py-2 font-semibold hover:bg-red-700 transition">
                Apply
              </button>
            </div>

            {/* Price Details */}
            <div className="mt-6 space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-[#e60023] text-white rounded-lg py-3 text-lg font-semibold hover:bg-red-700 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}