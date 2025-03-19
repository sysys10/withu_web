import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshtoken')?.value

    // 리프레시 토큰이 있으면 DB에서 폐기 처리
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

    // 응답 객체 생성
    const response = NextResponse.json({ message: '로그아웃 성공' }, { status: 200 })

    // 쿠키 삭제
    response.cookies.delete('accesstoken')
    response.cookies.delete('refreshtoken')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: '로그아웃 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
