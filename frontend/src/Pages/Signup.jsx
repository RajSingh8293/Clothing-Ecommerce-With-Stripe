import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegisterUser } from '../Redux/Slices/UserSlice'

const Signup = () => {
  const [loading, setLaoding] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  console.log(user)
  const onchangeHandler = (e) => {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    setUser({ ...user, [name]: value })
  }

  // let axiosConfig = {
  //   withCredentials: true,
  // }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!user.username || !user.email || !user.password) {
      setError(true)
      return false
    }
    dispatch(RegisterUser(user))

    //   const response = await axios.post(
    //     'http://localhost:3434/api/v1/register',
    //     user,
    //     axiosConfig,
    //   )
    //   console.log(response.data)
    //   if (response?.data?.success) {
    //     toast.success(response?.data?.message)
    //     localStorage.setItem('user', JSON.stringify(response.data.user))
    //     localStorage.setItem('token', JSON.stringify(response.data.token))
    //     navigate('/')
    //   } else {
    //     toast.error(response?.data?.message)
    //   }
  }

  return (
    <section>
      <div className="bg-white pt-[100px] w-screen font-sans text-gray-900">
        <div className=" ">
          <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="mx-2 text-center md:mx-auto md:w-2/3 md:py-5">
              <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
                Sign up
              </h1>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
          <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold" htmlFor="email">
                Username
              </label>
              <input
                className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-[#424242] focus:ring"
                id="username"
                name="username"
                value={user.username}
                onChange={onchangeHandler}
                type="username"
                placeholder="johncena"
                required=""
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold" htmlFor="email">
                E-mail
              </label>
              <input
                className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-[#424242] focus:ring"
                id="email"
                name="email"
                value={user.email}
                onChange={onchangeHandler}
                type="email"
                placeholder="email"
                required=""
              />
              <span className="my-2 block"></span>
            </div>

            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-[#424242] focus:ring"
                id="password"
                name="password"
                value={user.password}
                onChange={onchangeHandler}
                type="password"
                placeholder="******************"
                required=""
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 flex text-sm">
                <input
                  type="checkbox"
                  name="accept"
                  className="mr-2"
                  required=""
                />
                <div className="text-gray-800">
                  <p className="">
                    I accept the
                    <a
                      href="#"
                      className="cursor-pointer text-blue-500 underline"
                    >
                      terms of use
                    </a>
                    and
                    <a
                      href="#"
                      className="cursor-pointer text-blue-500 underline"
                    >
                      privacy policy
                    </a>
                  </p>
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <div className="flex-1"></div>
              <button
                className="cursor-pointer rounded bg-[#424242] py-2 px-8 text-center text-lg font-bold  text-white hover:bg-red-800"
                type="submit"
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </div>
            <div className="my-4">
              <div className="text-sm">
                <p className="">
                  Already have an account ?
                  <NavLink to="/signin">
                    <span className="ml-2 cursor-pointer text-blue-500 underline">
                      Sign-in
                    </span>
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Signup
