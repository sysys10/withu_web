import isValidToken from '@/lib/is-valid-token'
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// 보호된 경로 정의
const PROTECTED_ROUTES = ['/mypage', '/mydate', '/add/course', '/map']

export async function middleware(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // 현재 경로 확인
  const pathname = request.nextUrl.pathname

  // 보호된 경로에 대한 요청인지 확인
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))

  // 보호된 경로가 아니라면 미들웨어 처리 없이 통과
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const cookieStore = await cookies()
  // 요청에서 쿠키를 읽기 위해 cookieStore 생성

  const accesstoken = cookieStore.get('accesstoken')
  // 요청에서 'accesstoken' 쿠키를 가져옴

  const refreshtoken = cookieStore.get('refreshtoken')
  // 요청에서 'refreshtoken' 쿠키를 가져옴

  if (!accesstoken?.value || !refreshtoken?.value) {
    // 액세스 토큰 또는 리프레시 토큰이 없을 경우 로그인 페이지로 리다이렉트
    const returnUrl = encodeURIComponent(pathname)
    return NextResponse.redirect(new URL(`/auth?returnUrl=${returnUrl}`, request.url))
  }

  const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
    accesstoken: accesstoken.value,
    refreshtoken: refreshtoken.value
  })
  // 토큰의 유효성을 검사

  if (!isRefreshTokenValid) {
    // 리프레시 토큰이 유효하지 않을 경우 로그인 페이지로 리다이렉트
    const returnUrl = encodeURIComponent(pathname)
    return NextResponse.redirect(new URL(`/auth?returnUrl=${returnUrl}`, request.url))
  }

  if (!isAccessTokenValid) {
    // 액세스 토큰이 유효하지 않을 경우 액세스 토큰을 재발급
    try {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      // API를 호출하여 새 액세스 토큰과 리프레시 토큰을 요청

      if (!response.ok) {
        // 응답이 성공적이지 않으면 로그인 페이지로 리다이렉트
        const returnUrl = encodeURIComponent(pathname)
        return NextResponse.redirect(new URL(`/auth?returnUrl=${returnUrl}`, request.url))
      }

      if (response.ok) {
        // 응답이 성공적이면 다음 요청을 처리
        const res = NextResponse.next()
        const responseCookies = new ResponseCookies(response.headers)
        // 응답 헤더에서 쿠키를 읽음

        const accessToken = responseCookies.get('accesstoken')
        // 응답에서 'accesstoken' 쿠키를 가져옴

        const refreshToken = responseCookies.get('refreshtoken')
        // 응답에서 'refreshtoken' 쿠키를 가져옴

        if (accessToken) {
          // 새 액세스 토큰을 설정
          res.cookies.set('accesstoken', accessToken.value, {
            httpOnly: accessToken.httpOnly,
            sameSite: accessToken.sameSite as any,
            path: accessToken.path,
            secure: accessToken.secure
          })
        }

        if (refreshToken) {
          // 새 리프레시 토큰을 설정
          res.cookies.set('refreshtoken', refreshToken.value, {
            httpOnly: refreshToken.httpOnly,
            sameSite: refreshToken.sameSite as any,
            path: refreshToken.path,
            secure: refreshToken.secure
          })
        }

        return res
      }
    } catch (error) {
      // 토큰 재발급 중 오류가 발생하면 콘솔에 출력하고 로그인 페이지로 리다이렉트
      console.error('액세스 토큰 재발급 중 오류 발생:', error)
      const returnUrl = encodeURIComponent(pathname)
      return NextResponse.redirect(new URL(`/auth?returnUrl=${returnUrl}`, request.url))
    }
  }

  // 모든 검증을 통과했으므로 다음 처리로 진행
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)']
  // 이 미들웨어를 적용할 경로 패턴
  // API 경로, 정적 파일, 이미지, favicon, 로그인 페이지는 제외
}
