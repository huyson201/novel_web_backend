// import { bookPagination } from "~/middlewares/common"

import prisma from "~/models"

export const paginationFormat = async (data, total, startIndex, page = 1, perPage = 10,) => {
    let paginationData = {
        previous: {},
        next: {},
        total: total,
        result: data,
        per_page: perPage
    }

    if (page > 1) {
        paginationData.previous = { page: +page - 1 }
    }
    if (startIndex + perPage < paginationData.total) {
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