import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/user/Home"
import ProductDetail from "../pages/user/ProductDetail"
import { ProductPage } from "../pages/user/ProductPage"
import CheckoutPage from "../pages/user/CheckoutPage"
import AccountPage from "../pages/user/AccountPage"
import LoginPage from "../pages/auth/LoginPage"
import SignUpPage from "../pages/auth/SignUpPage"
import OtpVerification from "../pages/auth/OtpVerification"
import RegisterPage from "../pages/auth/RegisterPage"
import ForgotPassword from "../pages/auth/ForgotPassword"
import NewPasswordPage from "../pages/auth/NewPasswordPage"

function UserRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="SignUpPage" element={<SignUpPage />} />
          <Route path="OtpVerification" element={<OtpVerification />} />
          <Route path="RegisterPage" element={<RegisterPage />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="NewPasswordPage" element={<NewPasswordPage />} />
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
