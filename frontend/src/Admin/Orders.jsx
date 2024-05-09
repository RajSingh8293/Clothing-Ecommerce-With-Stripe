import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import {
  fetchAllUsersOrders,
  fetchUpdateOrderStatus,
} from '../Redux/Slices/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { NavLink } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { allUsersOrders: orders } = useSelector((state) => state.orders)

  const dispatch = useDispatch()

  const updateOrderStatus = async (e, orderId) => {
    console.log(e, orderId)
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/order-status`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: e.target.value, orderId }),
      },
    )
    const data = await response.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(fetchAllUsersOrders())
    }
  }

  const deleteorderHandler = async (orderId) => {
    console.log(orderId)
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/order/${orderId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(fetchAllUsersOrders())
    }
  }

  useEffect(() => {
    dispatch(fetchAllUsersOrders())
  }, [])
  return (
    <section className="flex py-16 w-[100%] lg:px-0 px-8 overflow-x-auto ">
      <div className="lg:w-[20%] ">
        <Sidebar />
      </div>

      <div className="lg:w-[80%] w-[100%] lg:px-5 py-12  lg:py-12  ">
        <h1 className="pl-5 pb-5 text-3xl text-gray-600  font-semibold">
          Total orders ({orders && orders?.length})
        </h1>
        <div className="overflow-x-auto">
          <table className="w-[100%] py-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="hover:bg-blue-gray-200">
                <th scope="col" className="px-6 py-3 text-black font-bold">
                  Order Id
                </th>

                <th scope="col" className="px-6 py-3 text-black font-bold">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 text-black font-bold">
                  ItemsQty
                </th>
                <th scope="col" className="px-6 py-3 text-black font-bold">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-black font-bold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <NavLink
                        to={`/dashboard/order-details/${order._id}`}
                        className="hover:underline"
                      >
                        {order._id}
                      </NavLink>
                    </th>

                    <td className="px-6 py-4">{order.orderItems.length}</td>
                    <td className="px-6 py-4">{order.totalPrice}</td>
                    <td className="px-6 py-4 ">
                      <select
                        className="py-2 px-5"
                        onChange={(e) => updateOrderStatus(e, order?._id)}
                        value={order?.orderStatus}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex">
                        <NavLink
                          to={`/dashboard/order-details/${order._id}`}
                          className=" py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline  mr-2"
                        >
                          <RemoveRedEyeIcon className="text-blue-800" />
                        </NavLink>
                        <button
                          className=" py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline"
                          onClick={() => deleteorderHandler(order._id)}
                        >
                          <DeleteForeverIcon className="text-red-800" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Orders
