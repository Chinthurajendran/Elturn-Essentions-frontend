import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminHome from "../pages/admin/AdminHome"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AllProducts from "../pages/admin/AllProducts"
import AddProduct from "../pages/admin/AddProduct"
import EditProduct from "../pages/admin/EditProduct"


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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AdminRoutes
