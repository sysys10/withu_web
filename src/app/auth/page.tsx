import LoginForm from '@/components/auth/LoginForm'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthPage() {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center px-4 max-w-lg mx-auto'>
      <div className='flex flex-col items-center gap-6 w-full max-w-md bg-white p-8 rounded-xl'>
        <div className='mb-10'>
          <h1 className='text-2xl font-bold font-caveat'>WithU</h1>
        </div>
        <LoginForm />

        <div className='flex items-center w-full my-2'>
          <div className='flex-grow h-px bg-gray-200'></div>
          <p className='mx-4 text-sm text-gray-400'>또는</p>
          <div className='flex-grow h-px bg-gray-200'></div>
        </div>
        <Link
          href='/register'
          className='text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 my-2'>
          회원가입
        </Link>
        <Image
          src='/images/kakao_login_large_wide.png'
          alt='카카오 로그인'
          width={400}
          height={40}
        />
      </div>

      <p className='mt-8 text-sm text-gray-500'>© {new Date().getFullYear()} WithU. All rights reserved.</p>
    </div>
  )
}
