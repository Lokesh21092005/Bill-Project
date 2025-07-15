import express from "express";
import { loginUser, registerUser, uploadBill , searchBills , getPendingBills } from "../controllers/user.controllers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/billUpload", asyncHandler(uploadBill));
router.post("/search", asyncHandler(searchBills));
router.get("/pending", asyncHandler(getPendingBills));
router.post('/', asyncHandler(uploadBill));                 // create
router.put('/:id/complete', asyncHandler(completeBill));    // complete
router.get('/pending', asyncHandler(getPendingBills));      // get pending
router.post('/search', asyncHandler(searchBills));  
export default router;