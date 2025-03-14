// src/app/api/course/myrecent/route.ts
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader

    if (!token) {
      return NextResponse.json({ courses: [] }) // Return empty courses if not authenticated
    }

    let userId: string
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'access_token_secret') as { userId: string }
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ courses: [] }) // Return empty courses if token is invalid
    }

    const myRecentCourses = await prisma.dateCourse.findMany({
      where: {
        creator_id: userId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 4,
      select: {
        id: true,
        name: true,
        thumbnail: true,
        price: true,
        tags: true,
        creator_id: true,
        description: true
      }
    })

    const courses =
      myRecentCourses.length > 0
        ? myRecentCourses.map(course => ({
            ...course,
            image: course.thumbnail || 'https://via.placeholder.com/150',
            address: '서울시 강남구',
            distance: 2.5
          }))
        : []

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: '코스 조회 중 오류가 발생했습니다.', courses: [] }, { status: 500 })
  }
}
