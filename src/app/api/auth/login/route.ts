import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { user_id, password } = await req.json()
  const user = await prisma.user.findUnique({
    where: { user_id }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashed_password!)

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}
