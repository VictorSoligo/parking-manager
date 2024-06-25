import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes'
import { AuthContextProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <AppRouter />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
