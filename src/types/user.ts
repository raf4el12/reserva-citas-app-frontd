export interface User {
  id: number
  name: string
  email: string
  photo: any
  role: string
  validateEmail: boolean
  deleted: boolean
  createdAt: string
  updatedAt: any
}

export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  USER = 'USER',
}
