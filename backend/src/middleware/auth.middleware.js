import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


export const verifyToken = asyncHandler(async (req, res, next) => {
	try {
		// let token = req.headers["authorization"]
		// let { token } = req.cookies
		let accessToken = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
		console.log("accessToken middlware", accessToken);

		if (accessToken) {
			// token = token.split(' ')[1]
			const decodeToken = jwt.verify(accessToken, process.env.JWT_SECRET)
			console.log("decodeToken ", decodeToken);
			const user = await User.findById(decodeToken?._id)
			req.user = user
			// console.log("verifyToken ", req.user);
			return next()
		} else {
			return res.status(400).json({ success: false, message: "Please provide token" })
		}
	} catch (error) {
		res.status(201).json({ success: false, message: "Something went wrong please try after sometime" })

	}
})


// export const verifyToken = async (req, res, next) => {
// 	try {
// 		const token = req?.cookies
// 		const decodedToken = jwt.verify(JSON.stringify(token), process.env.JWT_SECRET);
// 		const userId = decodedToken._id;
// 		const user = await User.findById({ _id: userId });
// 		if (user) {
// 			req.user = user
// 		} else {
// 			res.status(401).json({ message: "user not found" });
// 		}
// 		next();
// 	} catch (error) {
// 		console.log(error.message);
// 		res.status(401).json({ error: "failed to authenticate" });
// 	}
// };


// export const adminAuth = (req, res, next) => {
// 	try {
// 		console.log("adminAuth", req.user);
// 		// if (req.user && req.user.role === 'admin') {
// 		if (req.user && req.user?.isAdmin == "admin") {
// 			return next();
// 		} else {
// 			return res.status(401).json({ success: false, message: "Unauthorized" })

// 		}
// 	} catch (error) {
// 		res.status(501).json({ success: false, message: "Your are not able to get this page" })

// 	}
// }

export const adminAuth = async (req, res, next) => {
	try {
		const user = await User.findById(req.user?._id)
		console.log("User ID : ", user);
		if (user?.isAdmin != "admin") {
			return res.status(400).send({
				success: false,
				message: "Unauthorized user !",
			}
			)

		} else {
			return next()
		}

	} catch (error) {
		res.status(501).send({
			success: false,
			message: "Error in middleware",
			error,
		}
		)

	}
}

