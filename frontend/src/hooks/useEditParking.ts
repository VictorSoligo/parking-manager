import { useMutation } from '@tanstack/react-query'
import { editParking } from '../data/parking'
import { useToast } from '@chakra-ui/react'

export function useEditParking() {
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: editParking,
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        description: `Estacionamento editado com sucesso`,
        status: 'success',
        duration: 1000 * 5,
        isClosable: false,
      })
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: `Algo inesperado aconteceu`,
        status: 'error',
        duration: 1000 * 5,
        isClosable: false,
      })
    },
  })

  return mutation
}
