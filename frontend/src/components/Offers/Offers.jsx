import React from 'react'

const Offers = () => {
  return (
    <section className="flex justify-center">
      <div className="lg:py-24 py-16 flex justify-center flex-col text-center">
        <div>
          <h1 className="font-bold text-3xl lg:text-5xl md:text-4xl sm:text-4xl">
            Get 25% off during our one-time sale
          </h1>
          <p className="text-gray-600 text-xl py-5">
            Most of our products are limited releases that won't come <br />{' '}
            back. Get your favorite items while they're in stock.
          </p>
        </div>
        <div className="w-[100%] flex justify-center">
          <button className=" w-[40%] bg-[#121827] font-semibold text-[#d5cfcf] py-2 px-5">
            Get Offers
          </button>
        </div>
      </div>
    </section>
  )
}

export default Offers
