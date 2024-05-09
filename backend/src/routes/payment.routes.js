import express, { Router } from "express";

import { processPaymentController, secretStripeKey } from "../controllers/stripe.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/payment/process', verifyToken, processPaymentController)
router.get('/stripeapikey', verifyToken, secretStripeKey)


export default router