import React, { useEffect, useRef } from "react"

import img1 from "../../assets/image.jpg"
import img2 from "../../assets/image.jpg"
import img3 from "../../assets/image.jpg"
import img4 from "../../assets/image.jpg"
import img5 from "../../assets/image.jpg"
import img6 from "../../assets/image.jpg"

const testimonials = [
  {
    id: 1,
    name: "Jen S.",
    title: "Founder",
    company: "XYZ",
    image: img1,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
  },
  {
    id: 2,
    name: "Paul A.",
    title: "Founder",
    company: "XYZ",
    image: img2,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
  },
  {
    id: 3,
    name: "Cindy J.",
    title: "Founder",
    company: "XYZ",
    image: img3,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
  },
  {
    id: 4,
    name: "Danica W.",
    title: "Founder",
    company: "XYZ",
    image: img4,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
  },
  {
    id: 5,
    name: "Peter H.",
    title: "Founder",
    company: "XYZ",
    image: img5,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
  },
  {
    id: 6,
    name: "Lanny B.",
    title: "Founder",
    company: "XYZ",
    image: img6,
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
  },
]

export default function ScrollingTestimonials() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let position = 0
    let animationFrame

    const scroll = () => {
      position -= 1 // move left
      scrollContainer.style.transform = `translateX(${position}px)`

      const width = scrollContainer.scrollWidth / 2
      if (Math.abs(position) >= width) {
        position = 0
      }

      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <section className="w-full py-20 overflow-hidden bg-white relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
        <p className="text-gray-500 mt-2">
          What our customers say about us
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 will-change-transform"
          style={{
            width: "max-content",
            display: "flex",
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-80 flex-shrink-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="text-4xl text-gray-400 mb-4">“</div>
              <p className="text-gray-700 mb-6 leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">
                    {t.title} of {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
