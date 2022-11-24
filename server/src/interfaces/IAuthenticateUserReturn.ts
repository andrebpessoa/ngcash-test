export interface IAuthenticateUserReturn {
  user: IUser
  token: string
}

interface IUser {
  id: number
  username: string
}
