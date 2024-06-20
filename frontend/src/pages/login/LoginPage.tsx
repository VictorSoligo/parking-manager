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
    <Center h="100vh" bg="purple.200">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
        <Image
          src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-violet.png"
          maxW="70px"
          mb="8"
          mx="auto"
          alt="Icone de raio na cor roxa"
        />
        <Heading as="h1">Log in.</Heading>
        <Text fontSize="lg" color="gray.600">
          Please log in with the data you entered during registration
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
                  leftAddon={<AtSignIcon color="purple.500" />}
                />
                <InputField
                  name="password"
                  type="password"
                  label="Password"
                  leftAddon={<LockIcon color="purple.500" />}
                />
                <Checkbox colorScheme="purple"> Keep me logged in</Checkbox>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Whispering to our servers"
                  size="lg"
                  colorScheme="purple"
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
            <Button colorScheme="purple" variant="link">
              Sign up
            </Button>
          </Text> */}
          <Button colorScheme="purple" variant="link">
            Forgot password?
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}
