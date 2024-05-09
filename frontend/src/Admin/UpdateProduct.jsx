import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify'
import axios from 'axios'

const UpdateProduct = () => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState('')

  //   const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { userdata: user } = useSelector((state) => state.userdata)
  const token = JSON.parse(localStorage.getItem('token'))
  let axiosConfig = {
    withCredentials: true,
  }
  const getProductById = async () => {
    const { data } = await axios.get(
      `http://localhost:3434/api/v1/products/${id}`,
      {
        axiosConfig,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setName(data.product.name)
    setTitle(data.product.title)
    setCategory(data.product.category)
    setColor(data.product.color)
    setPrice(data.product.price)
    setCountInStock(data.product.countInStock)
    setImage(data.product.image)
    setDescription(data.product.description)
    setFeatured(data.product.featured)
    console.log(data)
  }

  const updateData = {
    name,
    title,
    category,
    color,
    price,
    countInStock,
    image,
    description,
    featured,
  }

  const updateHandler = async (e) => {
    e.preventDefault()

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      },
    )

    const data = await response.json()
    if (data.success) {
      toast.success(data.message)
      navigate('/dashboard-products')
    }
    console.log(data)
  }
  useEffect(() => {
    getProductById()
  }, [])

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
            <div className="relative z-0 w-full mb-5 group">
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
            </div>
            <div className="lg:flex lg:justify-between gap-5">
              <div className="flex w-[100%] mb-5">
                <button
                  className="flex justify-center items-center w-[100%] text-white bg-black border-0 py-2 px-6 focus:outline-none hover:text-black hover:bg-[tomato]"
                  onClick={updateHandler}
                >
                  Update
                </button>
              </div>

              <div className="w-[100%] ">
                <NavLink
                  to="/dashboard-products"
                  className="flex bg-[tomato] justify-center items-center w-[100%] text-black hover:text-white bg-[red]border-0 py-2 px-6 focus:outline-none hover:bg-black"
                >
                  Go back
                </NavLink>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </section>
  )
}

export default UpdateProduct
