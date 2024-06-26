import { api } from '../lib/axios'
import { Space } from '../types/space.types'

type FetchSpacesResponse = Space[]

export async function fetchSpaces() {
  const { data } = await api.get<FetchSpacesResponse>('/parkings/spaces')

  return data
}

interface CreateSpaceRequest {
  identification: string
}

export async function createSpace({ identification }: CreateSpaceRequest) {
  await api.post('/parkings/spaces', { identification })
}
