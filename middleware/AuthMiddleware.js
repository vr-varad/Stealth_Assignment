import { Database } from "../providers/Database.js";
import { UnauthorizedError } from "../utils/ErrorUtility.js";
import { VerifyToken } from "../utils/PasswordUtility.js";

export const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await VerifyToken(token);
        const {id} = decoded;
        const user = await Database.db.users.findOne({where: {id}});
        if (!user) {
            return next(new UnauthorizedError('Unauthorized'));
        }
        req.userData = user;
        next();
    } catch (error) {
        return next(new UnauthorizedError('Unauthorized'));
    }
}