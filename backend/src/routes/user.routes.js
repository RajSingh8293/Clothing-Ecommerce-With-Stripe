import express, { Router } from "express";
import { admindeleteUserById, allUsers, changeUserPassword, changeUserStatus, deleteUserById, loginUser, logoutUser, registerUser, updateUserProfile, singleUser, userProfile, adminUpdateUsersDetail } from "../controllers/user.controllers.js";
import { adminAuth, verifyToken } from "../middleware/auth.middleware.js";
const router = Router()


// user 
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)


router.get('/users/me', verifyToken, userProfile)
router.put('/users/update', verifyToken, updateUserProfile)
router.delete('/users/delete', verifyToken, deleteUserById)
router.put('/users/change-password', verifyToken, changeUserPassword)










// router.delete('/users/delete', verifyToken, deleteUserById)
// admin 
router.get('/admin/users', verifyToken, allUsers)
// router.get('/users/:id', verifyToken, userById)
router.put('/admin/users-status', verifyToken, adminAuth, changeUserStatus)
router.get('/admin/users/:id', verifyToken, adminAuth, singleUser)
router.put('/admin/users/:id', verifyToken, adminAuth, adminUpdateUsersDetail)
router.delete('/admin/users/:id', verifyToken, adminAuth, admindeleteUserById)

// adminUpdateUsersDetail



export default router
