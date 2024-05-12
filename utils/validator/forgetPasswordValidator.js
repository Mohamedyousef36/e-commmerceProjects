import { check } from 'express-validator';
import validator from '../../middleware/validator.js';

const forgetPasswordValidator = [
    check("email")
    .notEmpty()
    .withMessage('email is  required ').
    isEmail()
    .withMessage('invalid email'),
validator
]
export default forgetPasswordValidator