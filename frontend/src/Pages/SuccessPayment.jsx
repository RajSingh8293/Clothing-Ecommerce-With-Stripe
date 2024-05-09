import React from 'react'
import { NavLink } from 'react-router-dom'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

const SuccessPayment = () => {
  return (
    <section className="min-h-[100vh] flex justify-center flex-col items-center gap-5">
      <p>
        <TaskAltIcon sx={{ color: 'tomato', fontSize: '80px' }} />
      </p>
      <div>
        <h1 className="text-3xl"> Payment Successfull</h1>
      </div>
      <div className="bg-black text-white py-2 px-5 hover:bg-orange-900  hover:text-semibold hover:text-black">
        <NavLink to="/user/all-orders">VIEW ORDERS</NavLink>
      </div>
    </section>
  )
}

export default SuccessPayment
