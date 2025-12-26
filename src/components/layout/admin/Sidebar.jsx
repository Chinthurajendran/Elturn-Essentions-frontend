import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Tag,
  Image,
  Star,
  BarChart2,
  UserCog,
  Lock,
  MessageSquare,
  Activity,
  LogOut,
  ChevronDown,
  BadgePercent,
  ChartNoAxesCombined 
} from "lucide-react"

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const location = useLocation()

  const menuSections = [
    {
      title: "Dashboard",
      items: [
        {
          name: "Charts",
          path: "/AdminHome/AdminDashboard",
          icon: <ChartNoAxesCombined  size={20} />,
        },
      ],
    },
    {
      title: "Products",
      items: [
        {
          name: "All Products",
          path: "/AdminHome/AllProducts",
          icon: <Package size={20} />,
        },
        {
          name: "Categories",
          path: "/AdminHome/AllCategories",
          icon: <Tag size={20} />,
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          name: "Orders",
          path: "/AdminHome/AllOrders",
          icon: <ShoppingCart size={20} />,
        },
      ],
    },
    {
      title: "Customers",
      items: [
        {
          name: "Customers",
          path: "/AdminHome/AllCustomer",
          icon: <Users size={20} />,
        },
      ],
    },
    {
      title: "Payments",
      items: [
        {
          name: "Payments",
          path: "/AdminHome/AllPayments",
          icon: <CreditCard size={20} />,
        },
      ],
    },
    {
      title: "Marketing",
      items: [
        {
          name: "Coupons",
          path: "/AdminHome/AllCoupons",
          icon: <Tag size={20} />,
        },
                {
          name: "Offers",
          path: "/AdminHome/AllOffers",
          icon: <BadgePercent  size={20} />,
        },
        { name: "Banners", path: "/AdminHome/AllBanners", icon: <Image size={20} /> },
        { name: "Reviews", path: "/AdminHome/AllReviews", icon: <Star size={20} /> },
      ],
    },
    {
      title: "Reports & Analytics",
      items: [
        {
          name: "Sales Report",
          path: "/admin/reports/sales",
          icon: <BarChart2 size={20} />,
        },
        {
          name: "User Report",
          path: "/admin/reports/users",
          icon: <Users size={20} />,
        },
        {
          name: "Product Performance",
          path: "/admin/reports/products",
          icon: <Activity size={20} />,
        },
      ],
    },
    {
      title: "Admin Management",
      items: [
        {
          name: "Admin Users",
          path: "/AdminHome/AllAdminUsers",
          icon: <UserCog size={20} />,
        },
        {
          name: "Roles & Permissions",
          path: "/AdminHome/AllRoles",
          icon: <Lock size={20} />,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          name: "Help Desk",
          path: "/admin/support",
          icon: <MessageSquare size={20} />,
        },
        {
          name: "Activity Logs",
          path: "/admin/activity-logs",
          icon: <Activity size={20} />,
        },
      ],
    },
  ]

  const toggleSection = (title) => {
    setActiveSection(activeSection === title ? null : title)
  }

  const handleLogout = () => {}

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-700 text-white z-40 shadow-lg">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <LayoutDashboard size={24} />
            </div>
            <span className="font-bold text-lg tracking-wide">Admin Panel</span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white z-50 transition-all duration-300 ease-in-out shadow-2xl
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 w-72 flex flex-col`}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <LayoutDashboard size={26} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl tracking-wide">
                  Admin
                </h2>
                <p className="text-red-100 text-xs">Dashboard Panel</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <X size={22} className="text-white" />
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group
                  ${
                    activeSection === section.title
                      ? "bg-red-50 text-red-700 shadow-sm"
                      : "text-gray-700 hover:bg-red-50/50 hover:text-red-600"
                  }`}
              >
                <span className="tracking-wide">{section.title}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    activeSection === section.title ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Section Items */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeSection === section.title
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-2 space-y-1 pt-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
          ${
            isActive
              ? "bg-red-100 text-red-700"
              : "text-gray-600 hover:bg-red-50 hover:text-red-600"
          }
        `}
                      >
                        <span
                          className={`transition-colors duration-200 ${
                            isActive
                              ? "text-red-600"
                              : "text-gray-400 group-hover:text-red-500"
                          }`}
                        >
                          {item.icon}
                        </span>

                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
               text-red-600 hover:bg-red-50 transition-all font-semibold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Spacer for Desktop */}
      <div className="hidden lg:block w-72"></div>
      {/* LOGOUT */}
    </>
  )
}
