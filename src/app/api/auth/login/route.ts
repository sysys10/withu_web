import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

export async function POST(req: Request) {
  const { user_id, password } = await req.json()

  // 유저 조회
  const user = await prisma.user.findUnique({
    where: { user_id }
  })

  if (!user) {
    return NextResponse.json({ error: '존재하지 않는 아이디입니다.' }, { status: 403 })
  }

  // 비밀번호 검증
  const isPasswordValid = await bcrypt.compare(password, user.hashed_password!)

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
        user_id: user.user_id,
        email: user.email,
        name: user.name
      }
    },
    { status: 200 }
  )
}
