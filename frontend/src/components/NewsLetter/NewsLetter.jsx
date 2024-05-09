import image from '../../assets/Images/e-com-png-removebg-preview.png'

const NewsLetter = () => {
  return (
    <div className="lg:px-8 md:px-8 px-5 relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="lg:flex lg:justify-between items-center">
        <div className="lg:w-[50%]">
          <h2 className="lg:text-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Subscribe to our newsletter.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing
            velit quis. Duis tempor incididunt dolore.
          </p>
        </div>
        <div className="mt-6 flex  lg:w-[40%] w-[100%] ">
          <div className="flex items-center flex-col lg:flex-row md:flex-row sm:flex-row gap-3 w-[100%]  lg:w-[100%] md:w-[100%] sm:w-[100%]">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              className=" lg:w-[100%] md:w-[80%] sm:w-[80%] w-[100%] rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className=" lg:mt-0 md:mt-0 sm:mt-0  mt-0 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}

export default NewsLetter
