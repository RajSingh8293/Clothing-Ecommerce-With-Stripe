import mongoose from 'mongoose'

// firstname,
// 	lastname,
// 	email,
// 	phone,
// 	country,
// 	state,
// 	city,
// 	street,
// 	address,
// 	pincode,


// *************** address schema ***************
const addressSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true
	},
	pincode: {
		type: Number,
		required: true
	},

	phone: {
		type: String,
		required: true,
	},
	createdAt: {
		type: date,
		default: Date.now()
	},

})

const Address = mongoose.model("Address", addressSchema)
export default Address