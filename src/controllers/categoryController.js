import createError from "http-errors"
import Category from "~/models/Category"
export const get = async (req, res, next) => {
    try {
        let categories = await Category.find({}).sort('name').select('-books')
        return res.status(200).json({
            data: categories
        })
    } catch (error) {
        next(createError(error.status || 500, error.message))
    }
}
export const create = async (req, res, next) => {
    let data = req.body
    try {
        let category = new Category({ ...data })
        await category.save()
        return res.status(201).json({
            status: 201,
            message: "success"
        })
    } catch (error) {
        next(createError(error.status || 500, error.message))
    }
}