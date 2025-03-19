// src/app/api/course/save/route.ts
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

    const { courseId, notes } = await req.json()

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

    // Check if user already saved the course
    const existingSave = await prisma.savedCourse.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId
        }
      }
    })

    let action: 'saved' | 'unsaved'

    if (existingSave) {
      // User already saved the course, so unsave it
      await prisma.savedCourse.delete({
        where: {
          id: existingSave.id
        }
      })

      action = 'unsaved'
    } else {
      // User hasn't saved the course yet, so save it
      await prisma.savedCourse.create({
        data: {
          user_id: userId,
          course_id: courseId,
          notes: notes || null
        }
      })

      action = 'saved'
    }

    return NextResponse.json({
      message: action === 'saved' ? '코스를 저장했습니다.' : '코스 저장을 취소했습니다.',
      action
    })
  } catch (error) {
    console.error('Error handling course save:', error)
    return NextResponse.json({ message: '코스 저장 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// Check if user has saved a course
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader

    if (!token) {
      return NextResponse.json({ saved: false })
    }

    let userId: string
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'access_token_secret') as { userId: string }
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ saved: false })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ message: '코스 ID가 필요합니다.' }, { status: 400 })
    }

    // Check if user has saved the course
    const savedCourse = await prisma.savedCourse.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId
        }
      }
    })

    return NextResponse.json({
      saved: !!savedCourse,
      notes: savedCourse?.notes || null
    })
  } catch (error) {
    console.error('Error checking course save status:', error)
    return NextResponse.json({ message: '저장 상태 확인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
