import authRoute from "./authRoute"
import profileRoute from "./profileRoute"
const route = (app) => {
    app.use('/', authRoute)
    app.use('/profile', profileRoute)
}

export default route