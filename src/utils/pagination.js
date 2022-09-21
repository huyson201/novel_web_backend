// import { bookPagination } from "~/middlewares/common"

import { Prisma } from "@prisma/client"
import prisma from "~/models"

export const paginationFormat = (data, total, startIndex, page = 1, perPage = 10,) => {
    let paginationData = {
        previous: {},
        next: {},
        total: total,
        per_page: perPage,
        current_page: +page,
        result: data,

    }

    if (page > 1) {
        paginationData.previous = { page: +page - 1 }
    }
    if ((+page * perPage - total) < 0) {
        paginationData.next = { page: +page + 1 }
    }


    return paginationData


}

export const bookPagination = async (page = 1, perPage = 10, order = 'desc', sort = 'updatedAt') => {
    const startIndex = ((page - 1) * perPage)
    const totalBook = await prisma.book.count()
    let books = await prisma.book.findMany({
        include: {
            categories: true,
            chapters: {
                orderBy: { chapterNumber: 'desc' },
                take: 1,
                select: {
                    id: true,
                    title: true,
                    chapterNumber: true,
                    createdAt: true,
                    updatedAt: true,
                    bookId: true
                }
            }
        },
        skip: startIndex,
        take: perPage,
        orderBy: {
            [sort]: order
        }
    })
    return paginationFormat(books, totalBook, startIndex, page, perPage)

}

export const chapterPagination = async (bookId, page = 1, perPage = 10, order = 'asc', sort = 'chapterNumber') => {
    const startIndex = ((page - 1) * perPage)
    const total = await prisma.chapter.count({ where: { bookId } })
    let chapters = await prisma.chapter.findMany({
        where: { bookId: bookId },
        skip: startIndex,
        take: perPage,
        orderBy: {
            [sort]: order,
        }
    })

    return paginationFormat(chapters, total, startIndex, page, perPage)
}

export const searchChapterPagination = async (bookId, searchKey, page = 1, perPage = 10, order = 'asc', sort = 'chapterNumber') => {
    const startIndex = ((page - 1) * perPage)
    const queryField = parseInt(searchKey) ? { chapterNumber: { equals: +searchKey } } : { title: { contains: searchKey } }
    const query = {
        bookId: +bookId,
        ...queryField
    }

    const total = await prisma.chapter.count({
        where: query
    })

    let chapters = await prisma.chapter.findMany({
        where: query,
        skip: startIndex,
        take: perPage,
        orderBy: {
            [sort]: order,
        },

    })

    return paginationFormat(chapters, total, startIndex, page, perPage)
}

export const getBooksByCatePagination = async (cateSlug, page = 1, perPage = 10, order = 'desc', sort = 'updatedAt') => {
    const startIndex = ((page - 1) * perPage)
    const query = {
        categories: {
            some: { slug: cateSlug }
        }
    }
    const totalBook = await prisma.book.count({ where: query })
    if (totalBook === 0) return paginationFormat([], totalBook, startIndex, page, perPage)
    let books = await prisma.book.findMany({
        where: query,
        include: {
            categories: true
        },
        orderBy: { [sort]: order },
        skip: startIndex,
        take: perPage
    })

    return paginationFormat(books, totalBook, startIndex, page, perPage)

}

export const getPopularBooksPagination = async (page = 1, perPage = 10, order = 'desc', sort = 'updatedAt') => {


    try {
        let books = await prisma.book.findMany({
            include: {
                categories: true
            },
            orderBy: {
                view: 'desc'
            },
            skip: startIndex,
            take: perPage
        })

        return res.status(200).json(responseFormat(books))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
    return paginationFormat(books, totalBook, startIndex, page, perPage)

}
