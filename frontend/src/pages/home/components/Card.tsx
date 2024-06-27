import { Box } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" width="12rem">
      {children}
    </Box>
  )
}
