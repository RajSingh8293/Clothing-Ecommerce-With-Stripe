import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import { asyncHandler } from '../utils/asyncHandler.js'
import dotenv from 'dotenv'
dotenv.config({
	path: "./.env"
})


// console.log("Secret Key", process.env.STRIPE_SECRET_KEY);
// console.log("Public Key", process.env.STRIPE_PUBLIC_KEY);
export const processPaymentController = async (req, res) => {

	try {
		const myPayment = await stripe.paymentIntents.create({
			amount: req.body.amount,
			currency: "inr",
			description: "for e-comerce project",
			metadata: {
				company: "Test Ecommerce"
			}
		})
		res.status(200).json({
			success: true,
			client_secret: myPayment.client_secret,
			meassage: "Payment succefully"
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			meassage: "Payment failed"
		})
	}
}

export const secretStripeKey = async (req, res) => {
	return res.status(200).send({
		// stripeApiKey: `${process.env.STRIPE_PUBLIC_KEY}`
		stripeApiKey: process.env.STRIPE_PUBLIC_KEY
	})
}

// export const processPaymentController = async (req, res) => {
// 	try {
// 		await stripe.charges.create({
// 			source: req.body.tokenId,
// 			amount: req.body.amount,
// 			currency: "usd",

// 		},
// 			(stripeErr, stripeRes) => {
// 				if (stripeErr) {
// 					res.status(500).json(stripeErr)
// 				} else {
// 					res.status(200).json(stripeRes)
// 				}
// 			}
// 		);


// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			meassage: "Payment failed",
// 			error
// 		})

// 	}

// }

// export const secretStripeKey = asyncHandler(async (req, res) => {
// 	res.status(200).json({
// 		// stripeApiKey: `${process.env.STRIPE_PUBLIC_KEY}`
// 		stripeApiKey: process.env.STRIPE_PUBLIC_KEY
// 	})
// })



// export const processPaymentController = () => {

// 	app.post("/create-payment-intent", async (req, res) => {
// 		const { amount } = req.body;

// 		// Create a PaymentIntent with the order amount and currency
// 		const paymentIntent = await stripe.paymentIntents.create({
// 			amount: amount,
// 			currency: "usd",
// 			// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
// 			automatic_payment_methods: {
// 				enabled: true,
// 			},
// 		});

// 		res.send({
// 			clientSecret: paymentIntent.client_secret,
// 		});
// 	});
// }



// export const secretStripeKey = asyncHandler(async (req, res) => {
// 	res.status(200).json({
// 		// stripeApiKey: `${process.env.STRIPE_PUBLIC_KEY}`
// 		stripeApiKey: process.env.STRIPE_PUBLIC_KEY
// 	})
// })

