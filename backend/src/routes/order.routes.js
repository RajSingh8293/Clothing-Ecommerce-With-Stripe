import express, { Router } from "express";
import { OrderByIdController, OrderList, createOrderController, deleteOrders, myOrders, orderById, updateOrderStatus } from "../controllers/order.controllers.js";
import { adminAuth, verifyToken } from "../middleware/auth.middleware.js";

const router = Router()



router.post('/order/new', verifyToken, createOrderController)
router.get('/orders/me', verifyToken, myOrders)
router.get('/orders/:id', verifyToken, OrderByIdController)

router.get('/admin/orders', verifyToken, adminAuth, OrderList)
router.delete('/admin/order/:id', verifyToken, adminAuth, deleteOrders)
// router.put('/admin/order/:id', verifyToken, adminAuth, updateOrders)
router.put('/admin/order-status', verifyToken, adminAuth, updateOrderStatus)
router.get('/admin/order', verifyToken, adminAuth, orderById)


export default router