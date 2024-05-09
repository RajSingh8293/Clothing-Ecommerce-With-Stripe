import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../Card/Card'
import Heading from '../Heading/Heading'

export default function Products({ products, title }) {
  return (
    <section>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-4">
          <h1 className="text-2xl font-semibold py-3">
            <Heading title={title} />
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4 ">
            {products &&
              products.map((product) => (
                <Card product={product} key={product._id} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
