import { loginApi, registerApi } from '@/api/authApi'
import { useAuthStore } from '@/store/useAuthStore'
import { WithuUser } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { setAxiosHeader } from '@/utils/axiosheader'

type LoginResponse = {
  accessToken: string
  user: WithuUser
}

function useLogin() {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: LoginResponse) => {
      setAxiosHeader(data.accessToken)
      setUser(data.user)
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
