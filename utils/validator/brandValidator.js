import { check } from 'express-validator';
import validator from '../../middleware/validator.js';
import slugify from 'slugify';


export const createBrandValidator = [
    check('name').notEmpty()
        .withMessage('Brand is name required ')
        .isLength({ min: 2 })
        .withMessage('too short Brand name')
        .isLength({ max: 20 })
        .withMessage('too long Brand name')
        .custom((val, { req }) => req.body.slug = slugify(val)),
    validator
];
export const getBrandValidator = [
    check('id').isMongoId().withMessage('invalid Brand ID'),
    validator

];

export const updateBrandValidator = [
    check('id').isMongoId().withMessage('invalid Brand ID'),
    check('name').optional().isString().withMessage('invalid Brand name').custom((val,{req})=>req.body.slug = slugify(val)),
    validator

];
export const deleteBrandValidator = [
    check('id').isMongoId().withMessage('invalid Brand ID'),
    validator

];

