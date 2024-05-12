import express from "express";
import { verifyToken, verifyRole } from "../controller/authController.js";
import {
  cashingOrder,
  getAllOrders,
  getOrder,
  filterObjForLoggedUser,
  updatedOrderPaidByAdmin,
  updatedOrderDeliveredByAdmin
  // checkOutSession
} from "../controller/orderController.js";
import getOrderValidator from '../utils/validator/orderValidator.js'

const router = express.Router();
// router.get("/check-out-session/:cartId" ,checkOutSession);

router.post("/:cartId", verifyToken, cashingOrder);


router.use(verifyToken,verifyRole('user','admin'));
router.get("/", filterObjForLoggedUser, getAllOrders);
router.get("/:id", getOrderValidator, getOrder);

//verifyToken

router.use(verifyToken, verifyRole("admin"));

router.put("/:id/pay", updatedOrderPaidByAdmin);
router.put("/:id/deliver", updatedOrderDeliveredByAdmin);


export default router;
