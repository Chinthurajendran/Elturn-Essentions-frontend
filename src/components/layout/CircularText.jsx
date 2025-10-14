import React from "react";

// ELTURN Ticker - React + Tailwind
// Single-file component. Drop into your React app and import where needed.
// Uses Tailwind classes for layout + an internal <style> block for the marquee keyframes.

export default function CircularText({
  text = "#ELTURN ESSENTIALS",
  speedSeconds = 18, // lower = faster
  size = "text-xl",
}) {
  // We build a repeating segment and duplicate it to create a seamless loop.
  const items = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className={`mx-8 font-plusjakarta ${size}`}>
      {text}
    </span>
  ));

  return (
    <div className="w-full overflow-hidden bg-red-600 text-white">
      <div className="relative">
        {/* The track will be twice as wide (two identical segments) and the animation
            will translate it left by 50% to create an infinite seamless loop. */}
        <div
          className="flex shrink-0"
          style={{
            // keep the animation timing adjustable via prop
            animation: `marquee ${speedSeconds}s linear infinite`,
          }}
        >
          {/* first segment */}
          <div className="flex font-plusjakarta items-center whitespace-nowrap">
            {items}
          </div>

          {/* duplicated segment for smooth, no-gap loop */}
          <div className="flex font-plusjakarta  items-center whitespace-nowrap">
            {items}
          </div>
        </div>
      </div>

      {/* Inline styles for keyframes and accessibility adjustments. */}
      <style>{`
        .flex[style] { /* target the track we injected animation on */
          will-change: transform;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* Reduce animation for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .flex[style] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
