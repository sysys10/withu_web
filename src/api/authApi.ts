import { axiosPublic } from '@/api/axiosInstance'
import { LoginFormValues, RegisterFormValues } from '@/types'

const loginApi = async (values: LoginFormValues) => {
  console.log(values)
  const response = await axiosPublic.post('/auth/login', {
    user_id: values.id,
    password: values.password
  })
  console.log(response)
  return response.data
}

const registerApi = async (values: RegisterFormValues) => {
  const response = await axiosPublic.post('/api/auth/register', {
    user_id: values.id,
    password: values.password,
    email: values.email
  })
  console.log(response)
  return response.data
}
export { loginApi, registerApi }
