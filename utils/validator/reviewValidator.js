import { check } from "express-validator";
import validator from "../../middleware/validator.js";
import Review from "../../models/Review.js";
import createError from "../errors.js";

export const createReviewValidator = [
  check("title").optional().isString(),
  check("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("value must between 1 to 5"),
  check("user").isMongoId().withMessage("invalid user Review ID"),
  check("product")
    .isMongoId()
    .withMessage("invalid product Review ID")
    // check if user make a review on this entity before
    .custom(async (val, { req }) => {
      //buge
      const review = await Review.findOne(
        { user: req.user._id },
        { product: req.body.product }
      );
      if (review) {
        return Promise.reject(new createError("you make review before"));
      }
    }),
  validator,
];
export const getReviewValidator = [
  check("id").isMongoId().withMessage("invalid Review ID"),
  validator,
];

export const updateReviewValidator = [
  check('id').isMongoId().withMessage('invalid id').custom(async (val, { req }) => {
    const review = await Review.findById(val);
    if (!review) {
      return Promise.reject(new createError("there is no review "));
    }
    
    if (review.user._id.toString() !== req.user._id.toString()) {
      return Promise.reject(
        new createError("you did not allowed to update this  review ,403")
      );
    }
  }),
  check("title").optional().isString().withMessage("invalid Review title"),
  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("value must between 1 to 5"),
  validator,
];
export const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid id")
    .custom(async (val, { req }) => {
      if (req.user.role == 'user') {
         const review = await Review.findById(val);
         if (!review) {
           return Promise.reject(new createError("there is no review "));
         }
        if (review.user._id.toString() !== req.user._id.toString()) {
           return Promise.reject(
             new createError("you did not allowed to delete this  review ")
           );
         }
      }
      return true;
    }),
  validator,
];
