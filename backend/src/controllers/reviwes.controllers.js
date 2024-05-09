import Product from "../models/product.model.js";
import Reviews from "../models/reviews.model.js";
import User from "../models/user.model.js";

export const reviewsController = async (req, res) => {
	const { rating, comment } = req.body;

	const userId = await User.findById(req.user?._id)
	const product = await Product.findById(req.product?._id)

	const review = new Reviews({
		user: userId,
		product: product,
		rating,
		comment,
	})

	// await product.save()
	const saveRatings = await review.save()

	res.status(201).json({
		ratings: saveRatings
	})

}