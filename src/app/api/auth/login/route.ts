// src/app/api/auth/login/route.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Check if any required fields are missing
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 모두 입력해주세요.' }, { status: 400 })
    }

    // 유저 조회 (with error handling)
    let user
    try {
      user = await prisma.user.findUnique({
        where: { email }
      })
    } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: '데이터베이스 오류가 발생했습니다.' }, { status: 500 })
    }

    if (!user) {
      return NextResponse.json({ error: '존재하지 않는 이메일입니다.' }, { status: 403 })
    }

    // Ensure hashed_password exists
    if (!user.hashed_password) {
      return NextResponse.json({ error: '비밀번호가 설정되지 않은 계정입니다.' }, { status: 403 })
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 })
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '3h' }
    )

    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    await prisma.authToken.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: expiresAt
      }
    })

    const cookieStore = await cookies()

    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    })

    return NextResponse.json(
      {
        message: '로그인 성공',
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
