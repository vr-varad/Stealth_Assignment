import { UserSignUpSchema, UserLoginSchema } from '../schema/UserSchema.js'
import { Database } from '../providers/Database.js'
import { GenerateHashPassword, GenerateSalt, GenerateToken, VerifyPassword } from '../utils/PasswordUtility.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/ErrorUtility.js';


export const UserSignUp = async (req, res, next) => {
    try {
        
        const value = await UserSignUpSchema.validateAsync(req.body);

        const { name, email, password } = value;

        const existingUser = await Database.db.users.findOne({ where: { email } });

        if (existingUser) {
            return next(new BadRequestError('User already exists'));
        }

        const salt = await GenerateSalt();
        const hashedPassword = await GenerateHashPassword(password, salt);


        const user = await Database.db.users.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        console.log(error);
        next(new BadRequestError(error.details[0].message));
    }
}

export const UserLogin = async (req, res, next) => {
    try {
        const values = await UserLoginSchema.validateAsync(req.body);

        const { email, password } = values;

        const user = await Database.db.users.findOne({ where: { email } });

        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        const isPasswordValid = await VerifyPassword(password, user.password);

        if (!isPasswordValid) {
            return next(new UnauthorizedError('Invalid password'));
        }

        const token = await GenerateToken({ id: user.id, email: user.email });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token
        })
    } catch (error) {
        console.log(error);
        next(new BadRequestError(error.details[0].message));
    }
}