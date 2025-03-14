type LoginFormValues = {
  id: string
  password: string
}

type RegisterFormValues = {
  id: string
  password: string
  passwordCheck: string
  email: string
}

export type { LoginFormValues, RegisterFormValues }
