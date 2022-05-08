import { validationResult } from "express-validator";
import createError from "http-errors";
export const handleExpressValidateError = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(createError(400, errors.array()[0].msg))
    }
    return next()
}