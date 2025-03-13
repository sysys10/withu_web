import LoginForm from '@/components/auth/LoginForm'
import SocialLogin from '@/components/auth/SocialLogin'
import BackIcons from '@/components/common/BackIcons'

export default function AuthPage() {
  return (
    <div className='flex flex-col w-full items-center justify-center px-4 max-w-lg mx-auto relative'>
      <div className='absolute top-4 right-4'>
        <BackIcons />
      </div>

      <div className='flex flex-col items-center gap-6 w-full max-w-md bg-white p-8 rounded-xl'>
        <div className='mb-4'>
          <h1 className='text-5xl font-bold font-caveat text-blue-400'>WithU</h1>
        </div>
        <LoginForm />

        <div className='flex items-center w-full my-2'>
          <div className='flex-grow h-px bg-gray-200'></div>
          <p className='mx-4 text-sm text-gray-400'>또는</p>
          <div className='flex-grow h-px bg-gray-200'></div>
        </div>

        <SocialLogin />
      </div>

      <p className='mt-8 text-sm text-gray-500'>© {new Date().getFullYear()} WithU. All rights reserved.</p>
    </div>
  )
}
