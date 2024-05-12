import multer from "multer";

import createError from "../utils/errors.js";

export const uploadSingleImg = (imageFile) => {

    const multerStorage = multer.memoryStorage();
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new createError('accepting only image', 400, false))
        }
    }
    //@ CREATE  IMAGE DESTINATION 
    const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

    //@ CREATE IMAGE 
    return upload.single(imageFile);

};
export const uploadMultiImage = (fields) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new createError("accepting only image", 400, false));
    }
  };
  //@ CREATE CATEGORY IMAGE DESTINATION
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.fields(fields);
};


