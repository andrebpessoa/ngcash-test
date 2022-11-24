import { hash } from 'bcrypt'
import { User } from '@prisma/client'

import prisma from '@/prisma'
import { CreateUserDTO } from '@/modules/user/dtos/CreateUserDTO'
import ErrorMiddleware from '@/errors/ErrorMiddleware'

class CreateUserUseCase {
  async execute ({ username, password }: CreateUserDTO): Promise<User> {
    if (username === undefined || password === undefined) {
      throw new ErrorMiddleware('Por favor, insira um nome de usuário e uma senha', 422)
    }

    const usernameAlreadyExists = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (usernameAlreadyExists !== null) {
      throw new ErrorMiddleware('O nome de usuário escolhido já está sendo usado', 409)
    }

    const hashedPassword = await hash(password, 10)

    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        account: {
          create: {
            balance: 100
          }
        }
      }
    })
  }
}

export default CreateUserUseCase
