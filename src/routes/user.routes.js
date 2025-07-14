import express from "express";
import { loginUser, registerUser, uploadBill , searchBills} from "../controllers/user.controllers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/billUpload", asyncHandler(uploadBill));
router.post("/search", asyncHandler(searchBills));

export default router;