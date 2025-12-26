import { Download, RefreshCcw, FileText } from "lucide-react"

export default function PaymentDetails() {
  const payment = {
    transactionId: "TXN123456",
    orderId: "ORD001",
    invoice: "INV-2025-001",
    status: "Success",
    date: "18 Jan 2025, 11:30 AM",
    gateway: "Razorpay",
    method: "UPI",
    amount: {
      order: 2499,
      discount: 200,
      tax: 90,
      shipping: 50,
      net: 2439,
    },
    customer: {
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      billing: "Kochi, Kerala, India",
      shipping: "Kochi, Kerala, India",
    },
    timeline: [
      "Payment Initiated",
      "Payment Authorized",
      "Payment Captured",
    ],
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-red-600">Payment Details</h1>
        <p className="text-gray-600">Transaction overview & actions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Info */}
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-4">Payment Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><b>Transaction ID:</b> {payment.transactionId}</p>
              <p><b>Order ID:</b> {payment.orderId}</p>
              <p><b>Invoice:</b> {payment.invoice}</p>
              <p><b>Status:</b> <span className="text-green-600 font-semibold">{payment.status}</span></p>
              <p><b>Gateway:</b> {payment.gateway}</p>
              <p><b>Method:</b> {payment.method}</p>
              <p><b>Date:</b> {payment.date}</p>
            </div>
          </div>

          {/* Amount Breakdown */}
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-4">Amount Breakdown</h2>
            <div className="space-y-2 text-sm">
              <p>Order Amount: ₹{payment.amount.order}</p>
              <p>Discount: -₹{payment.amount.discount}</p>
              <p>Tax: ₹{payment.amount.tax}</p>
              <p>Shipping: ₹{payment.amount.shipping}</p>
              <hr />
              <p className="font-bold">Net Received: ₹{payment.amount.net}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-4">Customer Details</h2>
            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {payment.customer.name}</p>
              <p><b>Email:</b> {payment.customer.email}</p>
              <p><b>Phone:</b> {payment.customer.phone}</p>
              <p><b>Billing Address:</b> {payment.customer.billing}</p>
              <p><b>Shipping Address:</b> {payment.customer.shipping}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="border rounded-2xl p-5 space-y-3">
            <button className="w-full bg-red-600 text-white py-2 rounded-xl flex justify-center gap-2">
              <FileText size={18} /> View Invoice
            </button>
            <button className="w-full border border-red-600 text-red-600 py-2 rounded-xl flex justify-center gap-2">
              <Download size={18} /> Download Invoice
            </button>
            <button className="w-full bg-gray-100 py-2 rounded-xl flex justify-center gap-2">
              <RefreshCcw size={18} /> Initiate Refund
            </button>
          </div>

          {/* Timeline */}
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-4">Payment Timeline</h2>
            <ul className="space-y-2 text-sm list-disc list-inside">
              {payment.timeline.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
