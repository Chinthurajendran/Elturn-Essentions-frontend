import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminHome from "../pages/admin/AdminHome"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AllProducts from "../pages/admin/AllProducts"
import AddProduct from "../pages/admin/AddProduct"
import EditProduct from "../pages/admin/EditProduct"
import AllOrders from "../pages/admin/AllOrders"
import Orderdetails from "../pages/admin/Orderdetails"
import AllCustomer from "../pages/admin/AllCustomer"
import CustomerDetails from "../pages/admin/CustomerDetails"
import AllCategories from "../pages/admin/AllCategories"
import AllPayments from "../pages/admin/AllPayments"
import PaymentDetails from "../pages/admin/PaymentDetails"
import AllCoupons from "../pages/admin/AllCoupons"
import AddCouponPage from "../pages/admin/AddCouponPage"
import EditCouponPage from "../pages/admin/EditCouponPage"
import AllOffers from "../pages/admin/AllOffers"
import AddOfferPage from "../pages/admin/AddOfferPage"
import EditOfferPage from "../pages/admin/EditOfferPage"
import AllBanners from "../pages/admin/AllBanners"
import AddBannerPage from "../pages/admin/AddBannerPage"
import EditBannerPage from "../pages/admin/EditBannerPage"
import AllReviews from "../pages/admin/AllReviews"
import AllRoles from "../pages/admin/AllRoles"
import AddRolePage from "../pages/admin/AddRolePage"
import EditRolePage from "../pages/admin/EditRolePage"
import AllAdminUsers from "../pages/admin/AllAdminUsers"
import AddAdminUser from "../pages/admin/AddAdminUser"
import EditAdminUser from "../pages/admin/EditAdminUser"

function AdminRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/AdminHome" element={<AdminHome />}>
            <Route path="AdminDashboard" element={<AdminDashboard />} />
            <Route path="AllProducts" element={<AllProducts />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="EditProduct" element={<EditProduct />} />
            <Route path="AllOrders" element={<AllOrders />} />
            <Route path="Orderdetails" element={<Orderdetails />} />
            <Route path="AllCustomer" element={<AllCustomer />} />
            <Route path="CustomerDetails" element={<CustomerDetails />} />
            <Route path="AllCategories" element={<AllCategories />} />
            <Route path="AllPayments" element={<AllPayments />} />
            <Route path="PaymentDetails" element={<PaymentDetails />} />
            <Route path="AllCoupons" element={<AllCoupons />} />
            <Route path="AddCouponPage" element={<AddCouponPage />} />
            <Route path="EditCouponPage" element={<EditCouponPage />} />
            <Route path="AllOffers" element={<AllOffers />} />
            <Route path="AddOfferPage" element={<AddOfferPage />} />
            <Route path="EditOfferPage" element={<EditOfferPage />} />
            <Route path="AllBanners" element={<AllBanners />} />
            <Route path="AddBannerPage" element={<AddBannerPage />} />
            <Route path="EditBannerPage" element={<EditBannerPage />} />
            <Route path="AllReviews" element={<AllReviews />} />
            <Route path="AllRoles" element={<AllRoles />} />
            <Route path="AddRolePage" element={<AddRolePage />} />
            <Route path="EditRolePage" element={<EditRolePage />} />
            <Route path="AllAdminUsers" element={<AllAdminUsers />} />
            <Route path="AddAdminUser" element={<AddAdminUser />} />
            <Route path="EditAdminUser" element={<EditAdminUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AdminRoutes
