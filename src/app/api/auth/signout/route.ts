import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { user_id, password, email } = await req.json()
  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (user) {
    return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      user_id,
      hashed_password: hashedPassword,
      email,
      name: user_id
    }
  })
  console.log(newUser)
  if (!newUser) {
    return NextResponse.json({ error: '회원가입에 실패했습니다.' }, { status: 400 })
  }

  return NextResponse.json({ message: '회원가입에 성공했습니다.' }, { status: 200 })
}