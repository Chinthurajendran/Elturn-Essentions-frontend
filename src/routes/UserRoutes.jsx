import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/user/Home"
import ProductDetail from "../pages/user/ProductDetail"

function UserRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ProductDetail" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default UserRouter
