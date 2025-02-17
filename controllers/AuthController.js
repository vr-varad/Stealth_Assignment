import { UserSignUpSchema, UserLoginSchema } from '../schema/UserSchema.js'
import { db } from '../providers/Database.js'
import { GenerateHashPassword, GenerateSalt, GenerateToken, VerifyPassword } from '../utils/PasswordUtility.js';

const User = db.users

export const UserSignUp = async (req, res, next) => {
    try {
        const value = await UserSignUpSchema.validateAsync(req.body);

        const { name, email, password } = value;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        const salt = await GenerateSalt();
        const hashedPassword = await GenerateHashPassword(password, salt);


        const user = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error.details[0].message);
    }
}

export const UserLogin = async (req, res, next) => {
    try {
        const values = await UserLoginSchema.validateAsync(req.body);

        const { email, password } = values;

        const user = await User.findOne({ where: { email } });  

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordValid = await VerifyPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        const token = await GenerateToken({ id: user.id, email: user.email });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error.details[0].message);
    }
}