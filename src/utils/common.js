import prisma from "~/models"

export const responseFormat = (data, status = 200, message = 'success') => {
    return {
        status,
        message,
        data
    }
}

export const createChapterResponse = async (chapter) => {
    if (!chapter) return {
        prevChapter: {},
        nextChapter: {},
        chapter: null,
    }

    let prevChapter = await getPrevChapter(chapter.bookId, chapter.chapterNumber)
    let nextChapter = await getNextChapter(chapter.bookId, chapter.chapterNumber)


    let prevFormat = prevChapter ? { link: `/chapter-${prevChapter.chapterNumber}/${prevChapter.id}` } : {}

    let nextFormat = nextChapter ? { link: `/chapter-${nextChapter.chapterNumber}/${nextChapter.id}` } : {}

    return {
        prevChapter: prevFormat,
        nextChapter: nextFormat,
        chapter: chapter
    }
}



const getPrevChapter = async (bookId, chapterNumber) => {
    let prevChapter = await prisma.chapter.findMany({
        where: {
            bookId: bookId,
            chapterNumber: { lt: chapterNumber }
        },
        select: {
            id: true, bookId: true, chapterNumber: true
        },
        orderBy: { chapterNumber: 'desc' },
        take: 1
    })
    return prevChapter.length > 0 ? prevChapter[0] : null
}

const getNextChapter = async (bookId, chapterNumber) => {
    let nextChapter = await prisma.chapter.findMany({
        where: {
            bookId: bookId,
            chapterNumber: { gt: chapterNumber }
        },
        select: {
            id: true, bookId: true, chapterNumber: true
        },
        orderBy: { chapterNumber: 'asc' },
        take: 1
    })

    return nextChapter.length > 0 ? nextChapter[0] : null
}