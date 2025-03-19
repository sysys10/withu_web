// src/app/api/course/like/route.ts
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader

    if (!token) {
      return NextResponse.json({ message: '인증 정보가 없습니다. 로그인이 필요합니다.' }, { status: 401 })
    }

    let userId: string
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'access_token_secret') as { userId: string }
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ message: '유효하지 않은 인증 정보입니다. 다시 로그인해주세요.' }, { status: 401 })
    }

    const { courseId } = await req.json()

    if (!courseId) {
      return NextResponse.json({ message: '코스 ID가 필요합니다.' }, { status: 400 })
    }

    // Check if the course exists
    const course = await prisma.dateCourse.findUnique({
      where: { id: courseId }
    })

    if (!course) {
      return NextResponse.json({ message: '존재하지 않는 코스입니다.' }, { status: 404 })
    }

    // Check if user already liked the course
    const existingLike = await prisma.like.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId
        }
      }
    })

    let action: 'liked' | 'unliked'

    if (existingLike) {
      // User already liked the course, so unlike it
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      })

      // Decrement the like_count
      await prisma.dateCourse.update({
        where: { id: courseId },
        data: {
          like_count: {
            decrement: 1
          }
        }
      })

      action = 'unliked'
    } else {
      // User hasn't liked the course yet, so like it
      await prisma.like.create({
        data: {
          user_id: userId,
          course_id: courseId
        }
      })

      // Increment the like_count
      await prisma.dateCourse.update({
        where: { id: courseId },
        data: {
          like_count: {
            increment: 1
          }
        }
      })

      action = 'liked'
    }

    // Get the updated course
    const updatedCourse = await prisma.dateCourse.findUnique({
      where: { id: courseId },
      select: { like_count: true }
    })

    return NextResponse.json({
      message: action === 'liked' ? '코스를 좋아요했습니다.' : '코스 좋아요를 취소했습니다.',
      action,
      likeCount: updatedCourse?.like_count || 0
    })
  } catch (error) {
    console.error('Error handling course like:', error)
    return NextResponse.json({ message: '코스 좋아요 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// Check if user has liked a course
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader

    if (!token) {
      return NextResponse.json({ liked: false })
    }

    let userId: string
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'access_token_secret') as { userId: string }
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ liked: false })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ message: '코스 ID가 필요합니다.' }, { status: 400 })
    }

    // Check if user has liked the course
    const like = await prisma.like.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId
        }
      }
    })

    return NextResponse.json({ liked: !!like })
  } catch (error) {
    console.error('Error checking course like status:', error)
    return NextResponse.json({ message: '좋아요 상태 확인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
