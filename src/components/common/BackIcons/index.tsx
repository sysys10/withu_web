'use client'
import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackIcons() {
  const router = useRouter()
  return (
    <XIcon
      size={24}
      className='text-gray-500 hover:text-gray-700 transition-colors'
      onClick={() => router.back()}
    />
  )
}
