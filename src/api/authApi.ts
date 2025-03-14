import { axiosPublic } from '@/api/axiosInstance'
import { LoginFormValues, RegisterFormValues } from '@/types'

const loginApi = async (values: LoginFormValues) => {
  const response = await axiosPublic.post('/api/auth/login', {
    email: values.email,
    password: values.password
  })
  console.log('Login response:', response.data)
  return response.data
}

const registerApi = async (values: RegisterFormValues) => {
  const response = await axiosPublic.post('/api/auth/register', {
    email: values.email,
    password: values.password,
    name: values.name
  })
  return response.data
}

export { loginApi, registerApi }
