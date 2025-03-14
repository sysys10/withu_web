import { loginApi, registerApi } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { setAxiosHeader } from '@/utils/axiosheader'

type LoginResponse = {
  accessToken: string
  user: {
    id: string
    user_id: string
    email: string
    name: string
  }
}

function useLogin() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: LoginResponse) => {
      setAxiosHeader(data.accessToken)
      router.push('/home')
    },
    onError: (error: any) => {
      setServerError(error.response.data.message)
    }
  })

  return { login, isPending, serverError }
}

function useRegister() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      router.push('/auth')
    },
    onError: (error: any) => {
      setServerError(error.response.data.message)
    }
  })
  return { register, isPending, serverError }
}

export { useLogin, useRegister }
