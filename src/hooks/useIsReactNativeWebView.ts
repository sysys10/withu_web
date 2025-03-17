'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    ReactNativeWebview?: {
      postMessage: (message: string) => void
    }
  }
}

const useIsReactNativeWebview = () => {
  const [isReactNativeWebview, setIsReactNativeWebview] = useState(false)

  useEffect(() => {
    if (window.ReactNativeWebview) setIsReactNativeWebview(true)
  }, [])

  return isReactNativeWebview
}

export default useIsReactNativeWebview
