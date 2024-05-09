// export default ProtectedRoute
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'))
  // const { isAuthenticated, userdata } = useSelector((state) => state.userdata)
  if (user) {
    return children
  }
  return <Navigate to="/signin" />
}

export default ProtectedRoute
