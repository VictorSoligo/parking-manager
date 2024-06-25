import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes'
import { AuthContextProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}
