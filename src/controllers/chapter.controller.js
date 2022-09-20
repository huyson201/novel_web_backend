import { responseFormat } from "~/utils"

export const getByBookId = async (req, res, next) => {
    return res.status(200).json(responseFormat(req.paginationResult))
}
