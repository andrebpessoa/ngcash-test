import React from 'react'
import { Paper, Title, Container, Button, Stack } from '@mantine/core'
import { TransactionHistory } from '../transaction-history'
import { useTransactionHistory } from '../../hooks/useTransactionHistory'
import { useAuth } from '../../hooks/useAuth'

export function UserInfo(): JSX.Element {
  const { token } = useAuth()
  const { data } = useTransactionHistory(token)
  return (
    <Container size={800} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Stack>
          <Button
            component="a"
            href="/account/transaction"
            size="md"
            color="grape">
            Realizar transferência
          </Button>
          <Title size="h2" align="center" fw={900}>
            Histórico de transações
          </Title>
          {data && <TransactionHistory data={data} />}
        </Stack>
      </Paper>
    </Container>
  )
}
