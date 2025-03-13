'use client'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Input } from './input'

interface PasswordInputProps extends React.ComponentProps<'input'> {
  className?: string
}

function PasswordInput({ className = '', ...props }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  return (
    <div className='relative'>
      <Input
        {...props}
        type={isPasswordVisible ? 'text' : 'password'}
        className={className}
      />
      <button
        tabIndex={-1}
        type='button'
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'>
        {isPasswordVisible ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
      </button>
    </div>
  )
}
export default PasswordInput
