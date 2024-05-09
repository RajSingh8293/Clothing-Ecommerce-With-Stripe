import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

const Reviews = mongoose.model("Reviews", reviewsSchema)
export default Reviews