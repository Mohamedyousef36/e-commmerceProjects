import express from 'express'
import {verifyToken,verifyRole} from '../controller/authController.js';
import {
    getBrandValidator,
    createBrandValidator, 
    updateBrandValidator,
    deleteBrandValidator
} from '../utils/validator/brandValidator.js'
import {
    createBrand,
    deleteBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    resizeImage,
    createBrandImg
} from '../controller/brandController.js';

const router = express.Router();

router.get('/:id', getBrandValidator, getBrand);
router.get('/', getAllBrand);
router.delete('/:id', verifyToken, verifyRole('admin'),deleteBrandValidator, deleteBrand);

// verifyToken, verifyRole

// router.use(verifyToken, verifyRole('admin', 'manager'));
router.patch('/:id',createBrandImg, resizeImage, updateBrandValidator, updateBrand);
router.post('/',createBrandImg, resizeImage, createBrandValidator, createBrand);


export default router