import express, { Router } from "express";
import { addProductController, adminAllProducts, allProducts, createProductReview, deteleProductByIdController, getProductByIdController, productRatingController, updateProductController, updateProductFeatured } from "../controllers/product.controllers.js";
import { adminAuth, verifyToken } from "../middleware/auth.middleware.js";



const router = express.Router()
// user 
router.post('/product', verifyToken, adminAuth, addProductController)
// router.post('/product', upload.single("productImage"), addProductController)
router.get('/products', allProducts)
router.get('/products/:id', getProductByIdController)
router.put('/products/review', verifyToken, createProductReview)

// admin 
router.get('/admin/products', verifyToken, adminAuth, adminAllProducts)
router.delete('/products/:id', verifyToken, adminAuth, deteleProductByIdController)
router.put('/products/:id', verifyToken, adminAuth, updateProductController)
router.patch('/products/featured', verifyToken, adminAuth, updateProductFeatured)


router.put('/products/reviews', productRatingController)
// router.post('/products/reviews', reviewsController)





export default router