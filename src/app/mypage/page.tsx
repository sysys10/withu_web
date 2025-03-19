'use client'

import { useEffect, useState } from 'react'

import Profile from '@/components/profile/Profile'

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <Profile /> : null
}
