
import Coupon from "../models/Coupon.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAllDocuments,
} from "./handler.js";



 
//@ CREATE ALL Coupon
//@ ROUTES => POST => api/v/Coupon
//@ ACCESS => ADMIN
export const createCoupon = createOne(Coupon);

//@ GET ALL Coupon
//@ ROUTES => GET => api/v/Coupon
//@ ACCESS => ADMIN

export const getAllCoupon = getAllDocuments(Coupon);
//@ GET SPECIFIC Coupon
//@ ROUTES => GET  => api/v/Coupon
//@ ACCESS => ADMIN

export const getCoupon = getOne(Coupon);
//@ UPDATE SPECIFIC Coupon
//@ ROUTES => PUT  => api/v/category/
//@ ACCESS => ADMIN

export const updateCoupon = updateOne(Coupon);
//@ DELETE  Coupon
//@ ROUTES => DELETE => api/v/Coupon/:id
//@ ACCESS => ADMIN
export const deleteCoupon = deleteOne(Coupon);
