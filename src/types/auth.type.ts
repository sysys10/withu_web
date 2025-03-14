import { User } from '@prisma/client'

type LoginFormValues = {
  email: string
  password: string
}

type RegisterFormValues = {
  email: string
  password: string
  passwordCheck: string
  name: string
}

type WithuUser = Pick<User, 'id' | 'email' | 'name'>

export type { LoginFormValues, RegisterFormValues, WithuUser }
