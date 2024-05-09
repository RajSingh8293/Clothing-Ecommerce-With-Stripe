import React from 'react'

const AddressPage = () => {
  return (
    <section className="py-10 px-8">
      <div>
        <h1 className="pb-4 text-5xl">Your Addresss</h1>
        <p className=" font-bold">Personel address</p>
        <div className="flex items-center  gap-5 text-white bg-[#424242] p-4 lg:shadow rounded">
          <div className=" capitalize border-r-2 pr-5">
            <p className="">Name </p>
            <p className="">Phone </p>
            <p className="">Country </p>
            <p className="">State </p>
            <p className="">City </p>
            <p className="">Address </p>
            <p className="">Zip ode </p>
          </div>
          <div className="capitalize">
            <p className=""> John cena </p>
            <p className="">+16877272777</p>
            <p className="">Japan</p>
            <p className="">Tokyo</p>
            <p className="">Shinjuku</p>
            <p className=""> 34105 Hoeger Plains</p>
            <p className="">67675688</p>
          </div>
        </div>
        <div className=" py-3">
          <button className="mr-5 py-1 px-5 text-white bg-green-800 rounded">
            update
          </button>
          <button className="py-1 px-5 text-white bg-red-800 rounded">
            delete
          </button>
        </div>
      </div>
    </section>
  )
}

export default AddressPage
