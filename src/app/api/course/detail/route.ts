// src/app/api/course/detail/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ message: 'id가 없습니다.' }, { status: 400 })
    }

    // Find the date course with the given ID
    const course = await prisma.dateCourse.findUnique({
      where: {
        id: id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            profile_image: true
          }
        },
        // Include the CoursePlaces with their related Place data
        places: {
          include: {
            place: true
          },
          orderBy: {
            visit_order: 'asc'
          }
        },
        // Include reviews count and average rating
        reviews: {
          select: {
            rating: true
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ message: '코스를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Transform the data to match the frontend's expected format
    const transformedCourse = {
      id: course.id,
      name: course.name,
      description: course.description,
      tags: course.tags,
      price: course.price || 0,
      total_time: course.total_time || 0,
      rating: course.rating,
      review_count: course.reviews?.length || 0,
      like_count: course.like_count,
      thumbnail: course.thumbnail,
      creator: {
        id: course.creator.id,
        name: course.creator.name,
        image: course.creator.profile_image
      },
      places: course.places.map(coursePlace => ({
        id: coursePlace.place.id,
        name: coursePlace.place.name,
        address: coursePlace.place.address,
        image_url: coursePlace.place.image_url,
        category: coursePlace.place.category,
        latitude: coursePlace.place.latitude,
        longitude: coursePlace.place.longitude,
        visit_order: coursePlace.visit_order,
        recommended_time: coursePlace.recommended_time,
        tips: coursePlace.tips
      }))
    }

    return NextResponse.json(transformedCourse)
  } catch (error) {
    console.error('Error fetching course details:', error)
    return NextResponse.json({ message: '코스를 찾는 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
