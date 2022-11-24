/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import AuthenticateUserController from '@/modules/auth/useCases/authenticateUser/AuthenticateUserController'

const authenticateUser = new AuthenticateUserController()

const authRoutes = Router()

authRoutes.post('/authenticate', authenticateUser.handle)

export default authRoutes
