import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user?.isAdmin === 'admin') {
    return children
  }
  return <Navigate to="/unauthorized" />
}
export default AdminProtectedRoute
