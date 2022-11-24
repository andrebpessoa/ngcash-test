import React, { useState } from 'react'
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { IRegister } from '../../interfaces/IRegister'

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

export function Register(): JSX.Element {
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    }
  })

  const handleSubmit = async ({ username, password }: IRegister) => {
    setLoading(true)
    setErrorMessage('')

    await axios
      .post(`${api}/register`, { username, password })
      .then(() => {
        setLoading(false)
        setSuccessMessage(
          'Conta criada com sucesso! Redirecionando para a página de Login.'
        )
        setTimeout(() => navigate('/', { replace: true }), 5000)
      })
      .catch((error) => {
        console.log('client', error)

        setLoading(false)
        if (error.response) return setErrorMessage(error.response.data.message)
        return setErrorMessage('Internal Server Error')
      })
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Crie uma conta na NG.CASH
      </Title>
      <Text color="dimmed" size="sm" align="center">
        É só colocar um nome de usuário e uma senha
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Nome de usuário"
            placeholder="Nome de usuário"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Sua senha"
            placeholder="Sua senha"
            required
            {...form.getInputProps('password')}
          />
          <Text weight={700} my="lg" color="lime" size="sm" align="center">
            {successMessage}
          </Text>
          <Text weight={700} my="lg" color="red" size="sm" align="center">
            {errorMessage}
          </Text>
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor
              href="/"
              color="dimmed"
              size="sm"
              className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Voltar à pagina de login</Box>
              </Center>
            </Anchor>
            <Button
              color="grape"
              className={classes.control}
              type="submit"
              loading={loading}>
              Criar conta
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
