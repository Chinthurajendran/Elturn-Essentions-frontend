import React, { useEffect, useRef } from "react"

import img1 from "../../assets/customer1.jpg"
import img2 from "../../assets/customer2.jpg"
import img3 from "../../assets/customer3.jpg"
import img4 from "../../assets/customer4.jpg"
import img5 from "../../assets/customer5.jpg"
import img6 from "../../assets/customer6.jpg"

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
    title: "Designer",
    company: "ABC",
    image: img2,
    quote:
      "I love the experience! Everything was smooth and beautifully designed.",
  },
  {
    id: 3,
    name: "Cindy J.",
    title: "Manager",
    company: "PQR",
    image: img3,
    quote:
      "Amazing service! Highly recommended for professionals looking for quality.",
  },
  {
    id: 4,
    name: "Danica W.",
    title: "Developer",
    company: "LMN",
    image: img4,
    quote: "Fantastic experience from start to finish!",
  },
  {
    id: 5,
    name: "Peter H.",
    title: "Consultant",
    company: "DEF",
    image: img5,
    quote: "Customer support was top-notch. Really satisfied!",
  },
  {
    id: 6,
    name: "Lanny B.",
    title: "Founder",
    company: "XYZ",
    image: img6,
    quote: "A wonderful experience, I’ll definitely come back again.",
  },
]

// Helper: create multiple rows with duplicates
const splitIntoRows = (data, rows) => {
  const itemsPerRow = Math.ceil(data.length / rows)
  const result = []
  for (let i = 0; i < rows; i++) {
    result.push([...data.slice(i * itemsPerRow, (i + 1) * itemsPerRow)])
  }
  return result
}

export default function ScrollingTestimonials() {
  const rowRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    // Slower speed for first and last rows, faster for center
    const speeds = [0.6, 1.5, 0.9]
    // Center row (index 1) goes right, others go left
    const directions = [-1, 1, -1]
    const frames = []

    rowRefs.forEach((ref, idx) => {
      const container = ref.current
      if (!container) return

      // Start center row from negative position for left-to-right scroll
      let pos = directions[idx] === 1 ? -(container.scrollWidth / 2) : 0

      const animate = () => {
        pos += speeds[idx] * directions[idx]
        container.style.transform = `translateX(${pos}px)`
        const width = container.scrollWidth / 2
        
        // Reset position based on direction for seamless loop
        if (directions[idx] === -1 && pos <= -width) {
          pos = 0
        } else if (directions[idx] === 1 && pos >= 0) {
          pos = -width
        }
        
        frames[idx] = requestAnimationFrame(animate)
      }

      frames[idx] = requestAnimationFrame(animate)
    })

    return () => frames.forEach((f) => cancelAnimationFrame(f))
  }, [])

  const rows = splitIntoRows([...testimonials, ...testimonials], 3)

  return (
    <section className="w-full py-20 overflow-hidden bg-gray-50 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real experiences from our valued customers
        </p>
      </div>

      <div className="space-y-10">
        {rows.map((row, i) => (
          <div
            key={i}
            className="relative w-full overflow-hidden"
          >
            <div
              ref={rowRefs[i]}
              className="flex gap-6 will-change-transform"
              style={{ width: "max-content", display: "flex" }}
            >
              {[...row, ...row].map((t, j) => (
                <div
                  key={j}
                  className="flex w-[550px] h-[190px] bg-white text-black rounded-2xl overflow-hidden flex-shrink-0 shadow-sm"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-40 h-full object-cover rounded-l-2xl"
                  />
                  <div className="p-7 flex flex-col justify-center">
                    <p className="font-semibold text-xl">{t.name}</p>
                    <p className="text-base text-gray-600 mb-2">
                      {t.title} of {t.company}
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}