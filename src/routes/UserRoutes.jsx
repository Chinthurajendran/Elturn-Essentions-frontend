import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/user/Home"

function UserRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default UserRouter
