import { api } from '../lib/axios'
import { User } from '../types/user.types'

type FetchUsersResponse = User[]

export async function fetchUsers() {
  const { data } = await api.get<FetchUsersResponse>('/users')

  return data
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: string
  parkingId: number | null
}

export async function createUser({
  email,
  name,
  role,
  password,
  parkingId,
}: CreateUserRequest) {
  await api.post('/users', {
    email,
    name,
    role,
    password,
    parking_id: parkingId,
  })
}
