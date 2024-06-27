import {
  Button,
  Center,
  Checkbox,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { InputField } from './components/InputField'
import { Formik, Form } from 'formik'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'

export const LoginPage = () => {
  return (
    <Center h="100vh">
      <Stack
        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
        bg="whiteAlpha.900"
        p="20"
        rounded="md"
      >
        <Image src="#" maxW="70px" mb="8" mx="auto" />
        <Heading as="h1">Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          Por favor, faça seu login com os dados inserido durante o registro.
        </Text>

        <Formik
          onSubmit={(
            values: { email: string; password: string },
            {
              setSubmitting,
            }: { setSubmitting: (isSubmitting: boolean) => void },
          ) => {
            setTimeout(() => {
              console.log(values)
              setSubmitting(false)
            }, 1000)
          }}
          initialValues={{ email: '', password: '' }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack my="4" spacing="6">
                <InputField
                  name="email"
                  type="email"
                  label="Email"
                  leftAddon={<AtSignIcon color="blue.500" />}
                />
                <InputField
                  name="password"
                  type="password"
                  label="Senha"
                  leftAddon={<LockIcon color="blue.500" />}
                />
                <Checkbox colorScheme="blue"> Mantenha-me conectado</Checkbox>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Whispering to our servers"
                  size="lg"
                  colorScheme="blue"
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        <Stack justify="center" color="gray.600" spacing="3">
          {/* <Text as="div" textAlign="center">
            <span>Dont have an account?</span>
            <Button colorScheme="blue" variant="link">
              Sign up
            </Button>
          </Text> */}
          <Button
            colorScheme="blue
          "
            variant="link"
          >
            Esqueceu seu senha?
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}
