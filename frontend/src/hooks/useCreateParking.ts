import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createParking } from '../data/parking'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

export function useCreateParking() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: createParking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['parkings'] })

      toast({
        title: 'Estacionamento criado',
        description: 'O estacionamento foi cadastrado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: AxiosError<{ messages: { message: string } }>) => {
      const errorMessage = error.response?.data.messages.message

      toast({
        title: 'Erro ao criar estacionamento',
        description: errorMessage ?? 'Erro desconhecido',
        status: 'error',
        duration: 1000 * 5, // 5 seconds
        isClosable: true,
      })
    },
  })

  return mutation
}
