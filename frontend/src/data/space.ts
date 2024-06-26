import { api } from '../lib/axios'
import { Space } from '../types/space.types'

type FetchSpacesResponse = Space[]

export async function fetchSpaces() {
  const { data } = await api.get<FetchSpacesResponse>('/parkings/spaces')

  return data
}

type FetchAvailableSpacesResponse = Space[]

export async function fetchAvailableSpaces() {
  const { data } = await api.get<FetchAvailableSpacesResponse>(
    '/parkings/spaces/availables',
  )

  return data
}

interface CreateSpaceRequest {
  identification: string
}

export async function createSpace({ identification }: CreateSpaceRequest) {
  await api.post('/parkings/spaces', { identification })
}
