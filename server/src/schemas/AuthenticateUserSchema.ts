import zod from 'zod'

export const authenticateUserSchema = zod.object({
  username: zod
    .string({ required_error: 'Insira um username' })
    .min(3, { message: 'O nome de usuário precisa ter pelo menos 3 caracteres' }),
  password: zod
    .string({ required_error: 'Insira uma senha' })
}).strict('Por favor, insira apenas os campos de username e password')
