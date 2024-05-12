import express from 'express'
import {verifyToken,verifyRole} from '../controller/authController.js';

import {
    createCoupon,
    deleteCoupon,
    getAllCoupon,
    getCoupon,
    updateCoupon

} from '../controller/couponController.js';

const router = express.Router();



// verifyToken, verifyRole
// router.use(verifyToken, verifyRole('admin', 'manager'));
router.post("/", createCoupon);
router.put('/:id', updateCoupon);
router.get("/:id", getCoupon);
router.get("/", getAllCoupon);
router.delete("/:id", deleteCoupon);



export default router