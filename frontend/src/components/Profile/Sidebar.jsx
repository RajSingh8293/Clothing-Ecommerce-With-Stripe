import React from 'react'
import { NavLink } from 'react-router-dom'

const profileData = [
  {
    name: 'Profile',
    link: '/user/profile',
  },
  {
    name: 'Orders',
    link: '/user/all-orders',
  },
  {
    name: 'Adress',
    link: '/user/address',
  },
]
const Sidebar = () => {
  const logoutHandler = () => {
    localStorage.clear()
    toast.success('Logged Out Successfully ')
    navigate('/')
  }

  return (
    <div className="hidden lg:items-start lg:justify-around md:items-center lg:w-[20%] md:w-[100%] bg-[#424242] rounded px-8 lg:flex lg:flex-col  md:flex md:justify-around  sm:hidden lg:gap-8 lg:pt-5 p-4 mb-5 text-white">
      {profileData.map((data, index) => (
        <div className="" key={index}>
          <NavLink  key={index} to={data.link} className="">
            {data.name}
          </NavLink>
        </div>
      ))}

      <div className="">
        <button className="border-2 py-2 px-4" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
