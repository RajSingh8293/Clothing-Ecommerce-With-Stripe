// userId
// name
// featured
// image
// title
// description
// category
// price
// color
// countInStock

import React, { useEffect, useState } from 'react'
import { fetchCreateProduct } from '../Redux/Slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// const {}

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userdata: user } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  // const [featured, setFeatured] = useState('')

  // const [product, setProduct] = useState({
  //   name: '',
  //   title: '',
  //   description: '',
  //   category: '',
  //   price: '',
  //   color: '',
  //   countInStock: '',
  // })

  // const onchangeHandler = (e) => {
  //   e.preventDefault()
  //   let name = e.target.name
  //   let value = e.target.value
  //   setProduct({ ...product, [name]: value })
  // }

  //  const  userId = auth.user._id,

  // let data = new FormData()
  // data.append('userId', user._id)
  // data.append('category', category)
  // data.append('name', name)
  // data.append('title', title)
  // productImage && data.append('productImage', productImage)
  // data.append('price', price)
  // data.append('colors', colors)
  // data.append('description', description)
  // data.append('shipping', shipping)
  // data.append('stock', stock)
  // const navigate = useNavigate()
  let axiosConfig = {
    withCredentials: true,
  }

  // const submitHandler = async (e) => {
  //   e.preventDefault()

  //   const response = await fetch('http://localhost:3434/api/v1/product', {
      // method: 'POST',
      // credentials: 'include', // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json',
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
  //     body: JSON.stringify({
  //       name,
  //       title,
  //       category,
  //       color,
  //       price,
  //       countInStock,
  //       image,
  //       description,
  //     }),
  //   })

  //   const data = await response.json()
  //   if (data.success) {
  //     toast.success(data.message)
  //     navigate('/dashboard-products')
  //   }
  //   console.log(data)
  // }

  const product = {
    userId: user._id,
    name,
    title,
    category,
    color,
    price,
    countInStock,
    image,
    description,
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(fetchCreateProduct(product))
  }

  return (
    <section className="flex  w-[100%] bg-white ">
      <div className="lg:w-[20%] lg:py-16 py-16">
        <Sidebar />
      </div>
      <div className="lg:w-[80%] w-[100%] py-16  lg:py-24 overflow-x-auto ">
        <div className=" px-12 md:px-12">
          <h1 className="py-5 text-2xl font-semibold">Add Product</h1>

          <Box autoComplete="off">
            {/* name and title  */}
            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Product Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Title
                </label>
              </div>
            </div> */}
            </div>

            {/* price and count  */}
            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Count In Stock"
                variant="outlined"
                type="number"
                name="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            {/* category and color  */}
            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div className="w-[100%]">
                <FormControl className="w-[100%]">
                  <InputLabel>Category</InputLabel>
                  <Select
                    type="text"
                    name="category"
                    id="category"
                    className="w-[100%]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="Women Clothes">Women Clothes</MenuItem>
                    <MenuItem value="Men Clothes">Men Clothes</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="w-[100%]">
                <FormControl className="w-[100%]">
                  <InputLabel>Color</InputLabel>
                  <Select
                    label="Color"
                    variant="outlined"
                    type="text"
                    name="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                    <MenuItem value="gray">Gray</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* image  */}
            <div className="relative z-0 w-full mb-5 group">
              <TextField
                label="Image"
                variant="outlined"
                type="text"
                name="image"
                className="w-[100%]"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            {/* Description */}
            <div className="relative z-0 w-full mb-5 group">
              <TextField
                label="Description"
                variant="outlined"
                type="text"
                name="description"
                className="w-[100%]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* featured */}
            {/* <div className="relative z-0 w-full mb-5 group">
              <FormControl className="w-[100%]">
                <InputLabel id="demo-simple-select-label">Featured</InputLabel>
                <Select
                  value={featured}
                  label="Featured"
                  className="w-[100%]"
                  onChange={(e) => setFeatured(e.target.value)}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">NO</MenuItem>
                </Select>
              </FormControl>
            </div> */}

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={submitHandler}
            >
              Submit
            </button>
          </Box>
        </div>
      </div>
    </section>
  )
}

export default AddProduct
