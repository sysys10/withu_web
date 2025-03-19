import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

// 토큰 만료 시간 설정
const ACCESS_TOKEN_EXPIRY = '30m' // 30분
const REFRESH_TOKEN_EXPIRY = '7d' // 7일

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // 필수 필드 확인
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 모두 입력해주세요.' }, { status: 400 })
    }

    // 유저 조회
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

    // 비밀번호 확인
    if (!user.hashed_password) {
      return NextResponse.json({ error: '비밀번호가 설정되지 않은 계정입니다.' }, { status: 403 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 })
    }

    // 액세스 토큰 생성
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    )

    // 리프레시 토큰 생성
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY })

    // 토큰 만료일 설정
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7일 후 만료

    // 토큰 저장
    await prisma.authToken.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
        access_token: accessToken,
        expires_at: expiresAt
      }
    })

    // 응답 설정
    const response = NextResponse.json(
      {
        message: '로그인 성공',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profile_image: user.profile_image
        }
      },
      { status: 200 }
    )

    // 쿠키 설정
    response.cookies.set('accesstoken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60, // 30분
      path: '/'
    })

    response.cookies.set('refreshtoken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7일
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
