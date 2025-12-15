import React from 'react'

function FullScreenVideo() {
      const videoUrl = "https://res.cloudinary.com/da3wfqamr/video/upload/v1765191259/brand_intro_video_mcbhns.mp4"
  return (
      <div className="w-screen h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] 2xl:h-[800px] overflow-hidden relative">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        className='w-full h-full object-cover'>
      </video>
    </div>
  )
}

export default FullScreenVideo
