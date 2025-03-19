import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

// 토큰 만료 시간 설정
const ACCESS_TOKEN_EXPIRY = '30m' // 30분
const REFRESH_TOKEN_EXPIRY = '7d' // 7일

export async function POST() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshtoken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        {
          error: '리프레시 토큰이 없습니다',
          code: 'REFRESH_TOKEN_MISSING'
        },
        { status: 403 }
      )
    }

    // 토큰 레코드 조회
    const tokenRecord = await prisma.authToken.findFirst({
      where: {
        refresh_token: refreshToken,
        is_revoked: false,
        expires_at: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            profile_image: true
          }
        }
      }
    })

    if (!tokenRecord) {
      // 리프레시 토큰이 DB에 없거나 폐기되었거나 만료된 경우
      // 쿠키 삭제
      cookieStore.delete('accesstoken')
      cookieStore.delete('refreshtoken')

      return NextResponse.json(
        {
          error: '리프레시 토큰이 유효하지 않습니다',
          code: 'REFRESH_TOKEN_INVALID'
        },
        { status: 403 }
      )
    }

    try {
      // 리프레시 토큰 검증
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

      // 새 액세스 토큰 생성
      const accessToken = jwt.sign(
        {
          userId: tokenRecord.user.id,
          email: tokenRecord.user.email
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
      )

      // Refresh Token Rotation 적용: 새로운 리프레시 토큰 발급
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7일 후 만료

      const newRefreshToken = jwt.sign({ userId: tokenRecord.user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
      })

      // 이전 토큰을 폐기하고 새 토큰 생성
      await prisma.authToken.update({
        where: { id: tokenRecord.id },
        data: {
          is_revoked: true
        }
      })

      // 새 토큰 생성
      await prisma.authToken.create({
        data: {
          user_id: tokenRecord.user.id,
          refresh_token: newRefreshToken,
          access_token: accessToken,
          expires_at: expiresAt
        }
      })

      // 응답 객체 생성
      const response = NextResponse.json({
        message: '토큰이 성공적으로 갱신되었습니다.',
        user: {
          id: tokenRecord.user.id,
          email: tokenRecord.user.email,
          name: tokenRecord.user.name,
          profile_image: tokenRecord.user.profile_image
        }
      })

      // 쿠키 설정
      response.cookies.set('accesstoken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 60, // 30분
        path: '/'
      })

      response.cookies.set('refreshtoken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7일
        path: '/'
      })

      return response
    } catch (error) {
      // JWT 검증 실패 - 쿠키 삭제 및 DB에서 토큰 폐기
      cookieStore.delete('accesstoken')
      cookieStore.delete('refreshtoken')

      await prisma.authToken.update({
        where: { id: tokenRecord.id },
        data: { is_revoked: true }
      })

      return NextResponse.json(
        {
          error: '리프레시 토큰 검증에 실패했습니다',
          code: 'REFRESH_TOKEN_VERIFICATION_FAILED'
        },
        { status: 403 }
      )
    }
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json(
      {
        error: '토큰 갱신 중 오류가 발생했습니다',
        code: 'REFRESH_ERROR'
      },
      { status: 500 }
    )
  }
}
