import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ message: 'id가 없습니다.' }, { status: 400 })
    }

    let course: any = await prisma.dateCourse.findUnique({
      where: {
        id: id
      }
    })

    if (!course) {
      console.log('코스를 찾을 수 없습니다.')
      return NextResponse.json({ message: '코스를 찾을 수 없습니다.' }, { status: 404 })
    }

    const places = await prisma.coursePlaces.findMany({
      where: {
        course_id: id
      }
    })

    const creator = await prisma.user.findUnique({
      where: {
        id: course.creator_id
      }
    })

    course.creator = creator
    course.places = places

    console.log(course)

    return NextResponse.json(course)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: '코스를 찾을 수 없습니다.' }, { status: 500 })
  }
}
