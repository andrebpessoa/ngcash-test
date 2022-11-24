import { Request, Response } from 'express'

import FindUserTransactionsUseCase from './FindUserTransactionsUseCase'
import ErrorMiddleware from '@/errors/ErrorMiddleware'

class FindUserTransactionsController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user

      const findUserTransactionsUseCase = new FindUserTransactionsUseCase()

      const result = await findUserTransactionsUseCase.execute(id)

      return res.json(result).status(200)
    } catch (error) {
      if (error instanceof ErrorMiddleware) throw new ErrorMiddleware(error.message, error.statusCode)

      throw new ErrorMiddleware('Internal Server Error', 500)
    }
  }
}

export default FindUserTransactionsController
