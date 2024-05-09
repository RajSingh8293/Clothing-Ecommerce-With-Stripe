import mongoose from 'mongoose'


// *************** orderItemsSchema schema ***************
// const orderItemSchema = mongoose.Schema({
// 	product: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "Product",
// 	},
// 	userId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "User",
// 	},
// 	size: {
// 		type: String,
// 		required: true,
// 	},
// 	price: {
// 		type: Number,
// 		required: true,
// 	},
// 	discountPrice: {
// 		type: Number,
// 		required: true,
// 	},
// 	discount: {
// 		type: Number,
// 		required: true,
// 	},

// 	deleveryDate: {
// 		type: Date,
// 	},
// })

const orderItemSchema = mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
	},
	quantity: {
		type: Number,
		required: true
	},
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema)
export default OrderItem