import { check } from 'express-validator';
import validator from '../../middleware/validator.js';
import slugify from 'slugify';
import createError from '../errors.js';
import User from '../../models/User.js';


 export const authValidator = [
    check('name').notEmpty()
        .withMessage('User  name required ')
        .custom((val, { req }) => req.body.slug = slugify(val)),
    check("email")
        .notEmpty()
        .withMessage('email is  required ').
        isEmail()
        .withMessage('invalid email')
        .custom(async(val,{req}) => {
          
         await User.findOne({ email: val }).then((user) => {
                if (user) {
                return Promise.reject(new createError('invalid email as its in user',501))
                }
            })
        })
    
    ,
    check('password').notEmpty().withMessage('password is name required ')
        .isLength({ min: 6 }).withMessage("too short password").custom((val, { req }) => {
           
            if (val != req.body.passwordConfirm) {
           throw (new createError('password dose not match',501))
            }
            return true;
        }),
    check('passwordConfirm').notEmpty().withMessage('password confirm is required'),
    validator
];


export const loginValidator = [
  check('email')
    .isEmail()
    .withMessage('invalid email')
    .notEmpty()
    .withMessage('email is required')

    .custom(async (val, { req }) => {
      await User.findOne({ email: val }).then((user) => {
        if (!user) {
          return Promise.reject(new createError("NO user match", 501));
        }
      });
    }),

  check("password")
    .notEmpty(),
validator
];
export default authValidator