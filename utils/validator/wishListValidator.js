import { check } from "express-validator";
import validator from "../../middleware/validator.js";
import Product from "../../models/Product.js";
import createError from "../errors.js";

export const createWishListValidator = [
  check("productId").isMongoId()
    .notEmpty()
    .withMessage("productId is name required ")
        .custom(async(val, { req }) => { 
            const product = await Product.findById(val);
            if (!product) {
                return Promise.reject(new createError ('No Product Match This Id'))
            }
        
        }),
  validator,
];