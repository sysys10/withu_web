'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useForm from '@/hooks/useForm'
import { LoginValidation } from '@/utils/validation'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type LoginFormValues = {
  id: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      setServerError(null)

      const response = await axios.post('/api/auth/login', {
        user_id: values.id,
        password: values.password
      })

      console.log('로그인 시도:', values, response)

      // 로그인 성공 시 홈 페이지로 이동
      router.push('/home')
    } catch (error) {
      console.error('로그인 오류:', error)
      setServerError('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.')
    }
  }

  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<LoginFormValues>({
    initialValues: {
      id: '',
      password: ''
    },
    onSubmit,
    validate: LoginValidation
  })

  return (
    <div className='flex flex-col gap-2 w-full items-center justify-center'>
      {serverError && <div className='mb-2 p-3 bg-red-100 text-red-600 rounded-md w-full text-sm'>{serverError}</div>}

      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col gap-2'>
        <div>
          <Input
            placeholder='아이디'
            name='id'
            value={values.id}
            onChange={handleChange}
            className={errors.id ? 'border-red-500' : ''}
          />
          {errors.id && <p className='mt-1 text-sm text-red-500'>{errors.id}</p>}
        </div>

        <div>
          <Input
            placeholder='비밀번호'
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange}
            className={errors.password ? 'border-red-500' : ''}
          />
          {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password}</p>}
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className='flex justify-between w-full mt-1'>
        <Link
          href='/auth/register'
          className='text-sm text-gray-500'>
          회원가입
        </Link>
        <div className='flex gap-2'>
          <Link
            href='/auth/find-id'
            className='text-sm text-gray-500'>
            아이디 찾기
          </Link>
          <Link
            href='/auth/find-password'
            className='text-sm text-gray-500'>
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  )
}
