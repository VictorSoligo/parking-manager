import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSpace } from '../data/space'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

export function useCreateSpace() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: createSpace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['parking-spaces'] })

      toast({
        title: 'Vaga criada',
        description: 'A vaga foi cadastrada com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: AxiosError<{ messages: { message: string } }>) => {
      const errorMessage = error.response?.data.messages.message

      toast({
        title: 'Erro ao criar vaga',
        description: errorMessage ?? 'Erro desconhecido',
        status: 'error',
        duration: 1000 * 5, // 5 seconds
        isClosable: true,
      })
    },
  })

  return mutation
}
