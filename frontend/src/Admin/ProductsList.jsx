import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminProducts } from '../Redux/Slices/ProductSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CreateIcon from '@mui/icons-material/Create'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import axios from 'axios'

const ProductsList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const { userdata: user } = useSelector((state) => state.userdata)
  if (user.isAdmin === 'admin') {
    console.log(user?.isAdmin)
  }

  let axiosConfig = {
    withCredentials: true,
  }
  const deleteProduct = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products/${id}`,
      {
        method: 'Delete',
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = await response.json()
    if (data.success) {
      toast.success(data.message)
      navigate('/dashboard-products')
      dispatch(fetchAdminProducts())
    }
  }

  useEffect(() => {
    dispatch(fetchAdminProducts())
  }, [])

  return (
    <>
      <section className="flex py-16 w-[100%] px-5 lg:px-0 overflow-x-auto ">
        <div className="lg:w-[20%] ">
          <Sidebar />
        </div>
        <div className="lg:w-[80%] w-[100%] py-12  lg:py-12 ">
          <div className="flex pb-5 justify-between ">
            <h1 className="pl-5 text-3xl text-gray-600 font-bold">
              Total Products ({products && products.length})
            </h1>
            <div className="lg:px-8 px-5 ">
              <NavLink
                to={`/dashboard/add-product`}
                className=" px-5 py-2 bg-black text-white  rounded"
              >
                +Create
              </NavLink>
            </div>
          </div>
          <div className="overflow-x-auto ">
            <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>{' '}
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              {products && (
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        <img className="h-[60px]" src={product.image} alt="" />
                      </td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        {product.featured === true ? `Yes` : `No`}
                      </td>
                      <td className=" py-4 ">
                        <div className="flex gap-3">
                          <NavLink
                            to={`/admin/product-details/${product._id}`}
                            className="py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline  mr-2"
                          >
                            <RemoveRedEyeIcon className="text-blue-800" />
                          </NavLink>
                          <NavLink
                            to={`/dashboard/update-product/${product._id}`}
                            className=" py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline  mr-2"
                          >
                            <CreateIcon className="text-blue-800" />
                          </NavLink>

                          <button
                            className=" py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <DeleteForeverIcon className="text-red-800" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsList
