import createError from "../utils/errors.js";

//Global handling middleware 
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (process.env.NODE_ENV == 'Development') {
        sendForDev(err, res)
    }
    else {
        sendForProd(err, res);
    }

}

const sendForDev = (err, res) => {

    return res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
        err: err,
        stack: err.stack

    })
};

const sendForProd = (err, res) => {
    
    if (err.name === 'JsonWebTokenError') {
        err = new createError('invalid token , please login again',401)
    }
    if (err.name === 'TokenExpiredError') {
        err = new createError('expired token , please login again', 401)
    }

    return res.status(err.statusCode).json({
        message: err.message,
        status: err.status
    })
};

export default errorHandler