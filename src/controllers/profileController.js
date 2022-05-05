export const get = (req, res, next) => {
    let user = req.user
    return res.status(200).json({
        data: {
            ...user.toJson()
        }
    })
}