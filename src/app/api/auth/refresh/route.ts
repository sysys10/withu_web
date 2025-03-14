// src/app/api/auth/refresh/route.ts
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!refreshToken) {
    return NextResponse.json({ message: '인증 토큰이 없습니다, 재로그인 해주세요.' }, { status: 401 })
  }

  const tokenRecord = await prisma.authToken.findFirst({
    where: {
      refresh_token: refreshToken,
      is_revoked: false,
      expires_at: {
        gt: new Date()
      }
    },
    include: {
      user: true
    }
  })

  if (!tokenRecord) {
    return NextResponse.json({ message: '유효하지 않은 토큰입니다, 재로그인 해주세요.' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string }

    const accessToken = jwt.sign(
      {
        userId: tokenRecord.user.id,
        email: tokenRecord.user.email
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '3h' }
    )

    return NextResponse.json(
      {
        accessToken,
        user: {
          id: tokenRecord.user.id,
          email: tokenRecord.user.email,
          name: tokenRecord.user.name
        }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: '토큰 검증에 실패했습니다, 재로그인 해주세요.' }, { status: 401 })
  }
}
