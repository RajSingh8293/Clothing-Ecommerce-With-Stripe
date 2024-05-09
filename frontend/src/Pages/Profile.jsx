import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader/Loader'
import { CurrentUser } from '../Redux/Slices/UserSlice'
import { useStepContext } from '@mui/material'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { userdata: user, status } = useSelector((state) => state.userdata)
  const [user, setUser] = useState({})

  console.log(user)

  let axiosConfig = {
    withCredentials: true,
  }
  const getUserData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/users/me`,
      axiosConfig,
    )
    setUser(data.user)
    console.log('Profile : ', data?.user)
  }

  const getUserDelete = async () => {
    const response = await axios.delete(
      `h${import.meta.env.VITE_REACT_APP_API_BASE_UR}/users/delete`,
      axiosConfig,
    )
    if (response?.data?.success) {
      toast.success('User account deleted')
      localStorage.clear()
      navigate('/')
    }
  }

  useEffect(() => {
    dispatch(CurrentUser())
    getUserData()
  }, [dispatch])

  return (
    <>
      <section className=" relative w-[100%] lg:flex gap-2 lg:min-h-[100vh] md:gap-8 px-8 pt-20 pb-8 lg:py-24">
        <div className=" border w-[100%] lg:w-[100%] md:w-[100%] shadow-lg ">
          <div className="card  hover:shadow-none relative justify-center flex flex-col mx-auto ">
            <h1 className="text-center underline lg:mr-0 pt-5 text-3xl font-semibold">
              Profile
            </h1>
            <div className="profile lg:flex lg:justify-center lg:items-center w-[100%]   pt-0 p-10 ">
              <div className="flex flex-col justify-center lg:flex lg:flex-row lg:justify-between lg:items-center md:flex md:flex-row md:justify-between md:items-center  py-8 gap-5 w-[100%] lg:max-w-[80%] ">
                <div className="lg:w-[50%] md:w-[50%] w-[100%] flex justify-center">
                  <img
                    className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] md:w-[200px] md:h-[200px] sm:w-[200px] sm:h-[200px] p-1 bg-white rounded-full z-10"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
                    alt=""
                  />
                </div>
                <div className="lg:w-[50%] md:w-[50%] w-[100%]">
                  <div className="pt-10 flex flex-col gap-4">
                    <p className="flex gap-10">
                      <span>Name: </span>
                      <span>{user?.username}</span>{' '}
                    </p>
                    <p className="flex gap-10">
                      <span>Email: </span>
                      <span>{user?.email}</span>{' '}
                    </p>

                    <NavLink
                      to={`/user/update-details/${user?._id}`}
                      className="bg-black hover:bg-red-800 py-1 px-2 text-white  flex justify-center items-center"
                    >
                      Update{' '}
                    </NavLink>

                    <div
                      className="bg-red-800 px-2 hover:bg-black py-1 text-white  flex justify-center items-center"
                      onClick={getUserDelete}
                    >
                      <button>Delete Account </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
