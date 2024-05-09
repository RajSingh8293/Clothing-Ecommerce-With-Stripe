import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = ({ product }) => {
  // console.log(product)
  return (
    <div className="group relative border p-3">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-72 flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <NavLink to={`/product-details/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title.slice(0, 15)}...
            </NavLink>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  )
}

export default Card
