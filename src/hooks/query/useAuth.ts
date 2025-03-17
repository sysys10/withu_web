// src/hooks/query/useAuth.ts
import { loginApi, registerApi } from '@/api/authApi'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginFormValues, RegisterFormValues, WithuUser } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { setAxiosHeader } from '@/utils/axiosheader'

type LoginResponse = {
  accessToken: string
  user: WithuUser
}

// 로그인 훅
function useLogin() {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)
  const setAccessToken = useAuthStore(state => state.setAccessToken)
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      setAxiosHeader(data.accessToken)
      router.push('/home')
    },
    onError: (error: any) => {
      setServerError(error.response?.data?.error || '로그인에 실패했습니다.')
    }
  })

  return { login, isPending, serverError }
}

// 회원가입 훅
function useRegister() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      router.push('/auth')
    },
    onError: (error: any) => {
      setServerError(error.response?.data?.error || '회원가입에 실패했습니다.')
    }
  })

  return { register, isPending, serverError }
}

// 로그아웃 훅
function useLogout() {
  const router = useRouter()
  const logout = useAuthStore(state => state.logout)

  const { mutate: logoutFn, isPending } = useMutation({
    mutationFn: async () => {
      // 서버에 로그아웃 요청
      return await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include'
      })
    },
    onSuccess: () => {
      // 로컬 스토어 초기화
      logout()

      // 홈으로 리디렉션
      router.push('/home')
    }
  })

  return { logout: logoutFn, isPending }
}

export { useLogin, useRegister, useLogout }
