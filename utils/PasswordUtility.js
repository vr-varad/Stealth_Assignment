import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export const GenerateSalt = async () => {
    return await bcrypt.genSaltSync(10)
}

export const GenerateHashPassword = async (password, salt) => {
    return await bcrypt.hashSync(password, salt)
}

export const GenerateRandomPassword = async () => {
    return await bcrypt.genSaltSync(10)
}

export const VerifyPassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compareSync(enteredPassword, hashedPassword)
}

export const GenerateToken = async (payload) => {
    return await jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' })
}

export const VerifyToken = async (token) => {
    return await jwt.verify(token, config.JWT_SECRET)
}