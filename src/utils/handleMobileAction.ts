'use client'

import { useRouter } from 'next/navigation'

import useIsReactNativeWebview from '@/hooks/useIsReactNativeWebView'

function handleCreateCourse() {
  const isInAppWebView = useIsReactNativeWebview()
  const router = useRouter()

  if (isInAppWebView) {
    alert('앱 열기')
    window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'OPEN_COURSE_ADD', data: {} }))
  } else {
    // 3. 일반 웹 브라우저에서 실행 중인 경우
    // 딥링크로 앱 열기 시도 (앱이 설치되어 있다면)
    try {
      // 앱이 설치되어 있는지 확인하는 방법은 없으므로 timeout을 사용
      const appDeepLink = 'WithU_1://course/add' // 앱의 딥링크 스키마
      const webFallback = '/course/add' // 앱이 없으면 웹페이지로

      alert('앱 열기')

      // 딥링크를 통해 앱 열기
      window.location.href = appDeepLink

      // 일정 시간 후에 앱이 열리지 않으면 웹페이지로 리디렉션
      setTimeout(() => {
        // 페이지가 여전히 활성 상태인지 확인 (앱으로 전환되지 않았는지)
        if (document.hidden === false) {
          router.push(webFallback)
        }
      }, 1000)
    } catch (error) {
      console.error('앱 열기 실패:', error)
      router.push('/course/add')
    }
  }
}

export { handleCreateCourse }
