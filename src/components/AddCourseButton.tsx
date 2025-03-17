'use client'

import { useRouter } from 'next/navigation'

import useIsReactNativeWebview from '@/hooks/useIsReactNativeWebView'

export default function AddCourseButton({ text }: { text: string }) {
  const isInAppWebView = useIsReactNativeWebview()
  const router = useRouter()

  const handleCreateCourse = () => {
    if (isInAppWebView) {
      alert('웹 액션 호출')
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'OPEN_COURSE_ADD', data: {} }))
    } else {
      try {
        const appDeepLink = 'WithU_1://course/add'
        window.location.href = appDeepLink
      } catch (error) {
        alert('앱 열기 실패')
      }
    }
  }

  return (
    <button
      className='bg-blue-400 rounded-lg text-white p-2'
      onClick={handleCreateCourse}>
      {text}
    </button>
  )
}
