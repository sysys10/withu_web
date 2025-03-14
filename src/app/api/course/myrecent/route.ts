import { prisma } from '@/lib/prisma'
import { AuthenticatedRequest } from '@/middleware/auth'
import { NextResponse } from 'next/server'

export async function GET(req: AuthenticatedRequest) {
  if (!req.user?.userId) {
    return NextResponse.json({ error: '인증 토큰이 없습니다. 로그인이 필요합니다.' }, { status: 401 })
  }

  console.log(req.user)
  try {
    const myRecentCourses = await prisma.dateCourse.findMany({
      where: {
        creator_id: req.user?.userId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 4
    })

    return NextResponse.json({ courses: myRecentCourses })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: '코스 조회 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
