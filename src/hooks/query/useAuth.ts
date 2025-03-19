import { axiosPublic } from '@/api/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginFormValues, RegisterFormValues, WithuUser } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// 로그인 API 호출
const loginApi = async (values: LoginFormValues) => {
  const response = await axiosPublic.post('/api/auth/login', {
    email: values.email,
    password: values.password
  })
  return response.data
}

// 회원가입 API 호출
const registerApi = async (values: RegisterFormValues) => {
  const response = await axiosPublic.post('/api/auth/register', {
    email: values.email,
    password: values.password,
    name: values.name
  })
  return response.data
}

// 로그인 훅
function useLogin() {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: { user: WithuUser }) => {
      // 사용자 정보 저장
      setUser(data.user)

      // 쿠키는 서버에서 설정하므로 여기서는 별도 처리 불필요
      // 홈으로 리디렉션
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
      return await axiosPublic.post('/api/auth/signout')
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
