import { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'

export interface IPayload {
  id: number
  username: string
  iat: number
  exp: number
}

const JWT_SECRET = process.env.JWT_TOKEN_SECRET ?? 'segredo'

const authenticateUser: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader === undefined) {
    return res.status(401).json({
      message: 'Token não encontrado'
    })
  }

  try {
    const userData = verify(authHeader, JWT_SECRET) as unknown as IPayload

    req.user = userData

    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido'
    })
  }
}

export default authenticateUser
