import mongoose from "mongoose"
// const reviewsSchema = mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	rating: {
// 		type: Number,
// 		required: true,
// 	},
// 	comment: {
// 		type: String,
// 		required: true,
// 	},
// 	userId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: 'User',
// 		required: true,
// 	},
// })




const ProductSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},
		featured: {
			type: Boolean,
			default: false
		},
		image: {
			type: String,
			required: true,
		},
		// image: {
		// 	url: {
		// 		type: String,
		// 		required: true,

		// 	},
		// 	public_id: {
		// 		type: String,
		// 		required: true,
		// 	}
		// },
		title: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},
		category: {
			required: true,
			type: String
		},
		price: {
			type: Number,
			required: true,
			default: 0
		},
		color: {
			type: String,
			required: true,
		},
		// reviews: [reviewsSchema],
		// reviews: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Reviews',
		// 	// required: true,
		// },

		reviews: [{
			name: {
				type: String,
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
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				// required: true,
			},

		}],
		ratings: {
			type: Number,
			default: 0
		},
		numReviews: {
			type: Number,
			default: 0
		},
		countInStock: {
			type: Number,
			default: 0,
			required: true
		},
	},
	{
		timestamps: true,
	})

const Product = mongoose.model('Product', ProductSchema)
export default Product