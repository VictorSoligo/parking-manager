import { useMutation, useQueryClient } from '@tanstack/react-query'
import { exitBooking } from '../data/booking'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

export function useFinishBooking() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: exitBooking,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['active-bookings'] }),
        queryClient.invalidateQueries({ queryKey: ['finished-bookings'] }),
        queryClient.invalidateQueries({ queryKey: ['parking-spaces'] }),
        queryClient.invalidateQueries({ queryKey: ['financial-report'] }),
        queryClient.invalidateQueries({
          queryKey: ['available-parking-spaces'],
        }),
      ])

      toast({
        title: 'Saída registrada',
        description: 'Reserva finalizada com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: AxiosError<{ messages: { message: string } }>) => {
      const errorMessage = error.response?.data.messages.message

      toast({
        title: 'Erro ao registrar saída',
        description: errorMessage ?? 'Erro desconhecido',
        status: 'error',
        duration: 1000 * 5, // 5 seconds
        isClosable: true,
      })
    },
  })

  return mutation
}
