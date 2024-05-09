import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { getUserById } from '../Redux/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { useRadioGroup } from '@mui/material'

const UpdateUserStatus = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [loading, setLoading] = useState(false)
  const role = [{ name: 'user' }, { name: 'admin' }]
  console.log(role)

  // const [user, setUser] = useState({
  //   username: '',
  //   email: '',
  //   isAdmin: '',
  // })

  // const onchangeHandler = (e) => {
  //   e.preventDefault()
  //   let name = e.target.name
  //   let value = e.target.value
  //   setUser({ ...user, [name]: value })
  // }

  const axiosConfig = {
    withCredentials: true,
  }
  const getUserDetails = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users/${id}`,
      axiosConfig,
    )
    setIsAdmin(data.user.isAdmin)
    setUsername(data.user.username)
    setEmail(data.user.email)
    console.log(data)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(isAdmin)
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users-status/${id}`,

      {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(isAdmin),
      },
    )

    const data = await response.json()
    // console.log(data)
    // const res = await response.json()
    console.log('updated data', data)
    if (data.success) {
      toast.success(data.message)
      // navigate('/dashboard-users')
      // setUser(res.user)
    }
  }

  useEffect(() => {
    getUserDetails()
    // dispatch(getUserById( id))
  }, [])
  return (
    <section className="py-24">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white w-screen font-sans text-gray-900">
          <div className=" ">
            <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
              <div className="mx-2 text-center md:mx-auto md:w-2/3 md:py-5">
                <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
                  Update Role
                </h1>
              </div>
            </div>
          </div>
          <div className="lg:w-[700px] md:w-[500px] mx-auto pb-16 sm:max-w-screen-sm md:max-w-screen-md  lg:max-w-screen-lg xl:max-w-screen-xl">
            <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">
              <div className="mb-4">
                <Box autoComplete="off">
                  <div className="relative z-0 w-full mb-5 group">
                    <TextField
                      label="Username"
                      variant="outlined"
                      type="text"
                      name="username"
                      className="w-[100%]"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <TextField
                      label="Email"
                      variant="outlined"
                      type="email"
                      name="email"
                      className="w-[100%]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Role  */}
                  <div className="mb-5">
                    <FormControl className="w-[100%]">
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>

                      <Select
                        label="Role"
                        type="text"
                        name="isAdmin"
                        value={isAdmin}
                        className="w-[100%]"
                        onChange={(e) => setIsAdmin(e.target.value)}
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Box>
              </div>

              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="mb-3 lg:mb-0">
                  <button
                    onClick={submitHandler}
                    className=" w-[100%] cursor-pointer rounded bg-[black] py-2 px-8 text-center text-lg font-bold  text-white hover:bg-red-800"
                    type="submit"
                  >
                    Change Status
                  </button>
                </div>

                <div>
                  <NavLink
                    to="/dashboard-users"
                    className="w-[100%] cursor-pointer rounded bg-red-800 py-2 px-8 text-center text-lg font-bold  text-white hover:bg-black"
                    type="submit"
                  >
                    Go back
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default UpdateUserStatus
