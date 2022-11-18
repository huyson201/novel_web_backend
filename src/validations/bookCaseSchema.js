import Joi from 'joi'

export const delBookcaseSchema = Joi.object({
    book_id: Joi.number().required()
})


export const addBookcaseSchema = Joi.object({
    book_id: Joi.number().required(),
    chapter_id: Joi.number().required()
})

export const getBookcaseByIdSchema = Joi.object({
    book_id: Joi.number().required()
})

