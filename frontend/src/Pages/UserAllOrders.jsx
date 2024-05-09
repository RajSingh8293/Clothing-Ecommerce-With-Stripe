import React, { useEffect } from 'react'
// import Box from '@mui/material/Box'
// import { DataGrid } from '@mui/x-data-grid'
import { fetchAllOrders } from '../Redux/Slices/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const UserAllOrders = () => {
  const { myorders: orders } = useSelector((state) => state.orders)
  const token = JSON.parse(localStorage.getItem('token'))
  const dispatch = useDispatch()

  console.log(orders)

  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [])
  return (
    <section className=" relative w-[100%] lg:flex gap-2 min-h-[100vh] md:gap-8 px-8 pt-20 pb-8 lg:py-24">
      {/* <div className="border w-[100%] lg:w-[8100%] md:w-[100%] shadow-lg">
        <div style={{ width: '100%' }}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div> */}
      <div className="w-[100%]  relative overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="py-5 ">
          <h1 className="text-3xl px-5">Hello Raj There are All your Orders</h1>
        </div>
        <table className="w-[100%] py-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="hover:bg-blue-gray-200">
              <th scope="col" className="px-6 py-3 text-black font-bold">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3 text-black font-bold">
                Status
              </th>

              <th scope="col" className="px-6 py-3 text-black font-bold">
                ItemsQty
              </th>
              <th scope="col" className="px-6 py-3 text-black font-bold">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 text-black font-bold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-blue-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order._id}
                </th>

                <td
                  className={`px-6 py-4 ${
                    order.orderStatus === `delevered`
                      ? `text-green-900 font-semibold`
                      : `text-red-900 font-semibold`
                  }`}
                >
                  {order.orderStatus}
                </td>
                <td className="px-6 py-4">{order.orderItems.length}</td>
                <td className="px-6 py-4">{order.totalPrice}</td>

                <td className="px-6 py-4 ">
                  <NavLink
                    to={`/user/order-details/${order._id}`}
                    className="bg-light-blue-400 py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline  mr-3"
                  >
                    View
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UserAllOrders
