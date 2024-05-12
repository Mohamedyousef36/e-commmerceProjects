import User from "../models/User.js"
import asyncHandler from "express-async-handler";

export const addAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      // addToSet automatically check if addresses is exist in the addresses array or not
      $addToSet: { addresses: req.body },
    },

    { new: true }
  );
  res.status(201).json({ data: user.addresses });
}); 

export const removeAddresses = asyncHandler(async (req, res, next) => { 
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      // addToSet automatically check if productId is exist in the addresses array or not
      $pull: { addresses: { _id: req.params.addressId } },
    },

    { new: true }
  );
    console.log(user.addresses);

  res.status(201).json({ data:user.addresses});
}); 

export const getAddressesOfLoggedUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("addresses");
    res.status(201).json({data:user.addresses})

})
