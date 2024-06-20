import { ChakraProvider } from '@chakra-ui/react'
import { LoginPage } from './pages/login/LoginPage'

export function App() {
  return (
    <>
      <ChakraProvider>
        <LoginPage />
      </ChakraProvider>
    </>
  )
}
