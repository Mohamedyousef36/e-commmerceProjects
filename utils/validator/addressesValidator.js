// import { check } from "express-validator";
// import validator from "../../middleware/validator.js";
// import createError from "../errors.js";
// import User from "../../models/User.js";

// export const createAddressesValidator = [
//   check("alias").isString()
//     .custom(async (val, { req }) => {
//       const user = await User.findById(req.user._id);
//        user.addresses.map((el) => {
//         if (el.alias === req.body.alias) {
//           return Promise.reject(new createError("Create New addresses"));
//          }
       
//       });
     
    
//     }),
//   validator,
// ];