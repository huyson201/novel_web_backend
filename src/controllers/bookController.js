import createError from "http-errors"
import Book from "../models/Book"

export const getAll = async (req, res, next) => {
    const { page, limit } = req.query

    if (limit) {
        try {
            let books = await Book.find({}).sort('-updatedAt').limit(limit)
            return res.status(200).json({
                message: "success",
                status: 200,
                data: books
            })
        } catch (error) {
            return next(createError(500, error.message))
        }
    }

    if (page) {
        try {
            let books = await Book.paginate({}, { page, sort: '-updatedAt' })
            return res.status(200).json({
                message: "success",
                status: 200,
                data: books
            })
        } catch (error) {
            return next(createError(500, error.message))
        }
    }

    return res.status(200).json({
        message: "success",
        status: 200,
        data: []
    })
}

export const getBySlug = async (req, res, next) => {
    const { slug } = req.params

    if (slug) {

        try {
            let book = await Book.findOne({ slug: slug })
            return res.status(200).json({
                message: "success",
                status: 200,
                data: book
            })
        } catch (error) {
            return next(createError(500, error.message))
        }
    }

    return res.status(200).json({
        message: "success",
        status: 200,
        data: {}
    })
}

export const update = async (req, res, next) => {
    const { categories, ...updateData } = req.body
    const { slug } = req.params
    try {
        let book = await Book.findOneAndUpdate({ slug }, { ...updateData })
        let cates = []
        if (categories) {
            cates = await book.setCategories(categories)
        }
        else {
            cates = await book.categories
        }
        return res.status(200).json({
            message: "success",
            status: 200,
            data: {
                ...book.toJSON(),
                categories: cates
            }
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const getCates = async (req, res, next) => {
    const { slug } = req.params

    try {
        let book = await Book.findOne({ slug })
        let cates = await book.categories
        return res.status(200).json({
            message: "success",
            status: 200,
            data: cates
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const getChapters = async (req, res, next) => {
    const { slug } = req.params
    let { page, limit, select } = req.query

    if (select) {
        select = select.replaceAll(':', ' ')
    }
    try {
        let chapters = await (await Book.findOne({ slug })).getChapters(page, limit, select)
        return res.status(200).json({
            message: "success",
            status: 200,
            data: chapters
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const getChapter = async (req, res, next) => {
    const { slug, number } = req.params
    try {
        let book = await Book.findOne({ slug })
        if (!book) return next(createError(400, "book not found!"))

        let chapter = await book.getChapter(number)
        if (!chapter) return next(createError(400, "chapter not found!"))

        return res.status(200).json({
            message: "success",
            status: 200,
            data: chapter
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}