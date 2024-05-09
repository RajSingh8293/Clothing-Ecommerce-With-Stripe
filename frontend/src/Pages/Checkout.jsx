// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'

// const Shipping = () => {
//   const [userShipping, setUserShipping] = useState({})
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900">
//       <div className="w-full max-w-3xl mx-auto p-8">
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//             Checkout
//           </h1>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
//               Shipping Address
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label
//                   htmlFor="first_name"
//                   className="block text-gray-700 dark:text-white mb-1"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 dark:text-white mb-1">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="last_name"
//                   className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label
//                 htmlFor="address"
//                 className="block text-gray-700 dark:text-white mb-1"
//               >
//                 Address
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//               />
//             </div>

//             <div className="mt-4">
//               <label
//                 htmlFor="city"
//                 className="block text-gray-700 dark:text-white mb-1"
//               >
//                 City
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label
//                   htmlFor="state"
//                   className="block text-gray-700 dark:text-white mb-1"
//                 >
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="zip"
//                   className="block text-gray-700 dark:text-white mb-1"
//                 >
//                   ZIP Code
//                 </label>
//                 <input
//                   type="text"
//                   id="zip"
//                   className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end">
//             <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">
//               <NavLink to="/payment">Place Order</NavLink>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Shipping

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { shippingReducer } from '../Redux/Slices/CartSlice'
import CheckoutSteps from './CheckoutSteps'
import { Country, State, City } from 'country-state-city'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem('user'))
  // const { cartItems } = useSelector((state) => state.cartItems)
  const { shippingInfo, cartItems } = useSelector((state) => state.cartItems)

  // const { userdata } = useSelector((state) => state.userdata)
  // console.log(cartItems)
  // const [shippingAdderess, setShippingAdderess] = useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   phone: '',
  //   country: '',
  //   state: '',
  //   city: '',
  //   street: '',
  //   address: '',
  //   pincode: '',
  // })

  const [firstname, setFirstname] = useState(shippingInfo.firstname)
  const [lastname, setLastname] = useState(shippingInfo.lastname)
  const [phone, setPhone] = useState(shippingInfo.phone)
  const [country, setCountry] = useState(shippingInfo.country)
  const [state, setState] = useState(shippingInfo.state)
  const [city, setCity] = useState(shippingInfo.city)
  const [address, setAddress] = useState(shippingInfo.address)
  const [zipcode, setZipcode] = useState(shippingInfo.zipcode)

  // const onchangeHandler = (e) => {
  //   console.log(e)
  //   let name = e.target.name
  //   let value = e.target.value
  //   setShippingAdderess({ ...shippingAdderess, [name]: value })
  // }

  const shippingHandler = (e) => {
    e.preventDefault()
    if (phone.length < 10) {
      alert('Phone number must be 10 digit long')
    }
    dispatch(
      shippingReducer({
        firstname,
        lastname,
        phone,
        country,
        state,
        city,
        address,
        zipcode,
      }),
    )

    navigate('/order/confirm')
  }

  console.log(
    firstname,
    lastname,
    phone,
    country,
    state,
    city,
    address,
    zipcode,
  )

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cartItems.forEach((item) => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }
  const subtotal = getTotal()
  const shipping = subtotal.totalPrice > 100 ? 0 : 5

  return (
    <section className="lg:py-24">
      <div className="py-8">
        <CheckoutSteps activeStep={0} />
      </div>
      <section className="w-[100%] flex lg:justify-between flex-wrap px-10 ">
        <div className="lg:w-[50%] w-[80%] mx-auto">
          <h1 className="text-gray-600 font-semibold text-2xl pb-5">
            Shipping Address
          </h1>
          {/* first name & last name  */}
          <div className="mb-5 lg:flex lg:justify-between  md:flex md:justify-between gap-5">
            <div className="lg:w-[50%]  md:w-[50%] mb-4">
              <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                First Name
              </label>
              <input
                type="text"
                className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                placeholder="John"
                name="firstname"
                // value={shippingAdderess.firstname}
                // onChange={onchangeHandler}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="lg:w-[50%]  md:w-[50%]">
              <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Last Name
              </label>
              <input
                type="text"
                className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                placeholder="Cena"
                name="lastname"
                // value={shippingAdderess.lastname}
                // onChange={onchangeHandler}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          {/* phone   */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Phone
            </label>
            <input
              type="phone"
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              placeholder="+91 8978676745"
              name="phone"
              // value={shippingAdderess.phone}
              // onChange={onchangeHandler}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* country & state */}

          <div className=" mb-5">
            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Country
            </label>
            <select
              name=""
              id=""
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>Select your country</option>

              {Country &&
                Country.getAllCountries().map((c) => (
                  <option key={c.name} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {country && (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                State
              </label>
              <select
                name=""
                id=""
                className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option>Select your state</option>
                {State &&
                  State.getStatesOfCountry(country).map((c) => (
                    <option key={c.name} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* city & street  */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              City
            </label>
            <input
              type="text"
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              placeholder="Delhi"
              name="city"
              // value={shippingAdderess.address}
              // onChange={onchangeHandler}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/* Address */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Address
            </label>
            <input
              type="text"
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              placeholder="103, lajpat nagar, 3rd floor "
              name="house"
              // value={shippingAdderess.address}
              // onChange={onchangeHandler}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* pincode  */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Zipcode / Pincode
            </label>
            <input
              type="text"
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              placeholder="1202002"
              name="pincode"
              // value={shippingAdderess.pincode}
              // onChange={onchangeHandler}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        </div>
        <div className="lg:w-[40%] w-[80%] mx-auto">
          <h1 className="text-gray-600 font-semibold text-2xl pb-5">
            Make a Payment
          </h1>
          <div className=" w-[100%] mt-6  rounded-lg border bg-white p-6 shadow-md md:mt-0">
            {/* <h1 className="text-2xl font-semibold">{totalQty}</h1> */}
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                $ {subtotal.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$ {shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  $ {getTotal().totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#424242] py-1.5 font-medium text-blue-50 hover:bg-red-800"
              onClick={shippingHandler}
            >
              Pay Now
            </button>
            <p className="flex justify-center items-center gap-3 mt-6 w-full rounded-md py-1.5 font-medium hover:text-red-800 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <NavLink to="/shop">Continue To Shopping</NavLink>
            </p>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Checkout
