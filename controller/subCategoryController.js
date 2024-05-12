import slugify from "slugify";
import asyncHandler from "express-async-handler";
import SubCategory from "../models/SubCategory.js";
import apiFeature from "../utils/apiFeature.js";
import createError from "../utils/errors.js";
import { deleteOne, updateOne, createOne, getAllDocuments, getOne } from "./handler.js";


export const setCategoryToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
}

export const createFilterObj = (req, res, next) => {
    let filterObj = {};
    if (req.params.categoryId) filterObj = { category: req.params.categoryId };
    req.filterObj = filterObj;
    next() 
}
//@ CREATE ALL SubCategory
//@ ROUTES => POST => api/v/SubCategory
//@ ACCESS => ADMIN
export const createSubCategory = createOne(SubCategory)


//@ GET ALL SubCATEGORY
//@ ROUTES => GET => api/v/subcategory
//@ ACCESS => USERS
export const getAllSubCategory = getAllDocuments(SubCategory)



//@ GET SPECIFIC CATEGORY
//@ ROUTES => GET  => api/v/category/
//@ ACCESS => USERS

export const getSubCategory = getOne(SubCategory)
//@ UPDATE SPECIFIC CATEGORY
//@ ROUTES => PUT  => api/v/category/
//@ ACCESS => ADMIN

export const updateSubCategory = updateOne(SubCategory)
//@ DELETE  SubCATEGORY
//@ ROUTES => DELETE => api/v/Subcategory/:id
//@ ACCESS => ADMIN
export const deleteSubCategory = deleteOne(SubCategory);

