// // // ****************** productSlice page *********************************

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

let axiosConfig = {
  withCredentials: true,
}

export const RegisterUser = createAsyncThunk('user/register', async (user) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/register`,
      user,
      axiosConfig,
    )
    if (data?.success) {
      toast.success(data?.response?.message)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', JSON.stringify(data.token))
      document.location.href = '/'
    }
    return data.user
  } catch (error) {
    console.error(error.response.data)
    toast.error(error.response.data.message)
  }
})
export const CurrentUser = createAsyncThunk('user/current-user', async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/users/me`,
      axiosConfig,
    )

    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
})

export const getAllUsers = createAsyncThunk('getusers/users', async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users`,
      axiosConfig,
    )
    console.log(data.users)

    return data.users
  } catch (error) {
    console.error(error.response.data.message)
  }
})

export const getUserById = createAsyncThunk('getuserbyid/users', async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users/${id}`,
      axiosConfig,
    )
    console.log(data)

    return data
  } catch (error) {
    console.error(error.response.data.message)
  }
})

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    userdata: {},
    isAuthenticated: false,
  },
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload
    },
    registerUser: (state, action) => {
      state.userdata = action.payload
      state.isAuthenticated = true
    },
    currentUser: (state, action) => {
      state.userdata = action.payload
      state.isAuthenticated = true
    },
    logoutUser: (state) => {
      state.isAuthenticated = false
      state.userdata = null
    },
  },
})

export const {
  registerUser,
  logoutUser,
  currentUser,
  allUsers,
} = UserSlice.actions
export default UserSlice.reducer
