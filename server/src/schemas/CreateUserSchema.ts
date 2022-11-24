import zod from 'zod'

export const createUserSchema = zod.object({
  username: zod
    .string({ required_error: 'Insira um username.' })
    .min(3, { message: 'O nome de usuário precisa ter pelo menos 3 caracteres.' }),
  password: zod
    .string({ required_error: 'Insira uma senha.' })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, { message: 'A senha deve conter no mínimo 8 caracteres, com pelo menos 1 letra minúscula, 1 letra maiúscula e 1 número.' })
}).strict('Por favor, insira apenas os campos de username e password.')
