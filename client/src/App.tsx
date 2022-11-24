import React from 'react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from './components/login'
import { NotFound } from './components/not-found'
import { Register } from './components/register'
import { UserInfo } from './components/user-info'
import { Transaction } from './components/transaction'
import { UserOutlet } from './components/user-outlet'

export function App(): JSX.Element {
  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<UserOutlet />}>
              <Route index element={<UserInfo />} />
              <Route path="transaction" element={<Transaction />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}
