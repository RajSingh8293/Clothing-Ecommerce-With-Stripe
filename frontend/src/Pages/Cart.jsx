import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined'
import {
  clearCartItems,
  decrementQuantity,
  incrementQuantity,
  removeToCart,
} from '../Redux/Slices/CartSlice'
import Loader from '../components/Loader/Loader'
import { STATUS } from '../Redux/Slices/ProductSlice'

// const priceData = cartItems.map((prices) => prices.price)
// const subtotal = priceData.reduce((acc, cur) => acc + cur)
// const shipping = 5
// const total = subtotal / 100 + shipping
// console.log('total', total)

// const totalPrice = cartItems.reduce((acc, cur) => acc + cur.price, 0)
// console.log('totalPrice', totalPrice / 100)

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))

  const { cartItems, status } = useSelector((state) => state.cartItems)

  console.log(cartItems)

  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0,
  )

  const shipping = totalPrice > 100 ? 0 : 5

  const checkoutHandler = () => {
    if (user) {
      navigate('/checkout')
    } else {
      navigate('/signin')
    }
    // navigate('/signin?redirect=checkout')
  }

  if (status === STATUS.LOADING) {
    return <Loader />
  }
  return (
    <section>
      {cartItems && cartItems.length > 0 ? (
        <div className="min-h-[80vh] bg-gray-100 py-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartItems &&
                cartItems.map((data) => (
                  <div
                    key={data._id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={data.image}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {data.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {data.title}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <form className="">
                            <div className="relative flex items-center">
                              <button
                                onClick={() =>
                                  dispatch(decrementQuantity(data._id))
                                }
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                              >
                                <RemoveCircleOutlineIcon />
                              </button>

                              <span className="px-3 flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[3.5rem] text-center">
                                {data.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(incrementQuantity(data._id))
                                }
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                              >
                                <ControlPointIcon />
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            Price : ${data.price * data.quantity}
                          </p>
                          <svg
                            onClick={() => dispatch(removeToCart(data))}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">$ {totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$ {shipping}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    $ {totalPrice + shipping}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-[#424242] py-1.5 font-medium text-blue-50 hover:bg-red-800"
                onClick={checkoutHandler}
              >
                Check Out
              </button>
              <button className="mt-6 w-full rounded-md bg-red-800 py-1.5 font-medium text-blue-50 hover:bg-[#424242]">
                <NavLink to="/">Continue To Shopping</NavLink>
              </button>
              <button
                className="mt-6 w-full rounded-md bg-red-800 py-1.5 font-medium text-blue-50 hover:bg-[#424242]"
                onClick={() => dispatch(clearCartItems())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" min-h-[80vh]  flex flex-col gap-5 justify-center items-center">
          <h1 className=" text-3xl font-semibold text-black">Empty Cart</h1>
          <p className="">
            <RemoveShoppingCartOutlinedIcon className="text-3xl" />
          </p>
          <NavLink to="/shop">
            <button className="w-[300px] text-white font-semibold bg-gray-600 border py-2">
              Back to Shop
            </button>
          </NavLink>
        </div>
      )}
    </section>
  )
}

export default Cart
