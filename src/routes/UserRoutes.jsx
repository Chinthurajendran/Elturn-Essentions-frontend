import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/user/Home"
import ProductDetail from "../pages/user/ProductDetail"
import { ProductPage } from "../pages/user/ProductPage"
import CheckoutPage from "../pages/user/CheckoutPage"
import AccountPage from "../pages/user/AccountPage"

function UserRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ProductDetail" element={<ProductDetail />} />
          <Route path="ProductPage" element={<ProductPage />} />
          <Route path="CheckoutPage" element={<CheckoutPage />} />
          <Route path="AccountPage" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default UserRouter
