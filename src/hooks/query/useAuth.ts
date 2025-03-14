import { loginApi, registerApi } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function useLogin() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      router.push('/home')
    },
    onError: () => {
      setServerError('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.')
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
      router.push('/auth/login')
    },
    onError: () => {
      setServerError('회원가입에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.')
    }
  })
  return { register, isPending, serverError }
}

export { useLogin, useRegister }
