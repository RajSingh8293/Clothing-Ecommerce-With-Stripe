// // // ****************** productSlice page *********************************

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// create order
let axiosConfig = {
  withCredentials: true,
}
export const createOrderThunk = createAsyncThunk(
  'creatorder/fetch',
  async (orderdata) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/v1/order/new`,
      orderdata,
      axiosConfig,
    )
    return data.order
  },
)
// my orders
export const fetchAllOrders = createAsyncThunk(
  'getmyorders/fetch',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/orders/me`,
      axiosConfig,
    )
    return data.orders
  },
)
// update order status
export const fetchUpdateOrderStatus = createAsyncThunk(
  'getupdateorders/fetch',
  async (id) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/order-status/${id}`,
      axiosConfig,
      data,
    )
    return data.order
  },
)
// sigle order
export const fetchSingleOrder = createAsyncThunk(
  'getsingleorder/fetch',
  async (id) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/orders/${id}`,
      axiosConfig,
    )

    return data.order
  },
)
// get all orders
export const fetchAllUsersOrders = createAsyncThunk(
  'getallusersorders/fetch',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/orders`,
      axiosConfig,
    )
    console.log(data)
    return data.orders
  },
)

export const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
})

const OrderSlice = createSlice({
  name: 'orders',
  initialState: {
    createOrder: {},
    myorders: [],
    allUsersOrders: [],
    singleOrder: {},
    status: STATUS.IDLE,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false
        state.createOrder = action.payload
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.myorders = action.payload
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false
        state.singleOrder = action.payload
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchAllUsersOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllUsersOrders.fulfilled, (state, action) => {
        state.loading = false
        state.allUsersOrders = action.payload
      })
      .addCase(fetchAllUsersOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchUpdateOrderStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        const index = state.allUsersOrders.findIndex(
          (order) => order.id == action.payload.id,
        )
        state.allUsersOrders[index] = action.payload
      })
      .addCase(fetchUpdateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default OrderSlice.reducer
