import zod from 'zod'

export const sendAccountBalanceSchema = zod.object({
  username: zod
    .string({ required_error: 'Insira um username.' })
    .min(3, { message: 'O nome de usuário precisa ter pelo menos 3 caracteres.' }),
  balance: zod
    .number({ required_error: 'Insira um valor para transferir.' })
}).strict('Por favor, insira apenas os campos de username e password.')
