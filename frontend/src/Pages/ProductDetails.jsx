import React, { useEffect, useState } from 'react'
// import { data } from '../../data'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchSingleProduct } from '../redux/Actions/ProductActions'
// import { fetchProduct } from '../redux/slices/productsSlice'
import { useParams } from 'react-router-dom'
// import { addToCart } from '../redux/Actions/CartActions'
import {
  STATUS,
  SingleProduct,
  fetchProducts,
} from '../Redux/Slices/ProductSlice'
import { addToCart } from '../Redux/Slices/CartSlice'
import Rating from '../components/Rating/Rating'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Loader from '../components/Loader/Loader'
import Card from '../components/Card/Card'

const ProductDetails = () => {
  const [active, setActive] = useState(1)
  // window.scrollTo(0, 0)
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const [productRelated, setProductRelated] = useState([])

  const dispatch = useDispatch()
  const { singledata: product, data, status } = useSelector(
    (state) => state.products,
  )

  const AddToCart = (data) => {
    dispatch(addToCart(data))
  }

  useEffect(() => {
    dispatch(SingleProduct(id))
    dispatch(fetchProducts(id))
    const relatedProduct =
      data && data.filter((item) => item.category == product.category)
    setProductRelated(relatedProduct)
  }, [id])

  if (status === STATUS.LOADING) {
    return <Loader />
  }

  return (
    <section>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-[100%] mx-auto flex flex-wrap">
            <div className="lg:w-[40%] w-[100%] border p-3 flex justify-center items-center">
              <img
                alt="ecommerce"
                className="h-[400px] rounded border-gray-200"
                src={product?.image}
              />
            </div>
            <div className="lg:w-[60%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <Rating data={product.rating} />
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <div>
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
              </div>
              <div className="py-2 flex items-center gap-20">
                {product.countInStock > 0 ? (
                  <span className="bg-green-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-red-300">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Out Of Stock
                  </span>
                )}

                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-[100%]">
                <button
                  className="flex justify-center items-center w-[100%] text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-red-900"
                  onClick={() => AddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=" px-8">
          <div className="flex gap-10 border-b-2 py-5 font-semibold">
            <button onClick={() => setActive(1)}>Product Details </button>
            <button onClick={() => setActive(2)}>Product Reviews </button>
          </div>
          <div className="overflow-y-auto p-5">
            {active === 1 ? (
              <div>
                <p>
                  A product detail section provides all the information and
                  details of your product on your Ecommerce site. The product
                  details component appears when you click on a product from
                  your product grid or any external link.Tailwind product
                  details category has different variations on the basis of
                  buttons (checkout, add to wishlist, favorite, etc), graphical
                  arrangement, dropdowns, quantity, and so on.We have thoroughly
                  tested all the components of Tailwind product details category
                  htmlFor cross-browser compatibility and functionality htmlFor
                  consistent experiences across different screen sizes, devices,
                  and browsers. These components are completely modular,
                  functional, em sit quaerat commodi facere, architecto
                  assumenda vero repellendus repellat animi? Fuga ab animi optio
                  vel odio accusamus adipisci voluptates mollitia.
                </p>
              </div>
            ) : null}

            {active == 2 ? (
              <div className="py-5">
                <p className="font-bold text-bold">
                  Reviews <span>( 2409 )</span>
                </p>
                <div className="">
                  <div className="py-5">
                    <div className="flex gap-5 items-center">
                      <div className="h-[40px] w-[40px] rounded-full overflow-hidden border">
                        <img
                          className="h-[100%]"
                          src="https://m.media-amazon.com/images/I/81oTmSS7J3L._AC_SY500_.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm">johncena</p>
                        <p>
                          <span className="flex items-center">
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                          </span>
                        </p>
                        <p className="text-sm">
                          This is good shirt htmlFor summer
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <div className="flex gap-5 items-center">
                      <div className="h-[40px] w-[40px] rounded-full overflow-hidden border">
                        <img
                          className="h-[100%]"
                          src="https://m.media-amazon.com/images/I/81oTmSS7J3L._AC_SY500_.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm">johncena</p>
                        <p>
                          <span className="flex items-center">
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                          </span>
                        </p>
                        <p className="text-sm">
                          This is good shirt htmlFor summer
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <div className="flex gap-5 items-center">
                      <div className="h-[40px] w-[40px] rounded-full overflow-hidden border">
                        <img
                          className="h-[100%]"
                          src="https://m.media-amazon.com/images/I/81oTmSS7J3L._AC_SY500_.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm">johncena</p>
                        <p>
                          <span className="flex items-center">
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                          </span>
                        </p>
                        <p className="text-sm">
                          This is good shirt htmlFor summer
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <div className="flex gap-5 items-center">
                      <div className="h-[40px] w-[40px] rounded-full overflow-hidden border">
                        <img
                          className="h-[100%]"
                          src="https://m.media-amazon.com/images/I/81oTmSS7J3L._AC_SY500_.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm">johncena</p>
                        <p>
                          <span className="flex items-center">
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 text-red-500"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                          </span>
                        </p>
                        <p className="text-sm">
                          This is good shirt htmlFor summer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section className="px-8 py-10">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-4">
            <h1 className="text-2xl font-semibold py-3">Related Products</h1>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4 ">
              {productRelated &&
                productRelated?.map((product) => (
                  <Card product={product} key={product._id} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ProductDetails
