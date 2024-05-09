
import Product from "../models/product.model.js"
import User from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const allProducts = asyncHandler(async (req, res) => {
	const products = await Product.find()
	res.status(200).json({
		products,
	})
})

export const adminAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find()
	const totalProduct = await Product.countDocuments()
	res.status(200).json({
		products,
		totalProduct
	})
})


// export const allProducts = asyncHandler(async (req, res) => {
// 	const { category, color, price, sizes, minPrice, maxPrice, countInStock, sort, pageNumber, pageSize } = req.query
// 	pageSize = pageSize || 10

// 	// const query = await Product.find().populate("category")
// 	// if (category) {
// 	// 	const existCategory = await Category.findOne(name: category)
// 	// 	if (existCategory) {
// 	// 		query = query.where("category").equals(existCategory._id)
// 	// 	}
// 	// }

// 	let query = await Product.find()
// 	if (category) {
// 		// const categorySet = new Set(category);
// 		// query = query.where("category").equals(categorySet)
// 		query = query.where("category").equals(category)
// 	} else {
// 		return { content: [], currentPage: 1, totalPages: 0 }
// 	}

// 	if (color) {
// 		const colorSet = new Set(color.splite(",").map(color => color.trim().tpLowercase()));
// 		const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
// 		query = query.where("color").regex(colorRegex)
// 	}

// 	if (sizes) {
// 		const sizesSet = new Set(sizes);
// 		query = query.where("sizes.name").in([...sizesSet])
// 	}

// 	if (minPrice && maxPrice) {
// 		query = query.where("price").gte(minPrice).lte(maxPrice)
// 	}
// 	if (countInStock) {
// 		if (countInStock == "in_stock") {
// 			query = query.where("countInStock").gte(0)
// 		} else if (countInStock == "out_stock") {
// 			query = query.where("countInStock").gte(1)
// 		}
// 	}

// 	if (sort) {
// 		const sortDirection = sort === "proce_hight" ? -1 : 1;
// 		query = query.sort(price.sortDirection)
// 	}

// 	const totaleProducts = await Product.countDocuments(query)
// 	const skip = (pageNumber - 1) * pageSize;
// 	query = query.skip(skip).limit(pageSize);
// 	const products = await query.exce()

// 	const totalPages = Math.ceil(totaleProducts / pageSize)

// 	return { content: products, currentPage: pageNumber, totalPages }
// 	res.status(200).json({
// 		products: query,
// 		count: totaleProduct
// 	})
// })

// working
/// get products 
// export const allProducts = asyncHandler(async (req, res) => {
// 	try {
// 		// color, name, category etc
// 		const queryObj = { ...req.query }
// 		const removeFields = ["page", "sort", "limit", "fields"]
// 		removeFields.forEach(el => delete queryObj[el])
// 		console.log(queryObj);
// 		// const products = await Product.find(queryObj)

// 		// price 
// 		let queryStr = JSON.stringify(queryObj)
// 		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
// 		// console.log(JSON.parse(queryStr));
// 		// let products = await Product.find(JSON.parse(queryStr))
// 		let query = Product.find(JSON.parse(queryStr))
// 		// console.log(query);



// 		// sorting 
// 		if (req.query.sort) {
// 			const sortBy = req.query.sort.split(",").join(" ");
// 			query = query.sort(sortBy)
// 		} else {
// 			query = query.sort('createdAt')

// 		}
// 		// fields
// 		if (req.query.fields) {
// 			const fields = req.query.fields.split(",").join(" ");
// 			query = query.select(fields)
// 		} else {
// 			query = query.select('-__v')
// 		}


// 		// pagination 
// 		const page = req.query.page;
// 		const limit = req.query.limit;
// 		const skip = (page - 1) * limit;
// 		query = query.skip(skip).limit(limit)
// 		if (req.query.page) {
// 			const productCount = await Product.countDocuments()
// 			if (skip >= productCount) throw new Error("This page is not exist")
// 		}
// 		console.log(page, limit, skip);



// 		let products = await query;

// 		// const products = await Product.find()
// 		res.status(200).json({
// 			products
// 		})

// 	} catch (error) {
// 		return res.status(500).json({
// 			message: "Something wrong with get all products",
// 			error
// 		})

// 	}
// })



// add product
export const addProductController = asyncHandler(async (req, res) => {
	try {
		req.body.user = req.user
		console.log("Add product ", req.body.user);
		const productdata = await Product(req.body)
		console.log("product ", productdata);
		const product = await productdata.save()

		res.status(201).json({
			success: true,
			message: "Product created successfully",
			product
		})
	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong",
			error
		})

	}

})


// get product by id
export const getProductByIdController = asyncHandler(async (req, res) => {
	try {
		// const productById = await Product.findOne({ _id: req.params.id })
		const productById = await Product.findById(req.params.id)

		if (productById) {
			res.status(200).json({
				success: true,
				message: "Successfully",
				product: productById
			})
			return;
		}
		res.status(200).json({
			success: false,
			message: "Product not found",
		})

	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong"
		})

	}

})


// delete product by id 
export const deteleProductByIdController = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		// const user = await User.findById(req.params.id)
		console.log(product);
		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" })
		}
		// await deleteOnCloudinary(product?.productImage?.public_id)
		// await cloudinary.v2.uploader.upload.destroy(product.productImage.url)

		const productdata = await Product.findByIdAndDelete(req.params.id)
		if (productdata) {
			return res.status(200).json({ success: true, message: "Product deleted successfully" })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong product not deleted" })
	}
}

// update
// update 
export const updateProductController = async (req, res) => {
	try {
		// const updateProduct = await Product.updateOne({ _id: req.params.id }, { $set: req.body })

		const product = await Product.findById(req.params.id)

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Update not found",
			})
		}
		const data = await Product.findByIdAndUpdate(product, req.body, { new: true })

		if (data) {
			return res.status(200).json({
				success: true,
				message: "Product updated successfully",
				data
			})
		}
	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong"
		})

	}

}


export const updateProductFeatured = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		console.log(product);
		if (product) {
			res.status(200).json({
				success: true,
				product
			})

		}


	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong"
		})

	}

}

// rating 

export const productRatingController = async (req, res) => {
	const { _id } = req.user
	const { rating, comment, productId } = req.body
	console.log("productId", productId)
	const product = await Product.findById(productId)
	const alreadyRated = product.reviews.find((userId) => userId.user.toString() == _id.toString())
	console.log("alreadyRated", alreadyRated)

	if (alreadyRated) {
		const uodateRating = await Product.updateOne(
			{
				reviews: { $elemMatch: alreadyRated },

			},
			{
				$set: { "rating": rating, "comment": comment },

			},
			{
				new: true
			}

		)
	} else {
		const rateProduct = await Product.findByIdAndUpdate(
			productId,
			{
				$push: {
					reviews: {
						rating: rating,
						comment: comment,
						user: _id,
					}
				}
			},
			{
				new: true
			}
		)
	}

	res.json({
		id: _id
	})


}


export const createProductReview = async (req, res) => {
	try {
		const { rating, comment, productId } = req.body

		const review = {
			user: req.user._id,
			name: req.user.username,
			rating,
			comment
		}

		const product = await Product.findById(productId)
		const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id)

		if (isReviewed) {
			product.reviews.forEach((rev) => {
				if (rev.user.toString() === req.user._id.toString()) {
					(rev.rating == rating), (rev.comment == comment)
				}
			});
		} else {
			product.reviews.push(review)
			product.numReviews = product.reviews.length
		}
		let avg = 0;
		product.ratings = product.reviews.forEach((rev) => {
			avg = avg + rev.rating
		}) / product.reviews.length;
		const reviewed = await product.save({ validateBeforeSave: false });
		res.status(201).json(
			{
				success: true,
				message: "Rating Successfull",
				reviewed
			}
		);
	} catch (error) {
		res.status(201).json(
			{
				success: false,
				message: "Sometging wrong with review",
				error,
			}
		);

	}

}

// create review
// export const productRatingController = async (req, res) => {
// 	try {
// 		// const productById = await Product.findById(req.params.id)

// 		// const user = req.user?._id
// 		const { rating, comment, productId } = req.body;
// 		// const user = await User.findById(req.user?._id)

// 		const review = {
// 			// userId: user,
// 			userId: req.user._id,
// 			name: req.user.username,
// 			rating: Number(rating),
// 			comment,
// 		};
// 		console.log(review);
// 		const product = await Product.findById(productId);
// 		const alreadyRated = product.reviews.find((u) => u.userId.toString() === req.user._id.toString())
// 		// const userId = req.user?._id
// 		if (alreadyRated) {
// 			product.reviews.forEach((review) => {
// 				if (review.userId.toString() === req.user._id.toString()) {
// 					review.rating = rating;
// 					review.comment = comment;
// 				}
// 			})

// 		} else {
// 			product.reviews.push(review)
// 			product.numReviews = product.reviews.length
// 		}

// 		// calculate total ratings
// 		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
// 		await product.save({ validateBeforeSave: false })
// 		return res.status(201).json(
// 			{
// 				success: true,
// 				product
// 			}
// 		);

// 	} catch (error) {
// 		res.status(400).json({ message: error.message });

// 	}
// }

// // get review
// export const getRatingController = async (req, res) => {
// 	const product = await Product.findById(req.query.id);
// 	return res.status(201).json(
// 		{
// 			success: true,
// 			reviews: product.reviews
// 		}
// 	);
// }