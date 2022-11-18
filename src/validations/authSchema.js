import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

export const changeUsernameSchema = Joi.object({
    username: Joi.string().required()
})

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(3).required(),
    newPassword: Joi.string().min(3).required(),
    confirmPassword: Joi.string().min(3).valid(Joi.ref("newPassword")).required().optional({ language: { any: { allowOnly: 'must match new password' } } })
})