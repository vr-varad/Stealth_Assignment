import { UnauthorizedError } from "../utils/ErrorUtility.js";

export const AdminMiddleware = async (req, res, next) => {
    try {
        if (!req.userData || req.userData.role !== 'admin') {
            return next(new UnauthorizedError('You are not authorized to perform this action'))
        }
        next();
    } catch (error) {
        return next(new UnauthorizedError('Unauthorized'));
    }
}