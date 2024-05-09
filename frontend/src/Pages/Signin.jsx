import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader'

const Signin = () => {
  const navigate = useNavigate()

  // const [loading, setLaoding] = useState(false)
  const { userdata, error } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))
  const dispatch = useDispatch()
  // console.log(error)

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const onchangeHandler = (e) => {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    setUser({ ...user, [name]: value })
  }
  let axiosConfig = {
    withCredentials: true,
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(user)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/login`,
        user,
        axiosConfig,
      )
      console.log(response.data)
      if (response?.data?.success) {
        toast.success(response?.data?.message)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', JSON.stringify(response.data.token))
        navigate('/')
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   dispatch(LoginUser(user))
  // }

  return (
    <section className=" pt-[100px] flex justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className=" bg-white w-[100%] font-sans text-gray-900">
          <div className=" ">
            <div className="mx-auto w-[100%] sm:max-w-screen md:max-w-[100%] lg:w-[100%] xl:max-w-screen-xl">
              <div className="mx-2 text-center md:mx-auto md:w-2/3 md:py-5">
                <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
                  Sign in
                </h1>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-[500px] lg:max-w-screen-lg xl:max-w-screen-xl">
            <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">
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
              <p className="text-end pb-3 text-sm text-blue-400">
                <NavLink to="/forgot-password">forgot password</NavLink>
              </p>

              <div className="flex items-center">
                <div className="flex-1"></div>
                <button
                  onClick={submitHandler}
                  className="cursor-pointer rounded bg-[#424242] py-2 px-8 text-center text-lg font-bold  text-white hover:bg-red-800"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div className="my-4">
                <div className="text-sm">
                  <p className="">
                    Don't have an account ?
                    <NavLink to="/signup">
                      <span className="ml-2 cursor-pointer text-blue-500 underline">
                        Sign-up
                      </span>
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Signin
