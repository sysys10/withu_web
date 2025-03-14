import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (refreshToken) {
    await prisma.authToken.updateMany({
      where: {
        refresh_token: refreshToken
      },
      data: {
        is_revoked: true
      }
    })
  }

  cookieStore.delete('refresh_token')

  return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 })
}
