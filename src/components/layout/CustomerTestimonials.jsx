import React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

import customer1 from "../../assets/image.jpg";
import customer2 from "../../assets/image.jpg";
import customer3 from "../../assets/image.jpg";
import customer4 from "../../assets/image.jpg";
import customer5 from "../../assets/image.jpg";
import customer6 from "../../assets/image.jpg";
import customer7 from "../../assets/image.jpg";
import customer8 from "../../assets/image.jpg";
import customer9 from "../../assets/image.jpg";
import customer10 from "../../assets/image.jpg";

const testimonials = [
  {
    rating: 5,
    quote: "Absolutely love the quality! The silk dress I ordered exceeded my expectations. Worth every penny.",
    name: "Sarah Mitchell",
    designation: "Fashion Enthusiast",
    src: customer1,
  },
  {
    rating: 5,
    quote: "The wool suit is impeccably crafted. The attention to detail and fit is outstanding. Highly recommend!",
    name: "James Wilson",
    designation: "Business Professional",
    src: customer2,
  },
  {
    rating: 5,
    quote: "Great shopping experience! Fast delivery and the cashmere blazer is soft and elegant. Will shop again.",
    name: "Emma Thompson",
    designation: "Style Influencer",
    src: customer3,
  },
  {
    rating: 5,
    quote: "Wonderful customer service and amazing product quality. I keep coming back!",
    name: "Michael Anderson",
    designation: "Entrepreneur",
    src: customer4,
  },
  {
    rating: 5,
    quote: "Highly recommend this brand. The fit and fabric are top-notch.",
    name: "Emily Davis",
    designation: "Fashion Blogger",
    src: customer5,
  },
  {
    rating: 5,
    quote: "Efficient delivery and beautiful packaging. Very satisfied with my purchase.",
    name: "David Lee",
    designation: "Marketing Specialist",
    src: customer6,
  },
  {
    rating: 5,
    quote: "The design and craftsmanship are exceptional. Fabulous product!",
    name: "Sophia Brown",
    designation: "Designer",
    src: customer7,
  },
  {
    rating: 5,
    quote: "Love the attention to detail and customer-centric approach.",
    name: "James Carter",
    designation: "Photographer",
    src: customer8,
  },
  {
    rating: 5,
    quote: "Friendly service and timely delivery with quality beyond expectations.",
    name: "Olivia Martinez",
    designation: "Consultant",
    src: customer9,
  },
  {
    rating: 5,
    quote: "Every purchase has been a pleasure. Outstanding products and support.",
    name: "William Taylor",
    designation: "Artist",
    src: customer10,
  },
];

export default function CustomerTestimonials() {
  // Duplicate testimonials for seamless scroll
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="py-16 px-4 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
      <p className="text-center text-xl text-gray-600 mb-10">
        Real experiences from our valued customers
      </p>

      <AnimatedTestimonials testimonials={extendedTestimonials} />
    </div>
  );
}
