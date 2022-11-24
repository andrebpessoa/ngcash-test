/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import CreateUserController from '@/modules/user/useCases/createUser/CreateUserController'

const createUser = new CreateUserController()

const userRoutes = Router()

userRoutes.post('/register', createUser.handle)

export default userRoutes
