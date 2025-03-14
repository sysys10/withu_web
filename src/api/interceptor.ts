// src/api/axiosSetup.ts
import { useAuthStore } from '@/store/useAuthStore'

import { axiosPrivate, axiosPublic } from './axiosInstance'

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false
// 토큰 갱신 중에 대기하는 요청들의 큐
let failedRequestsQueue: {
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
  config: any
}[] = []

export const setupAxiosInterceptors = () => {
  axiosPrivate.interceptors.request.use(
    config => {
      // 헤더에 토큰이 없으면 스토어에서 가져와서 추가
      if (!config.headers['Authorization']) {
        const accessToken = useAuthStore.getState().accessToken
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
      }
      return config
    },
    error => Promise.reject(error)
  )

  // 응답 인터셉터
  axiosPrivate.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      // 토큰 만료 오류이고 재시도하지 않은 요청인 경우
      if (
        (error.response?.status === 401 || error.response?.data?.code === 'TOKEN_EXPIRED') &&
        !originalRequest._retry
      ) {
        // 재시도 표시
        originalRequest._retry = true

        // 이미 토큰 갱신 중인 경우 요청을 큐에 추가
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve,
              reject,
              config: originalRequest
            })
          })
        }

        isRefreshing = true

        try {
          // 토큰 갱신 요청
          const response = await axiosPublic.post('/api/auth/refresh')
          const { accessToken, user } = response.data

          // 새 토큰과 사용자 정보 저장
          const authStore = useAuthStore.getState()
          authStore.setAccessToken(accessToken)
          authStore.setUser(user)

          // 원래 요청과 대기 중인 요청들의 헤더 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

          // 대기 중인 요청들 처리
          failedRequestsQueue.forEach(request => {
            request.config.headers['Authorization'] = `Bearer ${accessToken}`
            request.resolve(axiosPrivate(request.config))
          })

          failedRequestsQueue = []

          // 원래 요청 재시도
          return axiosPrivate(originalRequest)
        } catch (refreshError) {
          // 토큰 갱신 실패 - 모든 대기 중인 요청 거부
          failedRequestsQueue.forEach(request => {
            request.reject(refreshError)
          })

          failedRequestsQueue = []

          // 로그아웃 처리
          const authStore = useAuthStore.getState()
          authStore.logout()

          // 에러가 발생한 페이지가 보호된 페이지라면 로그인 페이지로 리디렉션
          if (typeof window !== 'undefined') {
            const pathname = window.location.pathname
            const protectedRoutes = ['/mypage', '/mydate', '/add']

            if (protectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
              window.location.href = `/auth?returnUrl=${pathname}`
            }
          }

          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      // 다른 오류는 그대로 반환
      return Promise.reject(error)
    }
  )
}
