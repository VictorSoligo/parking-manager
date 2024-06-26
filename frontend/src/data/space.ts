import { api } from '../lib/axios'

export async function createSpace(identification: string) {
  await api.post('/parkings/spaces', { identification })
}
