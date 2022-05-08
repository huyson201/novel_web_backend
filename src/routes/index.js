import authRoute from "./authRoute"
import profileRoute from "./profileRoute"
import categoryRoute from "./categoryRoute"
import bookRoute from "./bookRoute"

const handleError = (err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        status: err.status,
        message: err.message
    })
}

const route = (app) => {
    app.use('/', authRoute)
    app.use('/categories', categoryRoute)
    app.use('/profile', profileRoute)
    app.use('/books', bookRoute)
    app.use(handleError)

}

export default route