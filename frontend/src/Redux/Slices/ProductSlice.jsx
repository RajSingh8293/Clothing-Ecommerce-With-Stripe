// // // ****************** productSlice page *********************************

import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
})

const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    createProduct: {},
    data: [],
    products: [],
    singledata: {},
    status: STATUS.IDLE,
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload
    },
    singleProduct: (state, action) => {
      state.singledata = action.payload
    },
    setAdminProducts: (state, action) => {
      state.products = action.payload
    },
    setCreateProduct: (state, action) => {
      state.createProduct = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const {
  setProducts,
  singleProduct,
  setAdminProducts,
  setCreateProduct,
  setStatus,
} = ProductSlice.actions
export default ProductSlice.reducer

let axiosConfig = {
  withCredentials: true,
}

// create product
export const fetchCreateProduct = (formData) => {
  return async function fetchCreateProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/product`,
        {
          method: 'POST',
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      const data = await response.json()
      if (data.success) {
        dispatch(setCreateProduct(data.product))
        dispatch(setStatus(STATUS.IDLE))
        document.location.href = '/dashboard-products'
      }
      console.log(data)
    } catch (error) {
      console.log(error)
      dispatch(setStatus(STATUS.ERROR))
    }
  }
}

// fetch all products
export const fetchProducts = () => {
  return async function fetchProductsThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products`,
      )
      const data = await response.json()
      dispatch(setProducts(data.products))
      dispatch(setStatus(STATUS.IDLE))

      console.log(response.data)
    } catch (error) {
      console.log(error)
      dispatch(setStatus(STATUS.ERROR))
    }
  }
}

// fetch single product
export const SingleProduct = (id) => {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products/${id}`,
      )
      const data = await response.json()
      // console.log(response.data.product)
      dispatch(singleProduct(data.product))
      dispatch(setStatus(STATUS.IDLE))

      //   console.log(response.data.products)
    } catch (error) {
      console.log(error)
      dispatch(setStatus(STATUS.ERROR))
    }
  }
}

// fetch admin products
export const fetchAdminProducts = () => {
  return async function fetchAdminProductsThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/products`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      dispatch(setAdminProducts(data.products))
      dispatch(setStatus(STATUS.IDLE))

      console.log(data)
    } catch (error) {
      console.log(error.message)
      dispatch(setStatus(STATUS.ERROR))
    }
  }
}
