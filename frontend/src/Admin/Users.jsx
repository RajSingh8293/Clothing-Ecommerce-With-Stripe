import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, json } from 'react-router-dom'
// import { getAllUsers } from '../Redux/Slices/UserSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'

const Users = () => {
  const dispatch = useDispatch()
  // const { allUsers: users, loading } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  console.log('users', users)

  const axiosConfig = {
    withCredentials: true,
  }

  const getAllUsers = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users`,
      axiosConfig,
    )
    console.log('data', data.users)
    setUsers(data?.users)
  }

  const deleteUserHandler = async (id) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users/${id}`,
      axiosConfig,
    )
    // const res = await response.json()
    console.log(data)
    if (data.success) {
      toast.success(data.message)
      getAllUsers()
    }
  }
  const updateUserStatus = async (e, userId) => {
    console.log(e, userId)
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users-status`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: e.target.value, userId }),
      },
    )
    const data = await response.json()
    if (data.success) {
      toast.success(data.message)
      getAllUsers()
    }
  }

  useEffect(() => {
    // dispatch(getAllUsers())
    getAllUsers()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="flex py-16 w-[100%]">
          <div className="lg:w-[20%] ">
            <Sidebar />
          </div>
          <div className="lg:w-[80%] w-[100%] px-8  py-12 lg:py-12 overflow-x-auto ">
            <h1 className="pl-5 text-3xl text-gray-600 py-5 font-semibold">
              Total Users ({users && users.length})
            </h1>
            <table className="w-[100%] py-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              {users && (
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>

                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <select
                          onChange={(e) => updateUserStatus(e, user?._id)}
                          value={user?.isAdmin}
                        >
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 ">
                        <button
                          className=" py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline"
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          <DeleteForeverIcon className="text-red-800" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </section>
      )}
    </>
  )
}

export default Users
