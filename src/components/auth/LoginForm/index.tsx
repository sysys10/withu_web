'use client'

import { LoginFormValues } from '@/types/auth.type'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useLogin } from '@/hooks/query/useAuth'
import useForm from '@/hooks/useForm'

import { LoginValidation } from '@/utils/validation'

export default function LoginForm() {
  const { login, isPending, serverError } = useLogin()

  const { values, errors, handleChange, handleSubmit } = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values: LoginFormValues) => {
      login(values)
    },
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
            placeholder='이메일'
            name='email'
            value={values.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}
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
          disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
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
