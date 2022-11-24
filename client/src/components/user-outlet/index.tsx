import React from 'react'
import { Badge, Button, Container, Group, Text, Title } from '@mantine/core'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { useBalance } from '../../hooks/useBalance'
import { formatBRL } from '../../utils/FormatBRL'

export function UserOutlet(): JSX.Element {
  const { user, token, onLogout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { data } = useBalance(user?.id, token)

  const handleLogout = () => {
    onLogout()
    navigate('/', { replace: true })
  }

  const displayContent = () => {
    if (user) {
      return (
        <>
          <Container size={800} my={40}>
            <Group align="center" position="apart" grow>
              <Group align="center">
                <Text
                  sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                  fz="md"
                  fw={700}
                  align="center">
                  Seu saldo:
                </Text>
                <Badge size="lg">
                  {data && formatBRL(Number(data.balance))}
                </Badge>
              </Group>
              <Group position="center">
                <Title align="center" sx={() => ({ fontWeight: 900 })}>
                  NG.CASH
                </Title>
              </Group>
              <Group position="right">
                <Button
                  component="a"
                  href="/"
                  size="md"
                  color="grape"
                  onClick={handleLogout}>
                  Sair
                </Button>
              </Group>
            </Group>
          </Container>

          <Outlet />
        </>
      )
    }

    return <Navigate to="/" state={{ from: location }} replace />
  }

  return displayContent()
}
