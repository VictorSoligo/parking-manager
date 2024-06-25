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
}

export async function createUser({
  email,
  name,
  role,
  password,
}: CreateUserRequest) {
  await api.post('/users', {
    email,
    name,
    role,
    password,
  })
}
