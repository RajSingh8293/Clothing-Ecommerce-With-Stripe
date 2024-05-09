import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true
		},

		// isAdmin: {
		// 	type: Boolean,
		// 	default: false
		// },
		isAdmin: {
			type: String,
			default: "user"
		}
	},
	{ timestamps: true },
)

// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();

// 	this.password = await bcryptjs.hashSync(this.password, 10)
// 	next()
// })

// userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
// 	return await bcryptjs.compareSync(enteredPassword, this.password)
// }

// userSchema.methods.generateAccessToken = function () {
// 	return jwt.sign(
// 		{
// 			_id: this._id,

// 		},
// 		process.env.JWT_SECRET_TOKEN,
// 		{
// 			expiresIn: process.env.JWT_TOKEN_EXPIRY
// 		}
// 	)
// }

const User = mongoose.model('User', userSchema)
export default User




// const userSchema = new Schema({
//     username: {
//         type: String ,
//         required: true
//     },
//     email: {
//         type: String ,
//         required: true
//     },
//     cart: {
//         items:[
//             {
//                productId: {
//                   type: Schema.Types.ObjectId,
//                   ref: 'Product',
//                   required: true
//                },
//                qty:{
//                 type: Number ,
//                 required: true
//                }
//             }
//         ]
//     }
// })