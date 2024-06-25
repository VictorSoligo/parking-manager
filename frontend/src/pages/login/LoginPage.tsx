import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const errorMessage = await login(email, password)

    if (errorMessage) {
      setError(errorMessage)
    }
  }

  return (
    <Center h="100vh">
      <Stack
        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
        bg="whiteAlpha.900"
        p="16"
        rounded="md"
      >
        <Heading as="h1">Parking Manager</Heading>

        <Text fontSize="lg" color="gray.600">
          Por favor, faça seu login com os dados inserido durante o registro.
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack my="4" spacing="4">
            <FormControl>
              <FormLabel>Email</FormLabel>

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Senha</FormLabel>

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {error && (
              <Text fontSize="sm" color="red">
                {error}
              </Text>
            )}

            <Button
              loadingText="Carregando"
              size="lg"
              colorScheme="blue"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  )
}
