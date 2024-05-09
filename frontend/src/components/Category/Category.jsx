import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CategoryStyle.css'
import Heading from '../Heading/Heading'

const Category = ({ getCategoryData }) => {
  return (
    <section className="px-10 py-10 xl:py-20">
      <Heading title="Our Categories" />
      <div className=" py-10 flex justify-center  ">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mx-auto  ">
          {getCategoryData.map((data, index) => (
            <div
              key={index}
              className="category border cursor-pointer text-white font-semibold flex justify-center items-center rounded-full bg-gray-500 w-[250px] h-[250px] uppercase"
            >
              {data}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Category
