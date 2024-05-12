import { check } from 'express-validator';
import bcrypt from 'bcrypt'
import validator from '../../middleware/validator.js';
import slugify from 'slugify';
import createError from '../errors.js';
import User from '../../models/User.js';


export const createUserValidator = [
    check('name').notEmpty()
        .withMessage('User  name required ')
        .custom((val, { req }) => req.body.slug = slugify(val)),
    check("email")
        .notEmpty()
        .withMessage('email is name required ').
        isEmail()
        .withMessage('invalid email').custom((val) => {
            User.findOne({ email: val }).then((user) => {
                if (user) {
                    Promise.reject(new createError('invalid email as its in user', 501))
                }
            })
        })
    // 
    ,
    check('password').notEmpty().withMessage('password is name required ')
        .isLength({ min: 6 }).withMessage("too short password").custom((val, { req }) => {
           
            if (val != req.body.passwordConfirm) {
           throw (new createError('password dose not match',501))
            }
            return true;
        }),
    check('passwordConfirm').notEmpty().withMessage('password confirm is required'),

        check('phone').isMobilePhone(["ar-EG",'ar-SA']),
    validator
];
export const getUserValidator = [
    check('id').isMongoId().withMessage('invalid User ID'),
    validator

];

export const updateUserValidator = [
    check('id').isMongoId().withMessage('invalid User ID'),
    check('name').optional().isString().withMessage('invalid User name').custom((val, { req }) => req.body.slug = slugify(val)),
    check("email")
        .optional()
        .notEmpty()
        .withMessage('email is name required ').
        isEmail()
        .withMessage('invalid email'),
    check('phone').optional().isMobilePhone(["ar-EG", 'ar-SA']),

    validator

];
export const updateLoggedUserValidator = [
    check('name').optional().isString().withMessage('invalid User name').custom((val, { req }) => req.body.slug = slugify(val)),
    check("email").optional().notEmpty()
        .withMessage('email is  required ').
        isEmail()
        .withMessage('invalid email').custom((val) => {
            User.findOne({ email: val }).then((user) => {
                if (user) {
                    Promise.reject(new createError('invalid email as its in user', 501))
                }
            })
        })
    
    ,
    check('phone').optional().isMobilePhone(["ar-EG", 'ar-SA']),

    validator

];
export const deleteUserValidator = [
    check('id').isMongoId().withMessage('invalid User ID'),
    validator

];

export const changePasswordValidator = [

    check('id').isMongoId().withMessage('invalid User ID'),

    check('password').notEmpty().withMessage('Password is required').custom(async (val, { req }) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new createError('No User Found', 501);
        }
        const passwordIsCorrect = await bcrypt.compare(val, user.password);
       
        if (!passwordIsCorrect) {
            throw new createError('password is not correct')

        }
        return true;
    }),

    check('newPassword').notEmpty().withMessage('newPassword is required'),

    check('confirmPassword').notEmpty().withMessage('passwordConfirm is required').custom((val, { req }) => {
        if (val != req.body.newPassword) {
            throw new createError('password and password is not matching')
        }
        return true;
    }),
   
    validator
]