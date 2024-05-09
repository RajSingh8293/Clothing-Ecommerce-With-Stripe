import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import connectDb from './db/conn.js'
import { data } from './data/productsData.js'
const app = express()
const port = process.env.PORT || 3000
import dotenv from 'dotenv'
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'
// import { errorHandler, notFound } from './utils/notFound.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
dotenv.config({
	path: "./.env"
})

// app.use("/", (req, res) => {
// 	res.send("Hello")
// })

const corsOptions = {
	origin: "http://localhost:5175",
	credentials: true
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static("public"));


// routes 
//  http://localhost:3434/api/v1/register
app.use("/api/v1", userRouter)

app.use("/api/v1", productRouter)
app.use("/api/v1", orderRouter)
app.use("/api/v1", paymentRouter)

// app.use(errorHandler)
// app.use(notFound)


connectDb().then(() => {
	app.listen(port, () => {
		console.log("Server connected on port : ", port);
	})
}).catch((error) => {
	console.log("Server Error : ", error);

})