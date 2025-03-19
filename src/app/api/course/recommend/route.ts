// src/app/api/course/recommend/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const recommendCourses = await prisma.dateCourse.findMany({
      where: {
        is_public: true,
        is_recommend: true // Use the is_recommend flag to filter recommended courses
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 6,
      include: {
        creator: {
          select: {
            id: true,
            name: true
          }
        },
        images: {
          where: { is_main: true },
          take: 1
        }
      }
    })

    // Transform the data to match the frontend's expected format
    const transformedCourses = recommendCourses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      tags: course.tags,
      price: course.price || 0,
      thumbnail: course.thumbnail || course.images[0]?.image_url || '',
      creator: {
        id: course.creator.id,
        name: course.creator.name
      },
      rating: course.rating || 0,
      like_count: course.like_count || 0
    }))

    return NextResponse.json({
      courses: transformedCourses.length > 0 ? transformedCourses : []
    })
  } catch (error) {
    console.error('Error fetching recommended courses:', error)
    return NextResponse.json({ message: '추천 코스를 불러오는데 실패했습니다.' }, { status: 500 })
  }
}
