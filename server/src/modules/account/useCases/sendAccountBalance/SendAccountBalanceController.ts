import { ZodError } from 'zod'
import { Request, Response } from 'express'

import SendAccountBalanceUseCase from './SendAccountBalanceUseCase'
import ErrorMiddleware from '@/errors/ErrorMiddleware'
import { sendAccountBalanceSchema } from '@/schemas/SendAccountBalanceSchema'

class SendAccountBalanceController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const { username } = req.user

      sendAccountBalanceSchema.parse(data)

      const sendAccountBalanceUseCase = new SendAccountBalanceUseCase()

      const result = await sendAccountBalanceUseCase.execute(data, username)

      return res.json(result).status(200)
    } catch (error) {
      if (error instanceof ErrorMiddleware) throw new ErrorMiddleware(error.message, error.statusCode)
      if (error instanceof ZodError) throw new ErrorMiddleware(error.issues[0].message, 422)

      throw new ErrorMiddleware('Internal Server Error', 500)
    }
  }
}

export default SendAccountBalanceController
