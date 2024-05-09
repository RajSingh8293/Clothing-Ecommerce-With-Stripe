import React from 'react'
import { NavLink } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <section className="min-h-[100vh] w-[100%] flex justify-center items-center">
      <div className="py-24 px-8 max-w-[500px] bg-[#000] flex justify-center flex-col items-center">
        <h1 className="p-5  text-white shadow-amber-50">
          Sorry! You can't access this page
        </h1>
        <p className="p-2 w-[100%] flex justify-center items-center hover:bg-blue-gray-100 text-white hover:text-black bg-[red]">
          <NavLink to="/">Go Back</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Unauthorized
