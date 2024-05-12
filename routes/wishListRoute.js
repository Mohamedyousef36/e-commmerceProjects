import express from "express";
import { verifyToken , verifyRole} from "../controller/authController.js";

import {
  addProductToWishList,
  removeProductFromWishList,
  getWishListOfLoggedUser
} from "../controller/whishListController.js";
import { createWishListValidator } from "../utils/validator/wishListValidator.js";

const router = express.Router();


router.use(verifyToken);
router.post("/",  createWishListValidator, addProductToWishList);
router.delete("/:productId",  removeProductFromWishList);
router.get("/",  getWishListOfLoggedUser);


export default router;
