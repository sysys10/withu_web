// src/app/api/courses/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { id, userId, placeId, tag } = await req.json()

    // Build the query filters
    const where: any = {
      is_public: true
    }

    // Filter by course ID if provided
    if (id) {
      where.id = id
    }

    // Filter by creator ID if provided
    if (userId) {
      where.creator_id = userId
    }

    // Filter by tag if provided
    if (tag) {
      where.tags = {
        has: tag
      }
    }

    // Filter by place if provided
    let placesFilter = undefined
    if (placeId) {
      placesFilter = {
        some: {
          place_id: placeId
        }
      }
    }

    if (placesFilter) {
      where.places = placesFilter
    }

    // Execute the query
    const courses = await prisma.dateCourse.findMany({
      where,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            profile_image: true
          }
        },
        places: {
          include: {
            place: true
          },
          orderBy: {
            visit_order: 'asc'
          }
        },
        images: {
          where: { is_main: true },
          take: 1
        },
        reviews: {
          select: {
            rating: true
          }
        }
      },
      take: 20 // Limit results
    })

    // Transform the results
    const transformedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      tags: course.tags,
      price: course.price || 0,
      total_time: course.total_time || 0,
      rating: course.rating,
      review_count: course.reviews.length,
      like_count: course.like_count,
      thumbnail: course.thumbnail || course.images[0]?.image_url || '',
      creator: {
        id: course.creator.id,
        name: course.creator.name,
        image: course.creator.profile_image
      },
      places: course.places.map(cp => ({
        id: cp.place.id,
        name: cp.place.name,
        address: cp.place.address,
        image_url: cp.place.image_url,
        category: cp.place.category,
        latitude: cp.place.latitude,
        longitude: cp.place.longitude
      }))
    }))

    return NextResponse.json(transformedCourses)
  } catch (error) {
    console.error('Error searching courses:', error)
    return NextResponse.json({ message: '코스 검색 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
