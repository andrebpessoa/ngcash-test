/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import authenticateUser from '@/middlewares/AuthenticateUser'
import FindUserTransactionsController from '@/modules/transactions/useCases/findUserTransactions/FindUserTransactionsController'

const findUserTransactionsController = new FindUserTransactionsController()

const transactionsRoutes = Router()

transactionsRoutes.get('/user', authenticateUser, findUserTransactionsController.handle)

export default transactionsRoutes
