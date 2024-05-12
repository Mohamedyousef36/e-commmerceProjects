import express from 'express'
import { verifyToken, verifyRole } from '../controller/authController.js';

import {
    getUserValidator,
    createUserValidator, 
    updateUserValidator,
    deleteUserValidator,
    changePasswordValidator,
    updateLoggedUserValidator,
    
} from '../utils/validator/userValidator.js'
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  getLoggedUserData,
  updateUser,
  resizeImage,
  createUserImg,
  changeUserPassword,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deactivateMyAccount,
  activateMyAccount,
  deleteMyAccount
} from "../controller/userController.js";

const router = express.Router();

// logged user 
// router.use(verifyToken)
router.get('/getData/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword );
router.put('/updateUserData', updateLoggedUserValidator, updateLoggedUserData)
router.delete('/deactivateMyAccount',deactivateMyAccount)
router.delete('/activeMyAccount',activateMyAccount)
router.delete("/deleteMyAccount", deleteMyAccount);


// Admin Role
// router.use(verifyRole('admin'))
router.post('/', createUserImg, resizeImage, createUserValidator, createUser);
router.get('/:id',getUserValidator, getUser);
router.put('/:id',createUserImg, resizeImage, updateUserValidator, updateUser);
router.delete('/:id', deleteUserValidator, deleteUser);
router.get('/', getAllUser); 
router.put("/changePassword/:id", changePasswordValidator, changeUserPassword);

export default router