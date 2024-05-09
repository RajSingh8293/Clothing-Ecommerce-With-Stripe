import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import { toast } from 'react-toastify'
import { getUserById } from '../Redux/Slices/UserSlice'
import { STATUS } from '../Redux/Slices/ProductSlice'

const UpdateUserDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userdata, status } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))
  const [userData, setUserData] = useState('')
  console.log(userdata)

  const [user, setUser] = useState({
    username: '',
    email: '',
  })

  const onchangeHandler = (e) => {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    setUser({ ...user, [name]: value })
  }
  const getUserById = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/users/${id}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      // },
    )

    if (response?.data) {
      setUser(response.data.user)
    }
    // console.log(response?.data)
  }

  const UpdateUser = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/users/update`,
        user,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // },
      )
      if (response) {
        toast.success(response?.data?.message)
        localStorage.setItem('token', JSON.stringify(response.data.token))
        navigate('/user/profile')
      }
    } catch (error) {
      console.log(response.data)
      toast.error(error?.response?.message)
    }
  }

  useEffect(() => {
    getUserById()
  }, [])

  if (status === STATUS.LOADING) {
    return <Loader />
  }

  return (
    <section className="flex py-24 px-8 justify-center flex-col items-center min-h-[100vh]">
      <h1 className="py-5  font-semibold text-3xl underline">
        <span className="">{'Raj'} </span>you can update your details now
      </h1>
      <div className="flex flex-col  px-8  w-[100vw] lg:min-w-[500px] sm:w-[100%] lg:w-[50%] md:w-[100%]">
        <div className="title mt-4 flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="font-semibold   text-black">Name </p>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="username"
                id="username"
                value={user?.username}
                onChange={onchangeHandler}
                className="block py-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="flex  flex-col gap-2">
            <p className="font-semibold  text-black">Email </p>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                // defaultValue={user?.email}
                value={user?.email}
                onChange={onchangeHandler}
                className="block py-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
        </div>
        <button
          className="bg-red-800 mt-5 px-3 py-1 rounded text-white"
          onClick={UpdateUser}
        >
          Update Account
        </button>

        <NavLink
          className=" flex justify-center bg-red-800 mt-5 px-3 py-1 rounded text-white"
          to="/user/profile"
        >
          Go back
        </NavLink>
      </div>
    </section>
  )
}

export default UpdateUserDetails
