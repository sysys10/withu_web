'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/passwordInput'
import useForm from '@/hooks/useForm'
import { RegisterValidation } from '@/utils/validation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent } from 'react'

type RegisterFormValues = {
  id: string
  password: string
  passwordCheck: string
  email: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (values: RegisterFormValues): Promise<void> => {
    try {
      setServerError(null)
      const response = await axios.post('/api/auth/register', {
        user_id: values.id,
        password: values.password,
        email: values.email
      })

      console.log('회원가입 성공:', values, response)

      // 회원가입 성공 시 로그인 페이지로 이동
      router.push('/auth/login')
    } catch (error) {
      console.error('회원가입 오류:', error)
      setServerError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const { values, errors, isLoading, handleChange, handleSubmit, setValues, onBlur } = useForm<RegisterFormValues>({
    initialValues: {
      id: '',
      password: '',
      passwordCheck: '',
      email: ''
    },
    onSubmit,
    validate: RegisterValidation
  })

  // 하이픈이 포함된 name 속성 처리를 위한 변경 핸들러
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    // passwordCheck 필드명이 HTML에서는 'password-check'로 되어있을 수 있어 처리
    if (e.target.name === 'password-check') {
      setValues(prev => ({ ...prev, passwordCheck: e.target.value }))
    } else {
      handleChange(e)
    }
  }

  return (
    <div className='px-2 pt-10'>
      <div className='text-2xl font-bold font-caveat text-blue-400'>회원가입</div>

      {serverError && <div className='mt-4 p-3 bg-red-100 text-red-600 rounded-md'>{serverError}</div>}

      <form
        onSubmit={handleSubmit}
        className='flex flex-col pt-10 w-full gap-4'>
        <div>
          <Label htmlFor='id'>아이디</Label>
          <Input
            id='id'
            placeholder='아이디'
            name='id'
            onBlur={onBlur}
            value={values.id}
            onChange={handleFormChange}
            className={errors.id ? 'border-red-500' : ''}
          />
          {errors.id && <p className='mt-1 text-sm text-red-500'>{errors.id}</p>}
        </div>
        <div className='space-y-3'>
          <div>
            <Label htmlFor='password'>비밀번호</Label>
            <PasswordInput
              id='password'
              placeholder='비밀번호'
              onBlur={onBlur}
              name='password'
              value={values.password}
              onChange={handleFormChange}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password}</p>}
          </div>

          <div>
            <PasswordInput
              id='password-check'
              onBlur={onBlur}
              placeholder='비밀번호 재입력'
              name='password-check'
              value={values.passwordCheck}
              onChange={handleFormChange}
              className={errors.passwordCheck ? 'border-red-500' : ''}
            />
            {errors.passwordCheck && <p className='mt-1 text-sm text-red-500'>{errors.passwordCheck}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor='email'>이메일</Label>
          <Input
            id='email'
            placeholder='이메일'
            onBlur={onBlur}
            name='email'
            type='email'
            value={values.email}
            onChange={handleFormChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}
        </div>
        //약관동의
        <Button
          type='submit'
          size='lg'
          disabled={isLoading}>
          {isLoading ? '처리 중...' : '회원가입'}
        </Button>
      </form>
    </div>
  )
}
