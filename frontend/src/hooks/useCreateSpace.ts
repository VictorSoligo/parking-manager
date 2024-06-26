import { useMutation } from '@tanstack/react-query'
import { createSpace } from '../data/space'

export function useCreateSpace() {
  const mutation = useMutation<void, Error, string>({
    mutationFn: createSpace,
  })

  return mutation
}
