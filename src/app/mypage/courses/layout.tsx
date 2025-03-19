'use client'

import { useEffect, useState } from 'react'

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? <div>{children}</div> : null
}
