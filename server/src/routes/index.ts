import { Router } from 'express'
import accountRoutes from './account.routes'
import authRoutes from './auth.routes'
import transactionsRoutes from './transactions.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('', userRoutes)
routes.use('', authRoutes)
routes.use('/account', accountRoutes)
routes.use('/transactions', transactionsRoutes)

export default routes
