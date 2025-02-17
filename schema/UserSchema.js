import Joi from 'joi'


export const UserSignUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const UserLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


export const CreateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
})

export const UpdateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string(),
})