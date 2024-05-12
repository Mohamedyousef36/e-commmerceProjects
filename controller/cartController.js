import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import createError from "../utils/errors.js";
import Coupon from "../models/Coupon.js";

const calcTotalPrice = (cart) => {
  let totalCartPrice = 0;
  cart.cartItem.forEach((item) => {
    totalCartPrice += (item.quantity * item.price);
   
    cart.priceAfterDiscount = undefined;
  });
  cart.totalPrice = totalCartPrice;
  console.log(cart)



  return totalCartPrice;
};

export const addProductToCart = asyncHandler(async (req, res, next) => {

  const { productId, color, quantity } = req.body;
  // find product depending on product id
  const product = await Product.findById(productId);
  // find cart depending on user id
  let cart = await Cart.findOne({ user: req.user._id });
      console.log(req.body.color);

  // No cart found then create one
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItem: {
        product: productId,
        price: product.price,
        quantity: req.body.quantity,
        color: req.body.color,
      },
    });
  } else {
    // product exist in cart and update quantity
    const productIndex = cart.cartItem.findIndex(
      (item) =>
        item.product.toString() === req.body.productId &&
        item.color === req.body.color
    );
    // product exist in cart and update quantity

    if (productIndex > -1) {
      const cartItem = cart.cartItem[productIndex];
      cartItem.quantity += req.body.quantity;
      cart.cartItem[productIndex] = cartItem;
    } else {
      // product not exist in cart and push it
      cart.cartItem.push({
        product: productId,
        price: product.price,
        quantity: req.body.quantity,
        color: req.body.color,
      });
    }
  }
   calcTotalPrice(cart);
  await cart.save();

  res.status(201).json({ msg: "success", numberOfCarts: cart.cartItem.length, data: cart });
});

export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }); 
  if (!cart) {
    return next (new createError(`No cart for this user ${req.user._id}`));
  }
  res.status(201).json({ msg: "success", numberOfCarts: cart.cartItem.length, data: cart });
});

export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      // pull automatically check if productId is exist in the cart array or not
      $pull: { cartItem: { _id: req.params.itemId } },
    },

    { new: true }
  );
  calcTotalPrice(cart);
  console.log(cart);
  await cart.save();

  res
    .status(201)
    .json({ msg: "success", numberOfCarts: cart.cartItem.length, data: cart });
});

export const updateProductQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }); 
  if (!cart) {
    return next (new createError(`No cart for this user ${req.user._id}`));
  }
  const cartIndex = cart.cartItem.findIndex(

    (item) => item._id.toString() === req.params.itemId.toString()
  );
console.log(cart.cartItem.product);
console.log(req.params.itemId);
  if (cartIndex > -1) {
    const cartItem = cart.cartItem[cartIndex];
    cartItem.quantity = quantity;
    cart.cartItem[cartIndex] = cartItem;
  } else {
    return next(new createError(`No id match this id ${req.params.itemId}`));
  }
  calcTotalPrice(cart);
  await cart.save();
  res
    .status(201)
    .json({ msg: "success", numberOfCarts: cart.cartItem.length, data: cart });
});

export const applyCoupon = asyncHandler(async (req, res, next) => {
  // Get coupon based on name
  const coupon = await Coupon.findOne({
    name: req.body.name,
    expireDate: { $gt: Date.now() },
  });


 

  if (!coupon) {
    return next(
      new createError(`No Coupon Match This Coupon Please Try Again`)
    );
  }
  // Get logged user cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  const totalPrice = cart.totalPrice;

  const totalPriceAfterDiscount = (
    totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2);
  console.log(coupon.discount);

  cart.priceAfterDiscount = totalPriceAfterDiscount;

  await cart.save();

  res.status(201).json({
    msg: "success",
    numberOfCarts: cart.cartItem.length,
    data: cart,
  });
});
