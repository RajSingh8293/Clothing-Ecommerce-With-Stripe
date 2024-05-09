import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './Pages/Home'
import Shop from './Pages/Shop'

import Payment from './Pages/Payment'
import Cart from './Pages/Cart'
import ForgotPassword from './Pages/ForgotPassword'
import ProductDetails from './Pages/ProductDetails'
import Profile from './Pages/Profile'
import Checkout from './Pages/Checkout'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Admin/Dashboard'
import Users from './Admin/Users'
import Orders from './Admin/Orders'
import ProductById from './Admin/AdminProductDetails'
import ProductsList from './Admin/ProductsList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OrdersDetails from './Pages/OrdersDetails'
import Fqa from './Pages/Fqa'
import ConfirmOrder from './Pages/ConfirmOrder'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import ProtectedRoute from './ProtectedRoutes/UserProRoute'
import SuccessPayment from './Pages/SuccessPayment'
import AddProduct from './Admin/AddProduct'
import UserAllOrders from './Pages/UserAllOrders'
import AdminOrderDetails from './Admin/AdminOrderDetails'
import UpdateUserStatus from './Admin/UpdateUserStatus'
import UpdateProduct from './Admin/UpdateProduct'
import AdminProtectedRoute from './ProtectedRoutes/AdminProtectedRoute'
import AdminProductDetails from './Admin/AdminProductDetails'
import NoPage from './Pages/NoPage'

import { useDispatch, useSelector } from 'react-redux'
import UpdateUserDetails from './Pages/UpdateUserDetails'
import { CurrentUser } from './Redux/Slices/UserSlice'
import Unauthorized from './Pages/Unauthorized'
import ContactPage from './Pages/ContactPage'

function App() {
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('token'))
  const { isAuthenticated, userdata } = useSelector((state) => state.userdata)
  useEffect(() => {
    dispatch(CurrentUser())
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer autoClose="2000" position="top-center" />
        <Routes>
          {/* shop  */}
          <Route
            path="/payment"
            element={
              <Elements
                stripe={loadStripe(
                  `${import.meta.env.VITE_REACT_APP_SECRET_STRIPE_KEY}`,
                )}
              >
                <Payment />
              </Elements>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* auth  */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/fqa" element={<Fqa />} />
          <Route path="*" element={<NoPage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/user/order-details/:id"
            element={
              <ProtectedRoute>
                <OrdersDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/update-details/:id"
            element={
              <ProtectedRoute>
                <UpdateUserDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/all-orders"
            element={
              <ProtectedRoute>
                <UserAllOrders />
              </ProtectedRoute>
            }
          />

          {/* Payment  */}
          {/* {stripeKey && ( */}

          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/dashboard-users"
            element={
              <AdminProtectedRoute>
                <Users />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/dashboard-orders"
            element={
              <AdminProtectedRoute>
                <Orders />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/dashboard-products"
            element={
              <AdminProtectedRoute>
                <ProductsList />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/dashboard/add-product"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/dashboard/update-product/:id"
            element={
              <AdminProtectedRoute>
                <UpdateProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/dashboard/order-details/:id"
            element={
              <AdminProtectedRoute>
                <AdminOrderDetails />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/product-details/:id"
            element={
              <AdminProtectedRoute>
                <AdminProductDetails />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/update-user-status/:id"
            element={
              <AdminProtectedRoute>
                <UpdateUserStatus />
              </AdminProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
