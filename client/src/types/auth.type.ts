

export interface User {
  name: string
  email: string
  password: string
}

export type LogInType = Pick<User, 'email' | 'password'>[]
export type SignUpType = Pick<User, 'name' | 'email' | 'password'>[]
