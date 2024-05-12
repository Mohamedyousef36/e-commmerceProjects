import {uploadSingleImg} from '../middleware/uploadImage.js'
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAllDocuments
} from "./handler.js";
import Category from "../models/Category.js";

// const multerStorage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, 'uploads/categories')
    
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split("/")[1];
//         console.log(ext);
//         const fileName = `cate${Math.random(100)}-${Date.now()}.${ext}`;
//         cb(null,fileName)
//     }
// });

//@ CREATE CATEGORY IMAGE FUNCTION
export const createCateImg = uploadSingleImg("image");

//@ CREATE  IMAGE PROCESSING FUNCTION
export const resizeImage = asyncHandler (async (req, res, next) => {
    const fileName = `category${Math.random(100)}-${Date.now()}.jpeg`;
    if (req.file) {
        await sharp(req.file.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`uploads/categories/${fileName}`);
        req.body.image = fileName;
}
    
    next();
})

//@ CREATE ALL CATEGORY
//@ ROUTES => POST => api/v/category
//@ ACCESS => ADMIN
export const createCategory = createOne(Category)

//@ GET ALL CATEGORY
//@ ROUTES => GET => api/v/category
//@ ACCESS => USERS
export const getAllCategory = getAllDocuments(Category)

//@ GET SPECIFIC CATEGORY
//@ ROUTES => GET  => api/v/category/
//@ ACCESS => USERS

export const getCategory = getOne(Category)
//@ UPDATE SPECIFIC CATEGORY
//@ ROUTES => PUT  => api/v/category/
//@ ACCESS => ADMIN

export const updateCategory = updateOne(Category)
//@ DELETE  CATEGORY
//@ ROUTES => DELETE => api/v/category/:id
//@ ACCESS => ADMIN
export const deleteCategory = deleteOne(Category);
