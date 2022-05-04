import authRoute from "./authRoute"
const route = (app) => {
    app.use('/', authRoute)
}

export default route