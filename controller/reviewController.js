import Review from "../models/Review.js";

import { deleteOne, updateOne, createOne,getOne,getAllDocuments } from "./handler.js";

//create filter object
export const createFilterObj = (req, res, next) => {
  
  let filterObj = {};
  if (req.params.productId) filterObj = { product: req.params.productId };
  req.filterObj = filterObj;
  next();
};

// Nested route
export const setProductToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if(!req.body.user) req.body.user = req.user._id;
  next();
};

//@ CREATE ALL Review
//@ ROUTES => POST => api/v/review
//@ ACCESS => ADMIN
export const createReview = createOne(Review);

//@ GET ALL Review
//@ ROUTES => GET => api/v/Review
//@ ACCESS => USERS

export const getAllReview = getAllDocuments(Review)
//@ GET SPECIFIC Review
//@ ROUTES => GET  => api/v/review
//@ ACCESS => USERS

export const getReview = getOne(Review)
//@ UPDATE SPECIFIC Review
//@ ROUTES => PUT  => api/v/category/
//@ ACCESS => ADMIN

export const updateReview = updateOne(Review)
//@ DELETE  Review
//@ ROUTES => DELETE => api/v/Review/:id
//@ ACCESS => ADMIN
export const deleteReview = deleteOne(Review);

   