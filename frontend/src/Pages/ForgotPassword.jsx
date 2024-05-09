import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import { userforgotPassword } from '../redux/slices/UserSlice'
import { useDispatch } from 'react-redux'

const ForgotPassword = () => {
  const [loading, setLaoding] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const onchangeHandler = (e) => {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const updatePasswordHandler = (e) => {
    e.preventDefault()
    // dispatch(userforgotPassword(user))
  }
  return (
    <section>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <div className="bg-white w-screen font-sans text-gray-900">
          <div className=" ">
            <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
              <div className="mx-2 text-center md:mx-auto md:w-2/3 md:py-5">
                <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
                  Update Password
                </h1>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
            <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold">
                  Old Password
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-[#424242] focus:ring"
                  id="oldPassword"
                  name="oldPassword"
                  value={user.oldPassword}
                  onChange={onchangeHandler}
                  type="password"
                  placeholder="Old Password"
                  required=""
                />
                <span className="my-2 block"></span>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold">
                  New Password
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-[#424242] focus:ring"
                  id="newPassword"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={onchangeHandler}
                  type="password"
                  placeholder="New Password"
                  required=""
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold">
                  Confirm Password
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-[#424242] focus:ring"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={onchangeHandler}
                  type="password"
                  placeholder="Confirm Password"
                  required=""
                />
              </div>

              <div className="flex items-center">
                <div className="flex-1"></div>
                <button
                  onClick={updatePasswordHandler}
                  className="cursor-pointer rounded bg-[#424242] py-2 px-8 text-center text-lg font-bold  text-white hover:bg-red-800"
                  type="submit"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ForgotPassword
