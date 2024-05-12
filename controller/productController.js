import sharp from "sharp";
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import { uploadMultiImage } from "../middleware/uploadImage.js";
import { deleteOne, updateOne, createOne, getAllDocuments, getOne } from "./handler.js";

//## => Create Image
export const uploadProductImages = uploadMultiImage([
    { name: "imageCover", maxCount: 1 },
    { name: "image", maxCount: 6 }])

//## => Create  Image Processing Function 
export const resizeImage = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
            const fileImageName = `product${Math.random(100)}-${Date.now()}_cover_img.jpeg`;
            await sharp(req.files.imageCover[0].buffer)
                .resize(1200, 1300).
                toFormat("jpeg").jpeg({ quality: 95 }).
                toFile(`uploads/products/${fileImageName}`);
            req.body.imageCover = fileImageName;


        }
        if (req.files.image) {
            req.body.image = [];
            await Promise.all(req.files.image.map(asyncHandler(async (img) => {
                const fileImageName = `product${Math.random(100)}-${Date.now()}.jpeg`;

                await sharp(req.files.imageCover[0].buffer)
                    .resize(1200, 1300).
                    toFormat("jpeg").jpeg({ quality: 95 }).
                    toFile(`uploads/productImages/${fileImageName}`);
                req.body.image.push(fileImageName);
            })))

        }
        next();

    })


//## => CREATE => Product
//## => ROUTES => POST => api/vi/Product
//## => ACCESS => ADMIN 
export const createProduct = createOne(Product)

//## => GET => All Product
//## => ROUTES => GET => api/vi/Product
//## => ACCESS => USERS
export const getAllProduct = getAllDocuments(Product)


//## => GET => Specific Product
//## => ROUTES => GET  => api/vi/product
//## => ACCESS => USERS

export const getProduct = getOne(Product, 'reviews');

//## => UPDATE => Specific Product
//## => ROUTES => PUT => api/vi/product
//## => ACCESS => ADMIN

export const updateProduct = updateOne(Product)
//## => DELETE => Product
//## => ROUTES => DELETE => api/vi/product/:id
//## => ACCESS => ADMIN
export const deleteProduct = deleteOne(Product);