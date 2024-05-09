import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import Avatar from '@mui/material/Avatar'
import FavoriteIcon from '@mui/icons-material/Favorite'

import './HeaderStyle.css'
import { deepOrange, deepPurple } from '@mui/material/colors'
// import { RxCross2 } from 'react-icons/rx'
import CloseIcon from '@mui/icons-material/Close'
// import { CgMenuRightAlt } from 'react-icons/cg'
import MenuIcon from '@mui/icons-material/Menu'
import { logoutUser } from '../../Redux/Slices/UserSlice'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Shop', href: '/shop', current: false },
  { name: 'Contact', href: '/contact', current: false },
  { name: 'FQA', href: '/fqa', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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

export default function Header() {
  const [showmenu, setShowmenu] = useState(false)
  const [active, setActive] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const totalItems = useSelector((state) => state.cartItems.cartItems)
  const getTotalQuantity = () => {
    let total = 0
    totalItems.forEach((item) => {
      total += item.quantity
    })
    return total
  }

  const totalQty = getTotalQuantity()

  const logoutHandle = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/logout`,
      {
        credentials: 'include',
      },
    )
    const data = await response.json()
    if (data.success) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.success('Logged Out Successfully ')
      navigate('/')
    }
  }
  const showBtn = () => {
    setShowmenu((prev) => !prev)
  }

  return (
    <>
      <section className="bg-gray-800 top-0 right-0 lg:py-0 py-2 z-30 fixed w-[100%] px-5 lg:px-8 md:px-8 ">
        <div className="relative flex items-center   justify-between w-[100%]">
          {/* logo  */}
          <div className="logo px-3 roundend-full  font-semibold  bg-blue-400  items-center">
            <NavLink to="/">
              <span className="text-white text-2xl">E-</span>
              <span className="text-white">Shop</span>
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            {/* menu  */}
            {user && (
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setActive(!active)}
                  className="relative lg:hidden"
                >
                  {user ? (
                    <Avatar
                      sx={{ bgcolor: deepPurple[500] }}
                      className="h-6 w-6 rounded-full capitalize"
                    >
                      {user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : null}
                </div>
                {active && (
                  <div className="top-14 bg-gray-300 p-4 absolute right-2 flex gap-3 flex-col">
                    {profileData.map((data, index) => (
                      <div key={index} onClick={() => setActive(!active)}>
                        <NavLink to={data.link} className="">
                          {data.name}
                        </NavLink>
                      </div>
                    ))}
                    {user ? (
                      <div onClick={() => setActive(!active)}>
                        <button onClick={logoutHandle}>Logout</button>
                      </div>
                    ) : (
                      <div onClick={() => setActive(!active)}>
                        <NavLink to="/signin">Signin</NavLink>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="lg:hidden">
              <MenuIcon onClick={showBtn} className="text-2xl text-white" />
            </div>
          </div>

          {/* nav links  */}
          <div className="hidden md:hidden sm:hidden lg:block">
            <ul className="nav-links flex gap-10">
              {navigation.map((data) => (
                <li className="links text-white " key={data.name}>
                  <NavLink to={data.href}>{data.name}</NavLink>
                </li>
              ))}

              {user && user.isAdmin === 'admin' ? (
                <li className="links text-white ">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              ) : (
                ''
              )}
            </ul>
          </div>

          {/* shopping cart  */}
          <div className=" relative lg:flex items-center gap-8 hidden">
            <div>
              <NavLink
                to="/whish-list"
                className=" relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <FavoriteIcon className="  h-6 w-6 text-gray-500" />

                {totalItems.length > 0 && (
                  <span className="-top-2 -right-3 w-3 h-3 flex justify-center items-center text-sm absolute   bg-red-700 p-3  rounded-full  overflow-hidden ">
                    {totalItems.length}
                  </span>
                )}
              </NavLink>
            </div>
            <div className="">
              <NavLink
                to="/cart"
                className=" relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <ShoppingCartIcon className=" h-6 w-6 text-gray-500" />

                {totalItems.length > 0 && (
                  <span className="w-3 h-3 flex justify-center items-center text-sm absolute  top-4 -right-8 bg-red-700 p-3  rounded-full  overflow-hidden ">
                    {totalItems.length}
                  </span>
                )}
              </NavLink>
            </div>
            <div className="text-white">
              {user ? (
                ''
              ) : (
                <div className="login  hidden lg:flex  flex-wrap md:hidden sm:hidden">
                  <NavLink
                    to="/signin"
                    className="btn py-1  text-white rounded hover:bg-slate-500"
                  >
                    Sign In
                  </NavLink>
                </div>
              )}
            </div>

            {/* profile  */}
            <div className="">
              <div onClick={() => setActive(!active)} className="relative">
                {user ? (
                  <Avatar
                    sx={{ bgcolor: deepPurple[500] }}
                    className="h-6 w-6 rounded-full capitalize"
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                ) : null}
              </div>
              {active && (
                <div className="bg-gray-300 p-4 absolute right-2 flex gap-3 flex-col">
                  {profileData.map((data, index) => (
                    <div key={index} onClick={() => setActive(!active)}>
                      <NavLink to={data.link} className="">
                        {data.name}
                      </NavLink>
                    </div>
                  ))}

                  {user ? (
                    ''
                  ) : (
                    <div onClick={() => setActive(!active)}>
                      <NavLink to="/signin">Signin</NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* side menu  */}
          {showmenu && (
            <div className={`toggleNav z-20 ${showmenu && 'active'}`}>
              {/* <div className="toggleNav "> */}
              <ul
                className="nav-links navLinks flex flex-col gap-8 absoluet fixed  lg:p-8 md:p-8 p-5 bg-white h-[100vh] top-0 right-0 nav "
                // className="nav-links navLinks "
              >
                <li className="links" onClick={showBtn}>
                  <CloseIcon className="text-2xl" />
                </li>
                {navigation.map((data) => (
                  <li className="links " key={data.name} onClick={showBtn}>
                    <NavLink to={data.href}>{data.name}</NavLink>
                  </li>
                ))}

                {user && user.isAdmin === 'admin' ? (
                  <li className="links text-white ">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                ) : (
                  ''
                )}

                <div className="border-y-2 py-3 cursor-pointer">
                  {user ? (
                    <li className="links " onClick={logoutHandle}>
                      Logout
                    </li>
                  ) : (
                    <li className="links">
                      <NavLink to="/signin">Sign In</NavLink>
                    </li>
                  )}
                </div>
                <div className=" cursor-pointer">
                  <NavLink
                    to="/cart"
                    className=" relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <ShoppingCartIcon className=" h-6 w-6 text-black" />

                    {totalItems.length > 0 && (
                      <span className="w-3 h-3 flex justify-center items-center text-white text-sm absolute  top-4 -right-8 bg-red-700 p-3  rounded-full  overflow-hidden ">
                        {totalItems.length}
                      </span>
                    )}
                  </NavLink>
                </div>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
