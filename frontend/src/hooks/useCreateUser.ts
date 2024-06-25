import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../data/user'

export function useCreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return mutation
}
