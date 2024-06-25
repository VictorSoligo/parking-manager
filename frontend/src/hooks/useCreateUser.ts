import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../data/user'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

export function useCreateUser() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })

      toast({
        title: 'Sucesso',
        description: `Usuário foi cadastrado`,
        status: 'success',
        duration: 1000 * 5, // 5 seconds
        isClosable: false,
      })
    },
    onError: (error: AxiosError<{ messages: { message: string } }>) => {
      const errorMessage = error.response?.data?.messages?.message

      toast({
        title: 'Erro',
        description: errorMessage,
        status: 'error',
        duration: 1000 * 5, // 5 seconds
        isClosable: false,
      })
    },
  })

  return mutation
}
