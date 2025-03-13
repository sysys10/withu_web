'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useForm from '@/hooks/useForm'

export default function LoginForm() {
  const { form, onChange } = useForm({
    id: '',
    password: ''
  })
  return (
    <div className='flex flex-col gap-2 w-full items-center justify-center'>
      <Input
        placeholder='아이디'
        name='id'
        value={form.id}
        onChange={onChange}
      />
      <Input
        placeholder='비밀번호'
        name='password'
        value={form.password}
        onChange={onChange}
      />
      <Button size='lg'>로그인</Button>
    </div>
  )
}
