import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Slices/CartSlice'
import ProductSlice from './Slices/ProductSlice'
import UserSlice from './Slices/UserSlice'
import orderSlice from './Slices/orderSlice'

const store = configureStore({
  reducer: {
    cartItems: CartSlice,
    products: ProductSlice,
    userdata: UserSlice,
    orders: orderSlice,
  },
})

export default store
