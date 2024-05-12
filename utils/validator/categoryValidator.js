import { check } from 'express-validator';
import slugify from 'slugify';
import validator from '../../middleware/validator.js';


export const createCategoryValidator = [
    check('name').notEmpty()
        .withMessage('category is name required ')
        .isLength({ min: 2 })
        .withMessage('too short category name')
        .isLength({ max: 20 })
        .withMessage('too long category name').custom((val, { req }) => req.body.slug = slugify(val)), 
    validator
];
export const getCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category ID'),
    validator

];

export const updateCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category ID'),
    check('name').isString().withMessage('invalid category name').custom((val, { req }) => req.body.slug = slugify(val)),

    validator

];
export const deleteCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category ID'),
    validator

];

