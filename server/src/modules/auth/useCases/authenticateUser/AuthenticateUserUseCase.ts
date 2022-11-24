import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import 'dotenv/config'

import { AuthenticateUserDTO } from '../../dtos/AuthenticateUserDTO'
import prisma from '@/prisma'
import ErrorMiddleware from '@/errors/ErrorMiddleware'
import { IAuthenticateUserReturn } from '@/interfaces/IAuthenticateUserReturn'

const JWT_SECRET = process.env.JWT_TOKEN_SECRET ?? 'segredo'

class AuthenticateUserUseCase {
  async execute ({ username, password }: AuthenticateUserDTO): Promise<IAuthenticateUserReturn> {
    const userExists = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (userExists === null) {
      throw new ErrorMiddleware('Usuário ou senha incorretos', 401)
    }

    const matchPassword = await compare(password, userExists.password)

    if (!matchPassword) {
      throw new ErrorMiddleware('Usuário ou senha incorretos', 401)
    }

    const user = {
      id: userExists.id,
      username: userExists.username
    }

    const token = sign(user, JWT_SECRET, {
      expiresIn: '24h'
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserUseCase
