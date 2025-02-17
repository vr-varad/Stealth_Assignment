import { CreateUserSchema, UpdateUserSchema } from "../schema/UserSchema.js"
import { GenerateRandomPassword } from "../utils/PasswordUtility.js"
import { db } from '../providers/Database.js'
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/ErrorUtility.js"

const User = db.users

export const CreateUser = async (req, res, next) => {
    try {
        console.log(req.userData)
        const value = await CreateUserSchema.validateAsync(req.body)
        const { name, email, role } = value
        if(role ===  'admin' && req.userData.role !== 'admin') {
            return next(new UnauthorizedError('You are not authorized to perform this action'))
        }
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return next(new BadRequestError('User already exists'))
        }
        const hashedPassword = await GenerateRandomPassword()
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json({
            message: "User created",
            data: user
        })
    } catch (error) {
        console.log(error)
        return next(new BadRequestError(error.message))
    }
}

export const GetAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json({
            message: "Users fetched",
            data: users
        })
    } catch (error) {
        console.log(error)
        return next(new BadRequestError(error.message))
    }
}

export const UpdateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id !== req.userData.id) {
            return next(new UnauthorizedError('You are not authorized to perform this action'))
        }
        const value = await UpdateUserSchema.validateAsync(req.body)
        const { name, email, role } = value
        const user = await User.findOne({ where: { id } })
        if (!user) {
            return next(new NotFoundError('User not found'))
        }
        await User.update({ name, email, role }, { where: { id } })
        res.status(200).json({
            message: "User updated"
        })
    } catch (error) {
        console.log(error)
        return next(new BadRequestError(error.message))
    }
}

export const DeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = User.findOne({ where: { id } })
        if (!user) {
            return next(new NotFoundError('User not found'))
        }
        await User.destroy({ where: { id } })
        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        console.log(error)
        return next(new BadRequestError(error.message))
    }
}

export const GetUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        if (!user) {
            return next(new NotFoundError('User not found'))
        }
        res.status(200).json({
            message: "User fetched",
            data: user
        })
    } catch (error) {
        console.log(error)
        return next(new BadRequestError(error.message))
    }
}