import React from "react"
import { CheckCircle, Truck, Package, CreditCard, Download } from "lucide-react"

export default function Orderdetails() {
  const order = {
    id: "ORD123456",
    date: "18 Dec 2025",
    status: "Delivered",
    customer: {
      name: "Aadya",
      email: "aadya@email.com",
      phone: "+91 98765 43210",
    },
    shipping: {
      address: "MG Road, Kochi, Kerala - 682016",
    },
    payment: {
      method: "UPI",
      transactionId: "TXN789456123",
      status: "Paid",
    },
    items: [
      {
        id: 1,
        name: "Red Hoodie",
        variant: "Size M",
        price: 1499,
        qty: 1,
        image: "https://via.placeholder.com/100",
      },
      {
        id: 2,
        name: "White Sneakers",
        variant: "Size 9",
        price: 2499,
        qty: 1,
        image: "https://via.placeholder.com/100",
      },
    ],
    pricing: {
      subtotal: 3998,
      discount: 500,
      delivery: 100,
      tax: 120,
      total: 3718,
    },
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Order Details</h1>
            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
            <p className="text-sm text-gray-500">Placed on {order.date}</p>
          </div>
          <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
            {order.status}
          </span>
        </div>

        {/* Customer & Address */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-red-600 mb-2">Customer Details</h2>
            <p>{order.customer.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-red-600 mb-2">Shipping Address</h2>
            <p>{order.shipping.address}</p>
          </div>
        </div>

        {/* Products */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-red-600 mb-4">Ordered Items</h2>
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center border-b py-4 last:border-b-0">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.variant}</p>
                <p className="text-sm">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold">₹{item.price}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-red-600 mb-4">Price Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{order.pricing.subtotal}</span></div>
            <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{order.pricing.discount}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>₹{order.pricing.delivery}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{order.pricing.tax}</span></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span><span className="text-red-600">₹{order.pricing.total}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="border rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-red-600 mb-1">Payment Information</h2>
            <p className="text-sm">Method: {order.payment.method}</p>
            <p className="text-sm">Transaction ID: {order.payment.transactionId}</p>
            <p className="text-sm text-green-600">Status: {order.payment.status}</p>
          </div>
          <CreditCard className="text-red-600" />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-end">
          <button className="px-6 py-2 rounded-xl border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
            Cancel Order
          </button>
          <button className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2">
            <Download size={18} /> Invoice
          </button>
        </div>
      </div>
    </div>
  )
}
