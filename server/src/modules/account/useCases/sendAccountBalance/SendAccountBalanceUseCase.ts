import prisma from '@/prisma'

import ErrorMiddleware from '@/errors/ErrorMiddleware'
import { SendAccountBalanceDTO } from '../../dtos/SendAccountBalanceDTO'
import { hasEnoughBalance } from '@/utils/HasEnoughBalance'
import { formatBRL } from '@/utils/FormatBRL'

class SendAccountBalanceUseCase {
  async execute ({ username, balance }: SendAccountBalanceDTO, currentUserUsername: string): Promise<any> {
    if (username === currentUserUsername) {
      throw new ErrorMiddleware('Você não pode transferir para você mesmo', 409)
    }

    const creditedAccount = await prisma.user.findUnique({
      where: {
        username
      },
      include: {
        account: true
      }
    })

    const debitedAccount = await prisma.user.findUnique({
      where: {
        username: currentUserUsername
      },
      include: {
        account: true
      }
    })

    if (creditedAccount === null || debitedAccount === null) {
      throw new ErrorMiddleware('Uma conta com o nome de usuário informado não foi encontrada', 404)
    }

    if (!hasEnoughBalance(Number(debitedAccount.account?.balance), Number(balance))) {
      throw new ErrorMiddleware('Saldo insuficiente', 409)
    }

    await prisma.account.update({
      where: {
        id: creditedAccount.id
      },
      data: {
        balance: {
          increment: balance
        }
      }
    })

    await prisma.account.update({
      where: {
        id: debitedAccount.id
      },
      data: {
        balance: {
          decrement: balance
        }
      }
    })

    await prisma.transactions.create({
      data: {
        value: balance,
        creditedAccountId: creditedAccount.id,
        debitedAccountId: debitedAccount.id
      }
    })

    return {
      message: `A transferência no valor de ${formatBRL(Number(balance))} foi realizada com sucesso! Novo saldo: ${formatBRL(Number(debitedAccount.account?.balance))}`
    }
  }
}

export default SendAccountBalanceUseCase
