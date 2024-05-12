import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import csurf from "csurf";
// import session from "express-session";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import createError from "../utils/errors.js";
import sanitizeUser from "../utils/sanitizeData.js";
//=> return only necessary data (security)  => another solution in User schema select :false

// import createToken from "../utils/createToken.js";

//@ REGISTER ALL USER
//@ ROUTES => POST => api/v/auth/register
//@ ACCESS => USERS
export const register = asyncHandler(async (req, res) => {
  // create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //generate token

  const token = Jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_DATE }
  );

  res.status(200).json({ data: sanitizeUser(user), userToken: token });
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new createError("wrong password or email  ", 401));
  }
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return next(new createError("wrong password or email  ", 401));
  }
  const token = Jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_DATE }
  );

    req.session.user = user,
    req.session.authorized = true
  console.log(user)

  res.status(200).json({ data: sanitizeUser(user), userToken: token });
});

// check if user login // check auth
export const verifyToken = asyncHandler(async (req, res, next) => {
  // catch token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new createError("you are not login", 501));
  }
  // verify token
  const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
  // Check If User Exist
  const currentUser = await User.findById(decoded.id);
  console.log(decoded.id)
  if (!currentUser) {
    return next(new createError("No User Belong To This Token"));
  }
  // check if user change password after create token
  if (currentUser.passwordChangeAt) {
    const passwordChangeAtTimeStamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000
    );
    if (passwordChangeAtTimeStamp > decoded.iat) {
      return next(
        new createError("Password Has Changed Recently Please Login Again", 401)
      );
    }
  }
  req.user = currentUser;
  next();
});

export const verifyRole = (...role) => {
  return asyncHandler(async (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new createError("You Do Not Allowed To Access", 403));
    }
    next();
  });
};
