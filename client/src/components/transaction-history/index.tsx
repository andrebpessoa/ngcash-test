import React from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text
} from '@mantine/core'
import { formatBRL } from '../../utils/FormatBRL'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important'
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21
  }
}))

interface User {
  user: Username
}

interface Username {
  username: string
}

interface RowData {
  id: number
  creditedAccount: User
  debitedAccount: User
  value: string
  createdAt: string
}

interface TableProps {
  data: RowData[]
}

interface ThProps {
  children: React.ReactNode
}

function Th({ children }: ThProps) {
  const { classes } = useStyles()

  return (
    <th className={classes.th}>
      <UnstyledButton className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
        </Group>
      </UnstyledButton>
    </th>
  )
}

export function TransactionHistory({ data }: TableProps) {
  const rows = data.map((row) => (
    <tr key={row.creditedAccount.user.username}>
      <td>{row.creditedAccount.user.username}</td>
      <td>{row.debitedAccount.user.username}</td>
      <td>{formatBRL(Number(row.value))}</td>
      <td>{`${new Date(row.createdAt).toLocaleString()}`}</td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table
        highlightOnHover
        withBorder
        withColumnBorders
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}>
        <thead>
          <tr>
            <Th>Conta de origem</Th>
            <Th>Conta enviada</Th>
            <Th>Valor</Th>
            <Th>Data</Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={4}>
                <Text weight={500} align="center">
                  Nenhuma transação
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
