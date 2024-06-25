export interface User {
  id: string
  name: string
  email: string
  parking_id: string | null
  role: 'admin' | 'manager'
}
