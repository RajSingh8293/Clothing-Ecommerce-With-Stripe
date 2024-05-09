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
  reducers: {
    // setCreateOrder: (state, action) => {
    //   state.createOrder = action.payload
    // },
    // userOrders: (state, action) => {
    //   state.myorders = action.payload
    // },
    // orderDetails: (state, action) => {
    //   state.singleOrder = action.payload
    // },
    // getAllUsersOrders: (state, action) => {
    //   state.allUsersOrders = action.payload
    // },
    // setStatus: (state, action) => {
    //   state.status = action.payload
    // },
  },
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

// export const {
//   setCreateOrder,
//   userOrders,
//   orderDetails,
//   getAllUsersOrders,
//   setStatus,
// } = OrderSlice.actions
export default OrderSlice.reducer

// Thunk

// create order
// const token = JSON.parse(localStorage.getItem('token'))
// export const createOrder = (token, data) => {
//   return async function fetchCreateOrdersThunk(dispatch, getState) {
//     dispatch(setStatus(STATUS.LOADING))
//     try {
//       const response = await fetch('http://localhost:3434/api/v1/order/new', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//         // body: data,
//         body: JSON.stringify(data),
//       })
//       const res = await response.json()
//       dispatch(setCreateOrder(res))
//       dispatch(setStatus(STATUS.IDLE))
//       console.log(res)
//       console.log(data)
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUS.ERROR))
//     }
//   }
// }
// export const fetchAllOrders = (token) => {
//   return async function fetchOrdersThunk(dispatch, getState) {
//     dispatch(setStatus(STATUS.LOADING))
//     try {
//       const response = await fetch('http://localhost:3434/api/v1/orders/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const res = await response.json()
//       dispatch(userOrders(res.orders))
//       dispatch(setStatus(STATUS.IDLE))
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUS.ERROR))
//     }
//   }
// }

// export const fetchSingleOrder = (token, id) => {
//   return async function fetchOneOrderThunk(dispatch, getState) {
//     dispatch(setStatus(STATUS.LOADING))
//     try {
// const response = await fetch(
//   `http://localhost:3434/api/v1/orders/${id}`,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   },
// )

// const res = await response.json()
//       // console.log(response.data.product)
//       dispatch(orderDetails(res.order))

//       dispatch(setStatus(STATUS.IDLE))
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUS.ERROR))
//     }
//   }
// }
// get all orders
// export const fetchAllUsersOrders = (token) => {
//   return async function fetchAllUsersOrdersThunk(dispatch, getState) {
//     dispatch(setStatus(STATUS.LOADING))
//     try {
// const response = await fetch(
//   'http://localhost:3434/api/v1/admin/orders',
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   },
// )
// const res = await response.json()
//       dispatch(getAllUsersOrders(res.orders))
//       dispatch(setStatus(STATUS.IDLE))
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUS.ERROR))
//     }
//   }
// }

// update orders status
// export const fetchUpdateOrderStatus = (token, id, data) => {
//   return async function fetchUpdateOrderStatusThunk(dispatch, getState) {
//     dispatch(setStatus(STATUS.LOADING))
//     try {
//       const response = await fetch(
//         `http://localhost:3434/api/v1/admin/order-status/${id}`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(data),
//         },
//       )
//       const res = await response.json()
//       // dispatch(getUpdateOrderStatus(res.order))

//       dispatch(setStatus(STATUS.IDLE))
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUS.ERROR))
//     }
//   }
// }

// export const fetchDeleteOrder = (token, id) => {
//   return async function fetchDeleteOrderThunk(dispatch, getState) {
//     dispatch(setStatus(STATUS.LOADING))
//     try {
//       const response = await fetch(
//         `http://localhost:3434/api/v1/admin/order/${id}`,
//         {
//           method: 'Delete',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )
//       const res = await response.json()
//       console.log(res)
//       // dispatch(getUpdateOrderStatus(res.orders))
//       dispatch(setStatus(STATUS.IDLE))
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUS.ERROR))
//     }
//   }
// }
