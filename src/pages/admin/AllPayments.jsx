import { useState, useEffect } from "react"
import { Eye, RefreshCcw, Download, CreditCard, Smartphone, Banknote, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Simulated backend data
const mockPaymentsData = [
  {
    id: "txn-1",
    transactionId: "TXN123456",
    orderId: "ORD001",
    customer: "Rahul Kumar",
    method: "UPI",
    gateway: "Razorpay",
    amount: 2499,
    status: "Success",
    date: "18 Jan 2025",
  },
  {
    id: "txn-2",
    transactionId: "TXN123457",
    orderId: "ORD002",
    customer: "Anjali Menon",
    method: "Card",
    gateway: "Stripe",
    amount: 1799,
    status: "Pending",
    date: "18 Jan 2025",
  },
  {
    id: "txn-3",
    transactionId: "TXN123458",
    orderId: "ORD003",
    customer: "Amit Shah",
    method: "COD",
    gateway: "COD",
    amount: 999,
    status: "Failed",
    date: "17 Jan 2025",
  },
  {
    id: "txn-4",
    transactionId: "TXN123459",
    orderId: "ORD004",
    customer: "Priya Sharma",
    method: "UPI",
    gateway: "Razorpay",
    amount: 3499,
    status: "Success",
    date: "17 Jan 2025",
  },
  {
    id: "txn-5",
    transactionId: "TXN123460",
    orderId: "ORD005",
    customer: "Vikram Singh",
    method: "Card",
    gateway: "Stripe",
    amount: 1299,
    status: "Success",
    date: "16 Jan 2025",
  },
]

const statusConfig = {
  Success: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200"
  },
  Pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200"
  },
  Failed: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200"
  },
}

export default function AllPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  

  // Simulate fetching data from backend
  useEffect(() => {
    setTimeout(() => {
      setPayments(mockPaymentsData)
      setLoading(false)
    }, 500)
  }, [])

  // Calculate stats
  const stats = {
    totalRevenue: payments.filter(p => p.status === "Success").reduce((sum, p) => sum + p.amount, 0),
    upiTotal: payments.filter(p => p.method === "UPI" && p.status === "Success").reduce((sum, p) => sum + p.amount, 0),
    cardTotal: payments.filter(p => p.method === "Card" && p.status === "Success").reduce((sum, p) => sum + p.amount, 0),
    codTotal: payments.filter(p => p.method === "COD" && p.status === "Success").reduce((sum, p) => sum + p.amount, 0),
    pendingTotal: payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0),
  }

  // Filter payments based on search
  const filteredPayments = payments.filter(payment => 
    payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewDetails = (paymentId) => {
    console.log("View details for:", paymentId)
    // API call: await api.getPaymentDetails(paymentId)
  }

  const handleRefund = (paymentId) => {
    console.log("Initiate refund for:", paymentId)
    // API call: await api.initiateRefund(paymentId)
  }

  const handleDownloadReceipt = (paymentId) => {
    console.log("Download receipt for:", paymentId)
    // API call: await api.downloadReceipt(paymentId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-800">Loading payments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Payment Dashboard</h1>
          <p className="text-red-800/70">Track and manage all payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <TrendingUp className="text-red-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-red-800/60 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-red-600">₹{stats.totalRevenue.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <Smartphone className="text-red-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-red-800/60 mb-1">UPI Payments</p>
            <h3 className="text-2xl font-bold text-red-600">₹{stats.upiTotal.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <CreditCard className="text-red-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-red-800/60 mb-1">Card Payments</p>
            <h3 className="text-2xl font-bold text-red-600">₹{stats.cardTotal.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <Banknote className="text-red-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-red-800/60 mb-1">COD Payments</p>
            <h3 className="text-2xl font-bold text-red-600">₹{stats.codTotal.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <RefreshCcw className="text-yellow-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-red-800/60 mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">₹{stats.pendingTotal.toLocaleString()}</h3>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100 border border-red-100 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Transaction ID, Order ID, or Customer Name..."
            className="w-full border-2 border-red-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 transition-colors"
          />
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl shadow-lg shadow-red-100 border border-red-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-red-400">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-red-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-red-900">{payment.transactionId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-red-800">{payment.orderId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-red-900">{payment.customer}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {payment.method === "UPI" && <Smartphone size={16} className="text-red-600" />}
                          {payment.method === "Card" && <CreditCard size={16} className="text-red-600" />}
                          {payment.method === "COD" && <Banknote size={16} className="text-red-600" />}
                          <span className="text-red-800 font-medium">{payment.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-red-600">₹{payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[payment.status].bg} ${statusConfig[payment.status].text} ${statusConfig[payment.status].border}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-red-800 text-sm">{payment.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                                   onClick={() =>
                        navigate(`/AdminHome/PaymentDetails/${payment.id}`)
                      }
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                            title="View Details"
                          >
                            <Eye size={18} className="text-red-600" />
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(payment.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                            title="Download Receipt"
                          >
                            <Download size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}