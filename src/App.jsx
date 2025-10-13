import React from "react"
import Indexs from "./routes/Indexs"
import { ParallaxProvider } from "react-scroll-parallax"

function App() {
  return (
    <div>
      <ParallaxProvider>
        <Indexs />
      </ParallaxProvider>
    </div>
  )
}

export default App
