import React, { useEffect, useState } from 'react'
import { fetchSingleOrder } from '../Redux/Slices/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const OrdersDetails = () => {
  const { id } = useParams()
  // const { singleOrder: order } = useSelector((state) => state.orders)
  // const { token } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))
  const dispatch = useDispatch()
  const [order, setOrder] = useState({})
  // console.log(order)
  // const ExpectedDeliveryDate = order.paidAt
  // order.shippingInfo.forEach((data) => {
  //   console.log(data)
  // })

  // const [orderDetails, setordersDetails] = useState({})

  const getSingleOrder = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/orders/${id}`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const res = await response.json()
      console.log(res)
      setOrder(res?.order)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // dispatch(fetchSingleOrder(token, id))
    getSingleOrder()
  }, [dispatch])
  return (
    <section className=" px-8 py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
          Payment Successful
        </h2>
        <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
          Thanks for shopping with us you can check your order summary below
        </p>
        <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col lg:flex-row  justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data">
              <p className="font-semibold text-2xl leading-7 text-black">
                Order Id :
                <span className="text-indigo-600 font-medium text-2xl cursor-pointer">
                  {' '}
                  #{id}
                </span>
              </p>
              <p className="font-semibold text-base leading-7 text-black mt-4">
                Order Payment :
                <span className="text-gray-700 font-medium">
                  {order?.paidAt}
                </span>
              </p>
            </div>
            <div className="lg:flex gap-3 lg:py-0 py-4 ">
              <h1 className="text-2xl lg:py-0 py-3">Order Status : </h1>
              <p
                className={
                  order?.paymentInfo?.orderStatus === `delivered`
                    ? `text-green-800 text-xl`
                    : `text-red-900 text-xl`
                }
              >
                {order && order?.orderStatus}
              </p>
            </div>
          </div>

          <div className="py-5 flex justify-between flex-wrap border-b border-gray-200 ">
            <div className="px-8">
              <h1 className="py-4 text-xl">Shipping Details </h1>
              {order?.shippingInfo &&
                order?.shippingInfo?.map((data, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex gap-5">
                      <h1>Name : </h1>
                      <p className="">
                        <span className="mr-2 capitalize">
                          {data.firstname}
                        </span>
                        <span className="capitalize">{data.lastname}</span>
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <h1>Phone : </h1>
                      <span>{data.phone}</span>
                    </div>
                    <div className="flex gap-5">
                      <h1>Country : </h1>
                      <span>{data.country}</span>
                    </div>
                    <div className="flex gap-5">
                      <h1>Address : </h1>
                      <span>{`${data.address}, ${data.state}, ${data.city}, ${data.zipcode}`}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="px-8">
              <h1 className="py-4 text-xl">Payment Details </h1>

              <div className="flex flex-col  gap-2">
                <div className="flex items-center gap-5">
                  <h1>Payment ID : </h1>
                  <p>
                    <span className="mr-2">{order?.paymentInfo?.id}</span>
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <h1>Payment Status : </h1>
                  <span
                    className={
                      order?.paymentInfo?.status === `succeeded`
                        ? `text-green-800 text-xl`
                        : `text-red-900 text-xl`
                    }
                  >
                    {order?.paymentInfo?.status === `succeeded`
                      ? `PAID`
                      : `FAILED`}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <h1>Amount : </h1>
                  <p>
                    <span
                      className={
                        order?.paymentInfo?.status === `succeeded`
                          ? `text-green-800 text-xl`
                          : `text-red-900 text-xl`
                      }
                    >
                      ${order?.totalPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-5">
            {order?.orderItems?.map((data) => (
              <div className="w-full px-3 min-[400px]:px-6" key={data._id}>
                <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                  <div className="img-box max-lg:w-full">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="aspect-square h-[100px] "
                    />
                  </div>

                  <div className="flex flex-row items-center w-full ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div className="flex items-center">
                        <div className="">
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                            {data.name}
                          </h2>

                          <div className="flex items-center  ">
                            <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                              Size: <span className="text-gray-500">M</span>
                            </p>
                            <p className="font-medium text-base leading-7 text-black ">
                              Qty:
                              <span className="text-gray-500">
                                {data.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              price
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              ${data.price}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                              Expected Delivery Time
                            </p>
                            <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                              23rd March 2021
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
              <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                <svg
                  className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Cancel Order
              </button>
            </div>
            <p className="font-semibold text-2xl text-black py-6">
              Total Price:{' '}
              <span className="text-indigo-600 ml-5">
                {' '}
                $ {order?.totalPrice}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrdersDetails
