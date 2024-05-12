import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Cart from "../models/Cart.js";
import createError from "../utils/errors.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { getAllDocuments, getOne } from "./handler.js";
import dotenv from "dotenv";
dotenv.config();



export const cashingOrder = asyncHandler(async (req, res, next) => {
  // maintenance later and make it set by admin
  const textPrice = 0;
  const shippingPrice = 0;
  // get cart by cart id
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new createError(`No cart founded`, 404));
  }
  // get order price by cart price ' check if there is coupon'
  let OrderPrice = 0;
  if (cart.priceAfterDiscount) {
    OrderPrice = cart.priceAfterDiscount;
  } else {
    OrderPrice = cart.totalPrice;
  }
  const totalOrderPrice = OrderPrice + textPrice + shippingPrice;
  // create order with default payment method 'cashing method'
  const order = await Order.create({
    user: req.user._id,
    cartItem: cart.cartItem,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice: totalOrderPrice,
  });
  if (order) {
    // decrement product quantity and increment product sold in product schema
    const bulkOptions = cart.cartItem.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    const product = await Product.bulkWrite(bulkOptions, {});

    // clear the cart of user as is done

    await Cart.findByIdAndDelete(req.params.cartId);
  }
  res.status(201).json({ msg: "success", data: order });
});

export const filterObjForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") {
    req.filterObj = { user: req.user._id };
  }
  next();
});


// get all orders 'admin , logged user'
export const getAllOrders = getAllDocuments(Order);

// get specific orders 'admin , logged user'
export const getOrder = getOne(Order);

// updated status by admin

export const updatedOrderPaidByAdmin = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id });
  order.isPaid = true;
  order.isPaidAt = Date.now();
  await order.save();
  res.status(201).json({ msg: "success", data: order });
});
export const updatedOrderDeliveredByAdmin = asyncHandler(
  async (req, res, next) => {
    const order = await Order.findOne({ _id: req.params.id });
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(201).json({ msg: "success", data: order });
  }
);




// // make a session in payMob
// export const checkOutSession = asyncHandler(async (req,res,next) => {
//   // get cart by cart id
//   const cart = await Cart.findById(req.params.cartId);
//   if (!cart) {
//     return next(new createError(`No cart founded`, 404));
//   }
//   // get order price by cart price ' check if there is coupon'
//   let OrderPrice = 0;
//   if (cart.priceAfterDiscount) {
//     OrderPrice = cart.priceAfterDiscount;
//   } else {
//     OrderPrice = cart.totalPrice;
//   }
//   const totalOrderPrice = OrderPrice + textPrice + shippingPrice;
  
//   // start make a session
//   const myHeaders = new Headers();
//   myHeaders.append(
//     "Authorization",
//     "Token sk_test_626ba4a60a6f9cf4b0bc066ad3de884e93693afd5218ef832e99cbdf76a0fb37"
//   );
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     amount: 10,
//     currency: "EGP",
//     payment_methods: [
//       12,
//       "card",
//       "you can add Integration id directly or your integration name",
//     ],
//     items: [
//       {
//         name: "Item name 1",
//         amount: 10,
//         description: "Watch",
//         quantity: 1,
//       },
//     ],
   
  
//     extras: {
//       ee: 22,
//     },
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("https://accept.paymob.com/v1/intention/", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// })
 