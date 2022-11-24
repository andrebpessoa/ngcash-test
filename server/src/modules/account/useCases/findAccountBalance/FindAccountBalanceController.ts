import { Request, Response } from 'express'

import FindAccountBalanceUseCase from './FindAccountBalanceUseCase'
import ErrorMiddleware from '@/errors/ErrorMiddleware'

class FindAccountBalanceController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const findAccountBalanceUseCase = new FindAccountBalanceUseCase()

      const result = await findAccountBalanceUseCase.execute(Number(id))

      return res.json(result).status(200)
    } catch (error) {
      if (error instanceof ErrorMiddleware) throw new ErrorMiddleware(error.message, error.statusCode)

      throw new ErrorMiddleware('Internal Server Error', 500)
    }
  }
}

export default FindAccountBalanceController
