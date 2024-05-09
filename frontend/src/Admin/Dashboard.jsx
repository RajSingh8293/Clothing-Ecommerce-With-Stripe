import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminProducts } from '../Redux/Slices/ProductSlice'
import { fetchAllUsersOrders } from '../Redux/Slices/orderSlice'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
// import { getAllUsers } from '../Redux/Slices/UserSlice'

const chartSetting = {
  xAxis: [
    {
      label: 'All sell by month',
    },
  ],
  width: 500,
  height: 400,
}
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
]

const data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
]

const size = {
  width: 400,
  height: 200,
}

const valueFormatter = (value) => `${value}mm`
const Dashboard = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  // const { users } = useSelector((state) => state.userdata)
  const { allUsersOrders } = useSelector((state) => state.orders)
  const token = JSON.parse(localStorage.getItem('token'))
  console.log(allUsersOrders)
  const [users, setUsers] = useState([])
  console.log(users)

  const totalSales = allUsersOrders?.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  )
  console.log(totalSales)

  const axiosConfig = {
    withCredentials: true,
  }
  const getAllUsers = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/users`,
      axiosConfig,
    )
    console.log('data', data.users)
    setUsers(data?.users)
  }

  useEffect(() => {
    dispatch(fetchAdminProducts())
    // dispatch(getAllUsers())
    dispatch(fetchAllUsersOrders())
    getAllUsers()
  }, [dispatch])
  return (
    <section className="flex py-16 w-[100%]">
      <div className="lg:w-[20%] ">
        <Sidebar />
      </div>
      <div className="lg:w-[80%] w-[100%] flex justify-center py-12 px-12 lg:py-12 overflow-x-auto ">
        <div className="w-[100%]  ">
          <div className="lg:flex lg:justify-between gap-5 flex flex-wrap">
            <div className="bg-blue-400 py-8 px-12 flex flex-col gap-2">
              <span className="text-bold">Total Sales</span>
              <span className="text-bold text-2xl">
                $ {totalSales && totalSales}
              </span>
            </div>
            <div className="bg-blue-400 ">
              <NavLink
                className="py-8 px-12 flex flex-col gap-2"
                to="/dashboard-products"
              >
                <span className="text-bold">Total Products</span>
                <span className="text-bold text-2xl">
                  {products && products.length}
                </span>
              </NavLink>
            </div>
            <div className="bg-blue-400 ">
              <NavLink
                className="py-8 px-12 flex flex-col gap-2"
                to="/dashboard-orders"
              >
                <span className="text-bold">Total Orders</span>
                <span className="text-bold text-2xl">
                  {' '}
                  {allUsersOrders && allUsersOrders.length}
                </span>
              </NavLink>
            </div>
            <div className="bg-blue-400 ">
              <NavLink
                className="py-8 px-12 flex flex-col gap-2"
                to="/dashboard-users"
              >
                <span className="text-bold">Total User</span>
                <span className="text-bold text-2xl">
                  {users && users.length}
                </span>
              </NavLink>
            </div>
          </div>

          <div className="px-8 py-12 lg:flex lg:py-12 lg:justify-between gap-8 lg:items-center">
            <div className="">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 200, label: 'InStock' },
                      { id: 1, value: 15, label: 'OutInStock' },
                      { id: 3, value: 200, label: 'Total' },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
            <div className=" ">
              <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                  {
                    dataKey: 'seoul',
                    label: 'Sell By Monthely',
                    valueFormatter,
                  },
                ]}
                layout="horizontal"
                {...chartSetting}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
