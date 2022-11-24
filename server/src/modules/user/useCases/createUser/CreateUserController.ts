import { ZodError } from 'zod'
import { Request, Response } from 'express'

import { createUserSchema } from '@/schemas/CreateUserSchema'
import CreateUserUseCase from './CreateUserUseCase'
import ErrorMiddleware from '@/errors/ErrorMiddleware'

class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      createUserSchema.parse(data)

      const createUserUseCase = new CreateUserUseCase()

      await createUserUseCase.execute(data)

      return res.json({ message: 'Usuário criado com sucesso' }).status(201)
    } catch (error) {
      console.log('server', error)

      if (error instanceof ErrorMiddleware) throw new ErrorMiddleware(error.message, error.statusCode)
      if (error instanceof ZodError) throw new ErrorMiddleware(error.issues[0].message, 422)

      throw new ErrorMiddleware('Internal Server Error', 500)
    }
  }
}

export default CreateUserController
