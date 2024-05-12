import sharp from "sharp";
import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";
import {uploadSingleImg} from "../middleware/uploadImage.js";
import { deleteOne, updateOne, createOne,getOne,getAllDocuments } from "./handler.js";


//@ CREATE CATEGORY IMAGE FUNCTION
export const createBrandImg = uploadSingleImg("image");
//@ CREATE  IMAGE PROCESSING FUNCTION
export const resizeImage = asyncHandler(async (req, res, next) => {
    const fileName = `brands${Math.random(100)}-${Date.now()}.jpeg`;
    if (req.file) {
        await sharp(req.file.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`uploads/brands/${fileName}`);
        req.body.image = fileName;
        console.log(fileName)
}

    next();
 
})
//@ CREATE ALL Brand
//@ ROUTES => POST => api/v/brand
//@ ACCESS => ADMIN
export const createBrand = createOne(Brand);

//@ GET ALL Brand
//@ ROUTES => GET => api/v/brand
//@ ACCESS => USERS

export const getAllBrand = getAllDocuments(Brand)
//@ GET SPECIFIC Brand
//@ ROUTES => GET  => api/v/brand
//@ ACCESS => USERS

export const getBrand = getOne(Brand)
//@ UPDATE SPECIFIC Brand
//@ ROUTES => PUT  => api/v/category/
//@ ACCESS => ADMIN

export const updateBrand = updateOne(Brand)
//@ DELETE  Brand
//@ ROUTES => DELETE => api/v/Brand/:id
//@ ACCESS => ADMIN
export const deleteBrand = deleteOne(Brand);

   