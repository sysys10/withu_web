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
      console.error('Token verification error:', error)
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
      include: {
        // Include the first place to get location info
        places: {
          include: {
            place: true
          },
          orderBy: {
            visit_order: 'asc'
          },
          take: 1
        }
      }
    })

    // Transform the data to match the expected format
    const transformedCourses = myRecentCourses.map(course => {
      // Get the first place if available
      const firstPlace = course.places[0]?.place

      return {
        id: course.id,
        name: course.name,
        thumbnail: course.thumbnail || '',
        description: course.description,
        tags: course.tags,
        price: course.price || 0,
        creator_id: course.creator_id,
        // Add address and distance if a place is available
        address: firstPlace ? firstPlace.address : '주소 정보 없음',
        // For demonstration, we're using a fixed distance
        distance: 2.5
      }
    })

    return NextResponse.json({ courses: transformedCourses })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: '코스 조회 중 오류가 발생했습니다.', courses: [] }, { status: 500 })
  }
}
