import express from 'express'
import { verifyToken, verifyRole } from '../controller/authController.js';

import {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} from '../utils/validator/productValidator.js'
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    uploadProductImages,
    resizeImage
} from '../controller/productController.js';
import reviewRoute from './reviewRoute.js'
const router = express.Router();

//## => Nested Route
router.use("/:productId/review", reviewRoute);

//## => GET => Specific Product
//## => ACCESS => USERS
router.get('/:id', getProductValidator, getProduct);

//## => GET => All Product
//## => ACCESS => USERS
router.get("/", getAllProduct);

//## => verifyToken && verifyRole 
//## => GET => Specific Product
//## => ACCESS => ADMIN
router.delete('/:id', verifyToken, verifyRole('admin'),
 deleteProductValidator, deleteProduct);

//## =>verifyToken && verifyRole 
//## => GET => Specific Product
//## => ACCESS => ADMIN && MANAGER
router.use( uploadProductImages, resizeImage)
router.post('/',createProductValidator, createProduct);
router.put('/:id', updateProductValidator, updateProduct);

//## => Export Route

export default router