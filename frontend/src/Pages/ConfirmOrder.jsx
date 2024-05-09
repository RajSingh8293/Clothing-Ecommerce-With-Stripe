import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const { userdata: user } = useSelector((state) => state.userdata)
  const { shippingInfo, cartItems } = useSelector((state) => state.cartItems)
  console.log(cartItems)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )
  const shippingCharge = subtotal > 100 ? 0 : 5
  // const tax = (subtotal * 0.18).toFixed(2)
  const tax = Math.round((subtotal * 0.18).toFixed(2))

  const totalPrice = Number((subtotal + shippingCharge + tax).toFixed(2))
  const address = `${shippingInfo.address},${shippingInfo.state},${shippingInfo.city},${shippingInfo.zipcode}`

  const paymentHandler = () => {
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalPrice,
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    navigate('/payment')
  }
  return (
    <section className="py-24 relative px-10 ">
      <div className="py-8">
        <CheckoutSteps activeStep={1} />
      </div>
      <div className="lg:flex lg:justify-between">
        <div className="w-[100%] lg:w-[60%] md:w-[100%]">
          <div className="py-3 w-[100%]">
            <div>
              <h1 className="font-bold py-3 text-3xl">Shipping Details </h1>
              <h1 className="address">
                Username: <span>{user?.username}</span>
              </h1>
              <h1 className="address">
                Name:{' '}
                <span>
                  {shippingInfo.firstname} {shippingInfo.lastname}
                </span>
              </h1>
              <h1 className="address">
                Phone: <span>{shippingInfo.phone}</span>
              </h1>
              <h1 className="address">
                Country: <span>{shippingInfo.country}</span>
              </h1>
              <h1 className="address">
                State: <span>{shippingInfo.state}</span>
              </h1>
              <h1 className="address">
                Address: <span>{address}</span>
              </h1>
            </div>
          </div>

          <div className="w-[100%] md:w-[100%] py-5">
            <div className="main-box border flex gap-3 flex-col p-3 border-gray-200 rounded-xl max-w-xl ">
              {cartItems &&
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-around items-center "
                  >
                    <div className="h-[70px] flex justify-center items-center">
                      <img className="h-[100%]" src={item.image} alt="" />
                    </div>

                    <NavLink to={`/product-details/${item._id}`}>
                      {item.name}
                    </NavLink>
                    <p>
                      <span>
                        {item.quantity} X {item.price} =
                      </span>
                      <span> ${item.quantity * item.price}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="lg:w-[40%] w-[100%] sm:w-[100%] md:w-[100%]  flex gap-3 flex-col py-8  mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 ">
          <h1 className="lg:text-4xl text-3xl font-semibold border-b-2 py-3 ">
            Order Summery
          </h1>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal :</p>
            <p className="text-gray-700">$ {subtotal}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Shipping Fee : </p>
            <p className="text-gray-700">$ {shippingCharge}</p>
          </div>
          <div className=" mb-2 flex justify-between">
            <p className="text-gray-700">
              GST <span className="text-sm">(18%)</span> :
            </p>
            <p className="text-gray-700">$ {tax}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">$ {totalPrice}</p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-[#424242] py-1.5 font-medium text-blue-50 hover:bg-red-800"
            onClick={paymentHandler}
          >
            Make Payment
          </button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmOrder
