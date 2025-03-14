// src/middleware/auth.ts
import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    email: string
    [key: string]: any
  }
}

// 액세스 토큰을 검증하고 사용자 정보를 요청에 추가하는 미들웨어
export async function withAuth(
  handler: (req: AuthenticatedRequest, ...args: any[]) => Promise<NextResponse>,
  options: { requireAuth: boolean } = { requireAuth: true }
) {
  return async function (req: NextRequest, ...args: any[]) {
    const headersList = await headers()
    const authorization = headersList.get('Authorization')
    const accessToken = authorization?.startsWith('Bearer ') ? authorization.substring(7) : authorization

    if (!accessToken) {
      if (options.requireAuth) {
        return NextResponse.json({ error: '인증 토큰이 없습니다. 로그인이 필요합니다.' }, { status: 401 })
      }
      // 인증이 필수가 아닌 경우 원래 핸들러 실행
      return handler(req as AuthenticatedRequest, ...args)
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
      ) as jwt.JwtPayload

      // 사용자 정보를 요청에 추가
      const authenticatedReq = req as AuthenticatedRequest
      authenticatedReq.user = {
        userId: decoded.userId,
        email: decoded.email,
        ...decoded
      }

      // 원래 핸들러 실행
      return handler(authenticatedReq, ...args)
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json({ error: '인증 토큰이 만료되었습니다.', code: 'TOKEN_EXPIRED' }, { status: 401 })
      }

      return NextResponse.json({ error: '유효하지 않은 인증 토큰입니다.' }, { status: 401 })
    }
  }
}
