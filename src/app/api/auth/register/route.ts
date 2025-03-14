import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // 필수 입력값 체크
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호는 필수 입력값입니다.' }, { status: 400 })
    }

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 400 })
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10)

    // 유저 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        hashed_password: hashedPassword,
        name: name || email.split('@')[0] // 이름이 없으면 이메일 아이디 부분 사용
      }
    })

    if (!newUser) {
      return NextResponse.json({ error: '회원가입에 실패했습니다.' }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: '회원가입에 성공했습니다.',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
