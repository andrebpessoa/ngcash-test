import React, { useState } from 'react'
import axios from 'axios'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Navigate, useNavigate } from 'react-router-dom'

import { ILogin } from '../../interfaces/ILogin'
import { useAuth } from '../../hooks/useAuth'
import { IAuth } from '../../context/AuthProvider'

export function Login(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { onLogin, user } = useAuth()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false
    }
  })

  const handleSubmit = async ({ username, password, rememberMe }: ILogin) => {
    setLoading(true)
    setErrorMessage('')

    await axios
      .post('http://localhost:3001/authenticate', { username, password })
      .then(({ data }) => {
        setLoading(false)
        onLogin(data as IAuth, rememberMe)
        navigate('/account', { replace: true })
      })
      .catch((error) => {
        setLoading(false)
        setErrorMessage(error.response.data.message)
      })
  }

  if (user) {
    return <Navigate to="/account" replace />
  }

  return (
    <Container size={420} my={40}>
      <Title align="center" sx={() => ({ fontWeight: 900 })}>
        NG.CASH
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Ainda não tem uma conta?{' '}
        <Anchor<'a'> color="grape" href="/register" size="sm">
          Criar uma conta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Nome de usuário"
            placeholder="Nome de usuário"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            mt="md"
            required
            {...form.getInputProps('password')}
          />
          <Text weight={700} my="lg" color="red" size="sm" align="center">
            {errorMessage}
          </Text>
          <Group position="apart" mt="lg">
            <Checkbox
              label="Lembrar de mim"
              sx={{ lineHeight: 1 }}
              {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
          </Group>
          <Button
            color="grape"
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
