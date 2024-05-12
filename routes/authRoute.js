import express from 'express'
import { authValidator, loginValidator } from '../utils/validator/authValidator.js'
import {forgetPassword,verifyResetCode} from '../controller/forgetPasswordController.js';
import forgetPasswordValidator from '../utils/validator/forgetPasswordValidator.js';
import {
    register, login, verifyToken, verifyRole
} from '../controller/authController.js';

const router = express.Router();


router.post('/register', authValidator, register);
router.post("/login", loginValidator,login);
router.post("/forgetPassword",forgetPasswordValidator,forgetPassword);
router.post('/verifyResetCode', verifyResetCode);
router.post('/verifyToken', verifyToken );


export default router