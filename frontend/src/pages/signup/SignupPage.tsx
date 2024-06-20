import {
  Button,
  Center,
  Checkbox,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { InputField } from '../login/components/InputField'
import { Formik, Form } from 'formik'
import { AtSignIcon, LockIcon, InfoIcon } from '@chakra-ui/icons'

export const SignupPage = () => {
  return (
    <Center h="100%" bg="purple.200">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
        <Image src="#" maxW="70px" mb="8" mx="auto" />
        <Heading as="h1">Sign up.</Heading>
        <Text fontSize="lg" color="gray.600">
          Please fill in the information below to create an account.
        </Text>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
          }}
          onSubmit={(
            values: {
              email: string
              password: string
              name: string
              confirmPassword: string
              agreeToTerms: boolean
            },
            {
              setSubmitting,
            }: { setSubmitting: (isSubmitting: boolean) => void },
          ) => {
            setTimeout(() => {
              console.log(values)
              setSubmitting(false)
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack my="4" spacing="6">
                <InputField
                  name="name"
                  type="text"
                  label="Name"
                  leftAddon={<InfoIcon color="purple.500" />}
                />
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
                <InputField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  leftAddon={<LockIcon color="purple.500" />}
                />
                <Checkbox name="agreeToTerms" colorScheme="purple">
                  I agree to the terms and conditions
                </Checkbox>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Whispering to our servers"
                  size="lg"
                  colorScheme="purple"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Already have an account?</span>
            <Button colorScheme="purple" variant="link">
              Log in
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Center>
  )
}
