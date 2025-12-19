import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-red-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-plusjakarta font-bold">Elturn</span>
            </Link>
            <p className="text-sm font-plusjakarta text-white/80 leading-relaxed">
              Premium fashion for those who appreciate luxury and elegance.
            </p>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                to="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-bold font-plusjakarta text-lg">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/women"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/men"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Men's Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-bold font-plusjakarta text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold  font-plusjakarta text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white/80 font-plusjakarta hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 font-plusjakarta border-t border-white/20 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Elturn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
