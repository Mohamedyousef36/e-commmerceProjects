import express from 'express'
import { verifyToken, verifyRole } from '../controller/authController.js';

import {
    createSubCategory,
    deleteSubCategory,
    getAllSubCategory,
    getSubCategory,
    updateSubCategory,
    setCategoryToBody,
    createFilterObj
} from '../controller/subCategoryController.js';
import {
    createSubCateValid,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} from '../utils/validator/subCategoryValidator.js'
const router = express.Router({mergeParams:true});


router.get('/:id', getSubCategoryValidator, getSubCategory);
router.get('/', createFilterObj, getAllSubCategory);

// verifyToken, verifyRole (admin)
router.use(verifyToken, verifyRole("admin"));
router.delete('/:id',deleteSubCategoryValidator,deleteSubCategory);

// verifyToken, verifyRole (admin,manager)
router.use(verifyToken, verifyRole('admin', 'manager'))
router.post('/', setCategoryToBody, createSubCateValid, createSubCategory);
router.put('/:id',updateSubCategoryValidator, updateSubCategory);
export default router