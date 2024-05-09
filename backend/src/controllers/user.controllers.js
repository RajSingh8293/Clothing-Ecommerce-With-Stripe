import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { ApiError } from "../utils/ApiError.js";
dotenv.config({
	path: "./.env"
})



// register user
export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username) {
		return res.status(422).json({ message: 'Username is required !' })

	}
	if (!email) {
		return res.status(422).json({ message: 'Email is required !' })

	}
	if (!password) {
		return res.status(422).json({ message: 'Password is required !' })

	}

	try {
		// existing user
		const existsUser = await User.findOne({ email })
		// const existsUser = await User.findOne({ $or: [{ username }, { email }] })
		if (existsUser) {
			return res.status(400).json({ success: false, message: 'User already exists !' })

		}


		// password hash
		const hashPassword = bcryptjs.hashSync(password, 8)
		const userdata = new User({
			username,
			email,
			password: hashPassword,
		})

		const user = await userdata.save()

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

		const { password: pass, ...rest } = user._doc //  hide passwrod
		const options = {
			httpOnly: true,
			secure: true
		}
		res.status(201)
			.cookie("token", token, options)
			.json(
				{
					success: true,
					message: "Registered successfully",
					user: rest, token: token

				})



	} catch (error) {
		res.status(500).json(
			{
				success: false,
				message: "Something went wrong",
				error
			})

	}


})

// login user
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	if (!password) {
		return res.status(404).json({ success: false, message: 'Password is required !' })

	}
	if (!email) {
		return res.status(404).json({ success: false, message: 'Email is required !' })
	}

	try {
		// const user = await User.findOne({ $or: [{ username }, { email }] })
		const user = await User.findOne({ email })
		if (!user) {
			res.status(400).send({
				success: false,
				message: 'User does not exists'
			})
		}

		// if (!user) {
		// 	throw new ApiError(404, "User does not exist")
		// }

		const isMatch = bcryptjs.compareSync(password, user.password)
		if (!isMatch) {
			res.status(400).send({
				success: false,
				message: 'Invalid data !'
			})
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' },)

		const options = {
			httpOnly: true,
			secure: true
		}
		const { password: pass, ...rest } = user._doc // hide password
		res.status(200)
			.cookie("token", token, options)
			.json(
				{
					success: true,
					message: "Logged in successfully",
					user: rest,
					token
				}
			)

	} catch (error) {
		return res.status(400).json({
			success: false,
			message: "Error with login",
			error
		})
	}

})


// logout user
export const logoutUser = asyncHandler(async (req, res) => {
	try {
		const options = {
			httpOnly: true,
			secure: true
		}

		return res
			.status(200)
			.clearCookie("token", options)
			.json({
				success: true,
				message: "User logged Out"
			}

			)

	} catch (error) {
		return res
			.status(500)
			.json({
				success: false,
				message: "Something wrong with logged Out"
			}

			)

	}

})

// get profile user
export const userProfile = asyncHandler(async (req, res) => {

	try {
		// const user = await User.findById(req.user?._id).select("-password")
		const user = await User.findById(req.user?._id)
		// console.log(user);
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User does not exist'
			})
		}
		return res.status(200).json({
			success: true,
			message: 'User found successfully',
			user
		})

	} catch (error) {
		res.status(400).json({ success: false, message: "Error with finding user by id", error })
	}

})

// update profile user
export const updateUserProfile = asyncHandler(async (req, res) => {
	const { username, email } = req.body
	// if (password) {
	// }
	try {

		const findUserById = await User.findById(req.user?._id)
		if (!findUserById) {
			return res.status(400).json({
				success: false,
				message: 'User not found',
			})
		}
		const user = await User.findByIdAndUpdate(req.user?._id, {
			$set: {
				username,
				email,
			}
		},
			{ new: true }
		)


		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' },)
		return res.status(200).json({
			success: true,
			message: 'User updated successfully',
			user,
			token
		})


	} catch (error) {
		res.status(400).json({ success: false, message: "Error with updating user", error })
	}

})

// put change profile user
export const changeUserPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body
	const user = await User.findById(req.user?._id)

	const matchPassword = bcryptjs.compareSync(oldPassword, user.password)
	// const matchPassword = bcryptjs.compareSync(req.body.oldPassword, user.password)
	if (!matchPassword) {
		return res.status(400).json({
			success: false,
			message: 'Password does not match'
		})
	}

	const changedPassword = bcryptjs.hashSync(newPassword, 8)
	user.password = changedPassword
	await user.save({ validateBeforeSave: false })

	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' },)

	const options = {
		httpOnly: true,
		secure: true
	}
	return res.status(200)
		.cookie("token", token, options)
		.json({
			success: false,
			message: 'Password changed successfully',
			user
		})


})

// delete account himself user
export const deleteUserById = asyncHandler(async (req, res) => {

	try {
		const user = await User.findById(req.user?._id)
		// const user = await User.findById(req.params.id)
		console.log(user);
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User does not exist'
			})
		}
		const deleteUser = await User.findByIdAndDelete(user)

		return res.status(200).json({
			success: true,
			message: 'User deleted successfully',
			user: deleteUser
		})

	} catch (error) {
		res.status(400).json({ success: false, message: "Error with finding user by id", error })
	}

})



// admin get users
export const allUsers = asyncHandler(async (req, res) => {
	const users = await User.find()
	return res.status(200).json({ users })
})

// admin get single user by id
export const singleUser = asyncHandler(async (req, res) => {

	try {
		// const user = await User.findById(req.user?._id).select("-password")
		const user = await User.findById(req.params.id)
		console.log(user);
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User does not exist'
			})
		}


		return res.status(200).json({
			success: true,
			message: 'User found successfully',
			user
		})

	} catch (error) {
		res.status(400).json({ success: false, message: "Error with finding user by id", error })
	}

})

// admin change users status
export const changeUserStatus = asyncHandler(async (req, res) => {

	try {

		const { userId, isAdmin } = req.body
		const user = await User.findById(userId)
		if (!user) {
			return res.status(402).json({
				success: false,
				message: "Order is not found"
			})
		}

		const updateUser = await User.findByIdAndUpdate(user, { $set: { isAdmin } }, { new: true })

		return res.status(200).json({
			success: true,
			message: 'User updated successfully',
			user: updateUser,
		})

	} catch (error) {
		res.status(400).json({ success: false, message: "Error with updating user", error })
	}

})

// admin update user datils or status
export const adminUpdateUsersDetail = asyncHandler(async (req, res) => {
	const { username, email, isAdmin } = req.body

	try {

		const findUserById = await User.findById(req.params.id)
		if (!findUserById) {
			return res.status(400).json({
				success: false,
				message: 'User not found',
			})
		}
		const user = await User.findByIdAndUpdate(findUserById, {
			$set: {
				username,
				email,
				isAdmin
			}
		},
			{ new: true }
		)


		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' },)
		return res.status(200).json({
			success: true,
			message: 'User updated successfully',
			user,
			token
		})


	} catch (error) {
		res.status(400).json({ success: false, message: "Error with updating user", error })
	}

})
// delete user
export const admindeleteUserById = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		// const user = await User.findById(req.params.id)
		// console.log(user);
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User does not exist'
			})
		}
		const deleteUser = await User.findByIdAndDelete(req.params.id)

		if (deleteUser) {

			res.status(200).json({
				success: true,
				message: 'User deleted successfully',
				user: deleteUser
			})
		}

	} catch (error) {
		res.status(400).json({ success: false, message: "Error with finding user by id", error })
	}

})



// export const passwordUpdate = asyncHandler(async (req, res) => {

// 	try {
// 		const { oldPassword, newPassword } = req.body

// 		// const user = await User.findById(req.user?._id)
// 		const user = await User.findById(req.params.id)

// 		console.log(user);

// 		const isPasswordCorrect = bcryptjs.compareSync(oldPassword, user.password)
// 		if (!isPasswordCorrect) {
// 			return res.status(400).json({
// 				success: false,
// 				message: 'Invalid password'
// 			})
// 		}


// 		user.password = newPassword
// 		await user.save({ validateBeforeSave: false })


// 		return res.status(400).json({
// 			success: true,
// 			message: 'Password changed successfully'
// 		})

// 		// if (!user) {
// 		// 	return res.status(400).json({
// 		// 		success: false,
// 		// 		message: 'User does not exist'
// 		// 	})
// 		// }
// 		// const deleteUser = await User.findByIdAndDelete(user)

// 		// return res.status(200).json({
// 		// 	success: true,
// 		// 	message: 'User deleted successfully',
// 		// 	user: deleteUser
// 		// })

// 	} catch (error) {
// 		res.status(400).json({ success: false, message: "Error with finding user by id", error })
// 	}

// })

