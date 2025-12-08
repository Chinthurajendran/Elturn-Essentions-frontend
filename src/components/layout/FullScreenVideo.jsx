// src/pages/FullScreenVideo.jsx
import React, { useEffect, useRef } from "react"
import { Header } from "./Header"

export default function FullScreenVideo() {
  
  const videoRef = useRef(null)
  const videoUrl = "https://res.cloudinary.com/da3wfqamr/video/upload/v1765191259/brand_intro_video_mcbhns.mp4"


  useEffect(() => {
    const video = videoRef.current
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }

    video.play().catch((err) => console.log("Autoplay blocked:", err))
  }, [])

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  )
}
