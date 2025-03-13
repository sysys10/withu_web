'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useForm from '@/hooks/useForm'

export default function Page() {
  const { form, onChange } = useForm({
    id: '',
    password: ''
  })
  return (
    <div>
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
