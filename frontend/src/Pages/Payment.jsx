import React, { useEffect, useRef, useState } from 'react'
import {
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import { createOrderThunk } from '../Redux/Slices/orderSlice'

const Payment = () => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const dispatch = useDispatch()
  const elements = useElements()
  const payBtn = useRef(null)
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const { shippingInfo, cartItems } = useSelector((state) => state.cartItems)
  const { userdata: user } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))

  console.log('orderInfo', orderInfo)
  console.log('cartItems', cartItems)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  let order = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    totalPrice: orderInfo.totalPrice,
    shippingPrice: orderInfo.shippingCharge,
  }

  // let axiosConfig = {
  //   withCredentials: true,
  // }
  console.log(order)
  const submitHadler = async (e) => {
    e.preventDefault()
    payBtn.current.disabled = true
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/payment/process`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        },
      )

      const data = await res.json()
      console.log(data)
      if (data.success) {
        toast.success(data.message)
      }

      console.log(data)

      const client_secret = data.client_secret
      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.username,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipcode,
              country: shippingInfo.country,
            },
          },
        },
      })

      console.log(result)

      if (result.error) {
        payBtn.current.disabled = false
        toast.error(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrderThunk(order))
          toast.success('Payment successfully')
          navigate('/success')
        } else {
          toast.error('There is some issue while proccessing payment')
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      toast.error(error)
      // console.log(error)
    }
  }

  return (
    <>
      <div className="min-h-[80vh]  bg-gray-100 dark:bg-gray-900 lg:py-24 py-24 px-10 ">
        <div className="py-8">
          <CheckoutSteps activeStep={2} />
        </div>
        <form className="lg:w-[500px] payment_card w-full max-w-xl mx-auto p-8 border bg-gray-200 rounded">
          <h1 className="text-gray-800 text-3xl">Payment</h1>
          <div className="my-4 paymentDiv py-1">
            <CreditCardIcon />
            <CardNumberElement className="paymentInput " />
          </div>
          <div className="mb-4 paymentDiv py-1">
            <EventOutlinedIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div className="mb-4 paymentDiv py-1">
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[60%] bg-black text-white px-4 py-2 rounded-lg hover:bg-[#181818] dark:bg-black dark:text-white dark:hover:bg-black-900"
              // value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
              onClick={submitHadler}
              ref={payBtn}
            >
              Pay - ${orderInfo && orderInfo.totalPrice}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Payment
