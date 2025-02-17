import { db } from "../providers/Database.js";
import { VerifyToken } from "../utils/PasswordUtility.js";

export const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await VerifyToken(token);
        const {id} = decoded;
        const user = await db.users.findOne({where: {id}});
        req.userData = user;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
}