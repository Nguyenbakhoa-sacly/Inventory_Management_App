

export interface User {
  name: string
  email: string
  password: string
}

export interface AuthState {
  token: string
  _id: string
  name: string
  rule: number
}

export type LogInType = Pick<User, 'email' | 'password'>[]
export type SignUpType = Pick<User, 'name' | 'email' | 'password'>[]
