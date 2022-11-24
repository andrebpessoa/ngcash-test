import { Decimal } from '@prisma/client/runtime'

export interface SendAccountBalanceDTO {
  username: string
  balance: Decimal
}
