import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, className }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export function Footer() {
  return (
    <footer className="bg-red-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Elturn</span>
            </a>
            <p className="text-sm text-white/80 leading-relaxed">
              Premium fashion for those who appreciate luxury and elegance.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FlipLink
                  href="/women"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Women's Collection
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/men"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Men's Collection
                </FlipLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FlipLink
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact Us
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/shipping"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Shipping Info
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/returns"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/faq"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  FAQ
                </FlipLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FlipLink
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About Us
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/careers"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Careers
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Terms of Service
                </FlipLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Elturn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}