import prisma from '@/prisma'

import ErrorMiddleware from '@/errors/ErrorMiddleware'
import { IAccountBalanceReturn } from '@/interfaces/IAccountBalanceReturn'

class CreateUserUseCase {
  async execute (id: number): Promise<IAccountBalanceReturn> {
    if (id === undefined) {
      throw new ErrorMiddleware('Por favor, insira um id de usuário', 422)
    }

    const accountExists = await prisma.account.findUnique({
      where: {
        id
      },
      select: {
        balance: true
      }
    })

    if (accountExists === null) {
      throw new ErrorMiddleware('Nenhuma conta encontrada com o ID informado', 404)
    }

    return accountExists
  }
}

export default CreateUserUseCase
