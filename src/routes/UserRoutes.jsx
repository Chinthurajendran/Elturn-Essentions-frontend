import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/user/Home"
import ProductDetail from "../pages/user/ProductDetail"
import { ProductPage } from "../pages/user/ProductPage"

function UserRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ProductDetail" element={<ProductDetail />} />
          <Route path="ProductPage" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default UserRouter
