import AuthRoutes from "./AuthRoutes.js"
import UserRoutes from "./UserRoutes.js"

class Routes {
    constructor(app) {
        app.use('/api/auth', AuthRoutes)
        app.use('/api/users', UserRoutes)
    }
}

export {
    Routes
}