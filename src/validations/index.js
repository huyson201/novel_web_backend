import loginSchema from "./loginSchema";
import registerSchema from "./registerSchema";

const createValidator = (schema) => (payload) => schema.validateAsync(payload, { abortEarly: false })

export const loginValidator = createValidator(loginSchema)
export const registerValidator = createValidator(registerSchema)

