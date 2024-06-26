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
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: 'Erro ao criar estacionamento',
        description: error.response?.data.message || 'Erro desconhecido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  return mutation
}
