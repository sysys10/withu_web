import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const recommendCourse = await prisma.dateCourse.findMany({
      where: {
        is_public: true
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 6
    })

    return NextResponse.json({ courses: recommendCourse.length > 0 ? recommendCourse : [] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: '추천 코스를 불러오는데 실패했습니다.' }, { status: 500 })
  }
}
