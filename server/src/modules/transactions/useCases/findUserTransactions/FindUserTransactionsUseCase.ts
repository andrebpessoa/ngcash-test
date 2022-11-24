import prisma from '@/prisma'
import ErrorMiddleware from '@/errors/ErrorMiddleware'

class FindUserTransactionsUseCase {
  async execute (id: number): Promise<any> {
    if (id === undefined) {
      throw new ErrorMiddleware('Por favor, insira um ID', 422)
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        account: true
      }
    })

    if (userExists === null) {
      throw new ErrorMiddleware('Não foi encontrado um usuário com o ID informado', 404)
    }

    return await prisma.transactions.findMany({
      where: {
        OR: [
          { creditedAccountId: { equals: id } },
          { debitedAccountId: { equals: id } }
        ]
      },
      select: {
        id: true,
        creditedAccount: {
          select: {
            user: {
              select: {
                username: true
              }
            }
          }
        },
        debitedAccount: {
          select: {
            user: {
              select: {
                username: true
              }
            }
          }
        },
        value: true,
        createdAt: true
      }
    })
  }
}

export default FindUserTransactionsUseCase
