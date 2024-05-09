import Order from "../models/order.model.js"


// address 
// 	"shippingInfo": {
// 		"firstname":"raj",
// 		"lastname":"singh",
// 		"address": "212 Los Angeles",
// 		"country": "India",
// 		"state": "delhi",
// 		"city": "delhi",
// 		"zipcode": 262622,
// 		"phone": 1234567890,
// 	}


// get all orders

// get all orders admin
export const OrderList = async (req, res) => {

	// const orders = await Order.find().populate("userId", "username")
	// const orders = await Order.find().populate("user")
	const orders = await Order.find()

	let totalAmount = 0;

	orders.forEach(order => {
		totalAmount += order.totalPrice
	});

	if (!orders) {
		return res.status(402).json({
			success: false,
			message: "Orders is not found"
		})

	}
	return res.status(200).json({
		success: true,
		orders,
		totalAmount

	})

}

// get create order
export const createOrderController = async (req, res) => {

	// const userid = await User.findById(req.user?._id)

	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = req.body;
	const order = await Order({
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paidAt: Date.now(),
		user: req.user?._id
		// user: userid
	}).populate({ path: "orderItems", populate: 'product' })
	const orderdata = await order.save()

	if (!orderdata) {
		return res.status(402).json({
			success: false,
			message: "Orders is not found"
		})

	}
	return res.status(200).json({
		success: true,
		order: orderdata

	})

}

// get single order user
export const OrderByIdController = async (req, res) => {

	try {
		// const order = await Order.findOne(req.params.id)
		const order = await Order.findById(req.params.id)
			.populate("user", "username email")
		// .populate({ path: "orderItems", populate: 'product' })
		// .populate("orderItems")
		console.log(order);
		if (!order) {
			return res.status(402).json({
				success: false,
				message: "Order is not found"
			})

		}
		return res.status(200).json({
			success: true,
			order

		})
	} catch (error) {
		return res.status(200).json({
			success: false,
			message: "Something wrong with getting order data",
			error

		})

	}

}


// get logged in user's all orders
export const myOrders = async (req, res) => {

	try {
		// const orders = await Order.find(req.user?._id)
		const orders = await Order.find({ user: req.user?._id })
		// console.log(orders);

		res.status(200).json({
			success: true,
			orders

		})
	} catch (error) {
		return res.status(200).json({
			success: false,
			message: "Something wrong with getting order data",
			error

		})

	}

}





// get logged in user order
export const deleteOrders = async (req, res) => {

	try {
		const order = await Order.findById(req.params.id)
		const deleteOrder = await Order.findByIdAndDelete(req.params.id)
		if (!deleteOrder) {

			res.status(402).json({
				success: false,
				message: "Order not found with this id",
			})
		}
		res.status(200).json({
			success: true,
			message: "Deleted order succefully",
			order: deleteOrder
		})
	} catch (error) {
		return res.status(200).json({
			success: false,
			message: "Something wrong with getting order data",
			error
		})

	}

}



export const updateOrderStatus = async (req, res) => {

	try {
		const { orderStatus, orderId } = req.body
		const order = await Order.findById(orderId)
		// .populate("userId", "usernam email").populate("Items")
		if (!order) {
			return res.status(402).json({
				success: false,
				message: "Order is not found"
			})
		}
		console.log("order : ", order);

		const updateOrder = await Order.findByIdAndUpdate(
			order,
			{ $set: { orderStatus } },
			{ new: true })
		console.log("updateOrder : ", updateOrder);

		res.status(200).json({
			success: true,
			message: "Order status updated successfully",
			order: updateOrder

		})
	} catch (error) {
		return res.status(200).json({
			success: false,
			message: "Something wrong with getting order data",
			error

		})

	}


}
export const orderById = async (req, res) => {

	try {
		const { orderId } = req.body
		const order = await Order.findById(orderId)
		if (!order) {
			return res.status(402).json({
				success: false,
				message: "Order is not found"
			})
		}
		console.log("order : ", order);



		res.status(200).json({
			success: true,
			message: "Orders successfully",
			order

		})
	} catch (error) {
		return res.status(200).json({
			success: false,
			message: "Something wrong with getting order data",
			error

		})

	}

}
