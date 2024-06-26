import { useToast } from '@chakra-ui/react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createBooking } from '../data/booking'

export function useCreateBooking() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['active-bookings'] }),
        queryClient.invalidateQueries({ queryKey: ['parking-spaces'] }),
        queryClient.invalidateQueries({
          queryKey: ['available-parking-spaces'],
        }),
      ])

      toast({
        title: 'Reserva criada',
        description: 'A reserva foi criada com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: AxiosError<{ messages: { message: string } }>) => {
      const errorMessage = error.response?.data.messages.message

      toast({
        title: 'Erro ao criar reserva',
        description: errorMessage ?? 'Erro desconhecido',
        status: 'error',
        duration: 1000 * 5, // 5 seconds
        isClosable: true,
      })
    },
  })

  return mutation
}
