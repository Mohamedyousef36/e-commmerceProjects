import createError from '../utils/errors.js'

const notFound = (req, res, next) => {
    next(new createError(`No Route Match ${req.originalUrl}`, 400));
};
export default notFound