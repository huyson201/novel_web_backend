export const pagination = async (model, query, order, options, page = 1, limit = 10,) => {
    let startIndex = (page - 1) * limit
    let paginationData = {
        previous: {},
        next: {},
        total: 0,
        result: []
    }

    if (page > 1) {
        paginationData.previous = { page: +page - 1, limit: limit }
    }

    try {
        paginationData.total = await model.count({ where: query, orderBy: order })
        if (startIndex + limit < paginationData.total) {
            paginationData.next = { page: +page + 1, limit: limit }
        }

        paginationData.result = await model.findMany({
            skip: startIndex,
            take: limit,
            where: query,
            orderBy: order,
            ...options
        })

        return paginationData

    } catch (error) {
        return Promise.reject(error)
    }
}