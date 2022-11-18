import {
    changePasswordSchema,
    changeUsernameSchema,
    loginSchema,
    registerSchema
} from "./authSchema";

import {
    addBookcaseSchema,
    delBookcaseSchema,
    getBookcaseByIdSchema
} from "./bookCaseSchema";


const createValidator = (schema) => (payload) => schema.validateAsync(payload)

/**
 * Auth validator
 */

const loginValidator = createValidator(loginSchema)
const registerValidator = createValidator(registerSchema)
const changeUsernameValidator = createValidator(changeUsernameSchema)
const changePasswordValidator = createValidator(changePasswordSchema)

export const authRequestValidators = {
    loginValidator,
    registerValidator,
    changeUsernameValidator,
    changePasswordValidator
}

/**
 * Bookcase Validators
 */
const delBookcaseValidator = createValidator(delBookcaseSchema)
const addBookcaseValidator = createValidator(addBookcaseSchema)
const getBookcaseByIdValidator = createValidator(getBookcaseByIdSchema)

export const bookcaseValidators = {
    delBookcaseValidator,
    addBookcaseValidator,
    getBookcaseByIdValidator
}