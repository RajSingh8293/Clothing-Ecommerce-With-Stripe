import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { fetchSingleOrder } from '../Redux/Slices/orderSlice'
// import { fetchSingleOrder } from '../Redux/Slices/orderSlice'

const AdminOrderDetails = () => {
  const { id } = useParams()
  const { singleOrder: order } = useSelector((state) => state.orders)
  console.log('Order', order)
  // const { token } = useSelector((state) => state.userdata)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [order, setOrder] = useState({})
  const [changeStatus, setChangeStatus] = useState('')
  console.log(changeStatus)
  // console.log('changeStatus', changeStatus)

  // const getSingleOrder = async () => {
  //   const response = await fetch(`http://localhost:3434/api/v1/orders/${id}`, {
  //     credentials: 'include',
  //   })

  //   const res = await response.json()
  //   console.log(res)
  //   setOrder(res.order)
  // }

  useEffect(() => {
    dispatch(fetchSingleOrder(id))
    // getSingleOrder()
  }, [dispatch])

  return (
    <section className="flex py-12 w-[100%]">
      <div className="w-[20%] ">
        <Sidebar />
      </div>
      <section className="px-8 w-[80%]  py-12 relative overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row  justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-2xl leading-7 text-black">
                  Order Id :
                  <span className="text-indigo-600 font-medium text-2xl cursor-pointer">
                    #{id}
                  </span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Order Payment :
                  <span className="text-gray-700 font-medium">
                    {order && order.paidAt}
                  </span>
                </p>
                <div className="lg:flex gap-3 py-3">
                  <h1 className="text-2xl">Order Status : </h1>
                  <span
                    className={
                      order && order.orderStatus === `delivered`
                        ? `text-green-800 text-xl`
                        : `text-red-900 text-xl`
                    }
                  >
                    {order && order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="py-5 flex justify-between flex-wrap border-b border-gray-200 ">
              <div className="px-8">
                <h1 className="py-4 text-xl">Shipping Details </h1>
                {order &&
                  order.shippingInfo &&
                  order.shippingInfo?.map((data, index) => (
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
              {order &&
                order.orderItems?.map((data, index) => (
                  <div className="w-full px-3 min-[400px]:px-6" key={index}>
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
                              <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                Diamond Dials
                              </p>
                              <div className="flex items-center  ">
                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                  Size:{' '}
                                  <span className="text-gray-500">Regular</span>
                                </p>
                                <p className="font-medium text-base leading-7 text-black ">
                                  Qty:{' '}
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
    </section>
  )
}

export default AdminOrderDetails
