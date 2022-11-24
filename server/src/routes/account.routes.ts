/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import authenticateUser from '@/middlewares/AuthenticateUser'
import FindAccountBalanceController from '@/modules/account/useCases/findAccountBalance/FindAccountBalanceController'
import SendAccountBalanceController from '@/modules/account/useCases/sendAccountBalance/SendAccountBalanceController'

const findAccountBalanceController = new FindAccountBalanceController()
const sendAccountBalanceController = new SendAccountBalanceController()

const accountRoutes = Router()

accountRoutes.get('/balance/:id', authenticateUser, findAccountBalanceController.handle)
accountRoutes.post('/transaction', authenticateUser, sendAccountBalanceController.handle)

export default accountRoutes
