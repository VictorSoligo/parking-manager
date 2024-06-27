import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes'

export function App() {
  return (
    <>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </>
  )
}
