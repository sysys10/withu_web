import LoginForm from '@/components/auth/LoginForm'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-10 pb-20'>
      <h1 className='text-4xl font-bold font-caveat'>With U</h1>
      <LoginForm />
    </div>
  )
}
