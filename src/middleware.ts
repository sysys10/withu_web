// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 인증이 필요한 경로 배열
const PROTECTED_ROUTES = ['/mypage', '/mydate', '/add']

export function middleware(request: NextRequest) {
  // 현재 경로 가져오기
  const pathname = request.nextUrl.pathname

  // 로그인 토큰 확인 (쿠키에서 refreshToken 확인)
  const refreshToken = request.cookies.get('refresh_token')?.value

  // 인증이 필요한 경로에 접근하는지 확인
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))

  // 인증이 필요한 경로이고 토큰이 없는 경우 로그인 페이지로 리디렉션
  if (isProtectedRoute && !refreshToken) {
    const url = new URL('/auth', request.url)
    // 로그인 후 원래 가려던 페이지로 리디렉션하기 위해 returnUrl 추가
    url.searchParams.set('returnUrl', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// 미들웨어가 실행될 경로 패턴 지정
export const config = {
  matcher: [
    /*
     * 미들웨어가 실행될 경로 패턴을 지정합니다:
     * - '/((?!api|_next/static|_next/image|favicon.ico).*)'는 다음을 제외한 모든 경로에 적용:
     *   - /api 경로 (API 라우트)
     *   - /_next/static (정적 파일)
     *   - /_next/image (이미지 최적화)
     *   - /favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
