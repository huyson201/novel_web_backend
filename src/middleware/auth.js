import { checkSchema } from "express-validator"
import User from "~/models/User"

export const loginMiddleware = () => {
    return checkSchema({
        email: {
            isEmail: {
                errorMessage: "E-mail invalid",

            },
            custom: {
                options: async (value) => {
                    let user = await User.findOne({ email: value })
                    if (!user) return Promise.reject("E-mail not exist ")
                }
            },

        },
        password: {
            notEmpty: {
                errorMessage: "password required"
            }
        }
    })
}
export const registerMiddleware = () => {
    return checkSchema({
        email: {
            isEmail: {
                errorMessage: "E-mail invalid",

            },
            custom: {
                options: async (value) => {
                    let user = await User.findOne({ email: value })
                    if (user) return Promise.reject("E-mail exist ")
                }
            },

        },
        password: {
            notEmpty: {
                errorMessage: "password required"
            }
        },
        name: {
            notEmpty: {
                errorMessage: "name required"
            }
        }
    })
}