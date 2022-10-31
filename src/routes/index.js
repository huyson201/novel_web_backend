import routeV1 from "./v1"
const routes = (app) => {
    app.use('/api/v1', routeV1)
}
export default routes