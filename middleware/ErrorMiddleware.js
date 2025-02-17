import { CustomError } from "../utils/ErrorUtility.js";

export const ErrorMiddleware = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).send(error.message);
    }
    return res.status(500).send('Internal Server Error');
}