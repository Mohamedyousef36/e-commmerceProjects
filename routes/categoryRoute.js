import express from 'express'
import { verifyToken, verifyRole } from '../controller/authController.js';

import {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} from '../utils/validator/categoryValidator.js'
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    createCateImg,
    resizeImage
} from '../controller/categoryController.js';
import subcategoryRout from './subcategoryRoute.js'
const router = express.Router();


router.get('/:id', getCategoryValidator,getCategory);
router.get('/', getAllCategory);
router.use('/:categoryId/subcategories', subcategoryRout)

// verifyToken, verifyRole (admin)
router.delete('/:id',
    // verifyToken, verifyRole('admin'),
    deleteCategoryValidator,
    deleteCategory);

// verifyToken, verifyRole (admin,manager)
// router.use(verifyToken,verifyRole('admin', 'manager'))
router.post('/', createCateImg, resizeImage,createCategoryValidator,createCategory);
router.patch('/:id',createCateImg, resizeImage,updateCategoryValidator,updateCategory);
export default router