import { ZodError } from 'zod'
import { Request, Response } from 'express'

import ErrorMiddleware from '@/errors/ErrorMiddleware'
import { authenticateUserSchema } from '@/schemas/AuthenticateUserSchema'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      authenticateUserSchema.parse(data)

      const authenticateUserUseCase = new AuthenticateUserUseCase()

      const result = await authenticateUserUseCase.execute(data)

      return res.json(result).status(200)
    } catch (error) {
      if (error instanceof ErrorMiddleware) throw new ErrorMiddleware(error.message, error.statusCode)
      if (error instanceof ZodError) throw new ErrorMiddleware(error.issues[0].message, 422)

      throw new ErrorMiddleware('Internal Server Error', 500)
    }
  }
}

export default AuthenticateUserController
