'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void
    }
  }
}

const useIsReactNativeWebview = () => {
  const [isReactNativeWebview, setIsReactNativeWebview] = useState(false)

  useEffect(() => {
    if (window.ReactNativeWebView) setIsReactNativeWebview(true)
  }, [])

  return isReactNativeWebview
}

export default useIsReactNativeWebview
