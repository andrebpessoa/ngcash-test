import React from 'react'
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120
    }
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32
    }
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5
  }
}))

export function NotFound(): JSX.Element {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Nenhuma página encontrada.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}>
        Infelizmente essa página não foi encontrada. Você pode ter errado o
        link, ou esta página não existe mais.
      </Text>
      <Group position="center">
        <Button component="a" href="/" variant="subtle" size="md" color="grape">
          Voltar ao início
        </Button>
      </Group>
    </Container>
  )
}
