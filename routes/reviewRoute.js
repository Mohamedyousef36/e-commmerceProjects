import express from 'express'
import { verifyToken, verifyRole } from '../controller/authController.js';
import {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
} from "../utils/validator/reviewValidator.js";
import {
  createReview,
  deleteReview,
  getAllReview,
  getReview,
  updateReview,
  createFilterObj,
  setProductToBody
} from "../controller/reviewController.js";

const router = express.Router({ mergeParams: true });

router.get("/:id",getReviewValidator, getReview);
router.get("/", createFilterObj, getAllReview);

// verifyToken, verifyRole

// router.use(verifyToken, verifyRole('admin', 'user'));
router.put("/:id", updateReviewValidator, updateReview);
router.post("/",setProductToBody, createReviewValidator, createReview);
router.delete("/:id", deleteReviewValidator, deleteReview);




export default router