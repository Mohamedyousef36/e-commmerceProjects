import express from "express";
import { verifyToken } from "../controller/authController.js";

import {
  addAddresses,
  removeAddresses,
  getAddressesOfLoggedUser,
} from "../controller/addressController.js";
// import { createAddressesValidator } from "../utils/validator/addressesValidator.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", addAddresses);
router.delete("/:addressId", removeAddresses);
router.get("/", getAddressesOfLoggedUser);

export default router;
