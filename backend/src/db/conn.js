import mongoose from 'mongoose'
const connectDb = async () => {
	try {
		const dbconnection = await mongoose.connect('mongodb://127.0.0.1/e_commerce_new')
		console.log(`\n Database connected !! DB HOST: ${dbconnection.connection.host}`);

	} catch (error) {
		console.log("MONGODB connection FAILED ", error);
		process.exit(1)
	}
}

export default connectDb

