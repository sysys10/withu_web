// src/middleware/auth.ts
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    email: string
    [key: string]: any
  }
}

// Fixed middleware implementation
export async function withAuth(
  handler: (req: AuthenticatedRequest, ...args: any[]) => Promise<NextResponse>,
  options: { requireAuth: boolean } = { requireAuth: true }
) {
  return async function (req: NextRequest, ...args: any[]) {
    // Get token from the Authorization header
    const authHeader = req.headers.get('Authorization')
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader

    if (!accessToken) {
      if (options.requireAuth) {
        return NextResponse.json({ error: '인증 토큰이 없습니다. 로그인이 필요합니다.' }, { status: 401 })
      }
      // If auth is not required, proceed with the handler
      return handler(req as AuthenticatedRequest, ...args)
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
      ) as jwt.JwtPayload

      // Add user info to the request
      const authenticatedReq = req.clone() as unknown as AuthenticatedRequest
      authenticatedReq.user = {
        userId: decoded.userId,
        email: decoded.email,
        ...decoded
      }

      // Run the original handler
      return handler(authenticatedReq, ...args)
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json({ error: '인증 토큰이 만료되었습니다.', code: 'TOKEN_EXPIRED' }, { status: 401 })
      }

      return NextResponse.json({ error: '유효하지 않은 인증 토큰입니다.' }, { status: 401 })
    }
  }
}
