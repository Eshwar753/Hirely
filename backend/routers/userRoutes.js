import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from"../controller/userController.js";
import { protect, recruiter } from '../middleware/authMiddleware.js';

router.route("/").get(protect, recruiter, getUsers).post(registerUser);
router.post("/logout", logoutUser) 
router.post("/auth", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").get(protect,recruiter,getUserById).put(protect,recruiter,updateUser).delete(protect,recruiter,deleteUser)


export default router;