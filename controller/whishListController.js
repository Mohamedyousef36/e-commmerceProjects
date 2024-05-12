import User from "../models/User.js"
import asyncHandler from "express-async-handler";

export const addProductToWishList = asyncHandler(async(req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      // addToSet automatically check if productId is exist in the wishList array or not
      $addToSet: { wishList: req.body.productId },
    },

    { new: true }
  );
  res.status(201).json({
    numberOfLikedProduct: user.wishList.length,
    data: user.wishList
  });
}); 

export const removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      // addToSet automatically check if productId is exist in the wishList array or not
      $pull: {wishList: req.params.productId },
    },

    { new: true }
  );

 res.status(201).json({
   numberOfLikedProduct: user.wishList.length,
   data: user.wishList,
 });}); 

export const getWishListOfLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishList _id");
 res.status(201).json({
   numberOfLikedProduct: user.wishList.length,
   data: user.wishList,
 });
})
