import React, { useState } from 'react'
import {
  Paper,
  Container,
  Group,
  Button,
  NumberInput,
  createStyles,
  TextInput,
  Text,
  Anchor,
  Center,
  Box
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { ITransaction } from '../../interfaces/ITransaction'
import { IconArrowLeft } from '@tabler/icons'

const api = import.meta.env.VITE_API_URL as string

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse'
    }
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center'
    }
  }
}))

export function Transaction(): JSX.Element {
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { token } = useAuth()

  const form = useForm({
    initialValues: {
      username: '',
      balance: 1
    }
  })

  const handleSubmit = async ({ username, balance }: ITransaction) => {
    setLoading(true)
    setErrorMessage('')

    await axios
      .post(
        `${api}/account/transaction`,
        { username, balance },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(({ data }) => {
        setSuccessMessage(data.message)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setErrorMessage(error.response.data.message)
      })
      .finally(() => {
        form.setValues({ username: '', balance: undefined })
      })
  }

  return (
    <Container size={800} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Para quem você quer realizar uma transferência?"
            placeholder="Nome de usuário"
            required
            {...form.getInputProps('username')}
          />
          <NumberInput
            label="Qual o valor?"
            placeholder="R$100,00"
            required
            step={0.1}
            precision={2}
            {...form.getInputProps('balance')}
          />
          <Text weight={700} my="lg" color="lime" size="sm" align="center">
            {successMessage}
          </Text>
          <Text weight={700} my="lg" color="red" size="sm" align="center">
            {errorMessage}
          </Text>
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor
              href="/account"
              color="dimmed"
              size="sm"
              className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Voltar à pagina da conta</Box>
              </Center>
            </Anchor>
            <Button
              color="grape"
              className={classes.control}
              type="submit"
              loading={loading}>
              Enviar
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
