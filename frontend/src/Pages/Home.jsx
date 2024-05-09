import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../components/Products/Products'
import Hero from '../components/Hero/Hero'
import Category from '../components/Category/Category'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import Offers from '../components/Offers/Offers'
// import { fetchProducts } from '../redux/Actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS, fetchProducts } from '../Redux/Slices/ProductSlice'
import Loader from '../components/Loader/Loader'

const Home = () => {
  const dispatch = useDispatch()
  // const { data: products, status } = useSelector((state) => state.products)
  const [products, setProducts] = useState([])
  const [getCategoryData, setGetCategoryData] = useState([])
  const [womenFilter, setWomenFilter] = useState([])
  // console.log(products)

  const fetchdata = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products`,
    )
    const data = await response.json()
    setProducts(data.products)
    console.log(data)
  }
  useEffect(() => {
    // dispatch(fetchProducts())
    fetchdata()
  }, [])

  const categoryData = [...new Set(products?.map((data) => data.category))]

  const womenFilterData = products?.filter(
    (data) => data.category === 'Women Clothes',
  )

  if (status === STATUS.LOADING) {
    return <Loader />
  }

  return (
    <div className="lg:pt-[70px] pt-[55px]">
      <div>
        <Hero />
      </div>
      <Category getCategoryData={categoryData} />
      <Products products={products?.slice(0, 4)} title="Our Collections" />
      <NewsLetter />
      <div className="lg:px-8 px-5">
        <Offers />
      </div>
      <Products products={womenFilterData} title="Women Items" />
    </div>
  )
}

export default Home
