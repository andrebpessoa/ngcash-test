import React, { createContext, ReactNode, useMemo, useState } from 'react'

import { IUser } from '../interfaces/IUser'

export interface IAuth {
  user: IUser
  token: string
}

type AuthContextType = {
  token: string | null
  user: IUser | null
  onLogin: (auth: IAuth, remember: boolean) => void
  onLogout: () => void
}

function getLocalState(key: string): IAuth | null {
  const jsonValue = localStorage.getItem(key)
  if (jsonValue != null) return JSON.parse(jsonValue)
  return null
}

export const AuthContext = createContext({} as AuthContextType)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(
    getLocalState('user')?.user ?? null
  )
  const [token, setToken] = useState<string | null>(
    getLocalState('user')?.token ?? null
  )

  const onLogin = (auth: IAuth, remember: boolean) => {
    setUser(auth.user)
    setToken(auth.token)

    if (remember) {
      localStorage.setItem('user', JSON.stringify(auth))
    }
  }

  const onLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
  }

  const authContextValue = useMemo(
    () => ({
      user,
      token,
      onLogin,
      onLogout
    }),
    [user, token]
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
