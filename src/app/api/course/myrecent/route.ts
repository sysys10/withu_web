import { prisma } from '@/lib/prisma'
import { AuthenticatedRequest, withAuth } from '@/middleware/auth'
import { NextResponse } from 'next/server'

async function handler(req: AuthenticatedRequest) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const myRecentCourses = await prisma.dateCourse.findMany({
      where: {
        creator_id: userId
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

export const GET = withAuth(handler)
