// src/app/api/course/create/route.ts
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Get user ID from auth token
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

    // Parse request body
    const courseData = await req.json()
    const {
      name,
      description,
      tags,
      price,
      totalTime,
      mood,
      bestSeason,
      bestTime,
      visitedDate,
      myReview,
      myRating,
      expenses,
      isPublic,
      thumbnail,
      images,
      places
    } = courseData

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json({ message: '코스 이름과 설명은 필수 입력 항목입니다.' }, { status: 400 })
    }

    // Create DateCourse
    const newCourse = await prisma.dateCourse.create({
      data: {
        name,
        description,
        creator_id: userId,
        tags: tags || [],
        price: price ? parseInt(price) : null,
        total_time: totalTime ? parseInt(totalTime) : null,
        mood,
        best_season: bestSeason,
        best_time: bestTime,
        visited_date: visitedDate ? new Date(visitedDate) : null,
        my_review: myReview,
        my_rating: myRating ? parseInt(myRating) : null,
        expenses: expenses || {},
        is_public: isPublic !== false, // Default to true if not specified
        thumbnail
      }
    })

    // Add course images if provided
    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (image: any, index: number) => {
          await prisma.courseImage.create({
            data: {
              course_id: newCourse.id,
              image_url: image.url,
              description: image.description || null,
              is_main: index === 0 // First image is the main image
            }
          })
        })
      )
    }

    // Add course places if provided
    if (places && places.length > 0) {
      await Promise.all(
        places.map(async (placeData: any, index: number) => {
          let place

          // Check if the place already exists
          if (placeData.id) {
            place = await prisma.place.findUnique({
              where: { id: placeData.id }
            })
          }

          // If place doesn't exist, create it
          if (!place) {
            place = await prisma.place.create({
              data: {
                name: placeData.name,
                address: placeData.address,
                road_address: placeData.roadAddress || placeData.address,
                latitude: placeData.latitude,
                longitude: placeData.longitude,
                category: placeData.category || '기타',
                naver_place_id: placeData.naverPlaceId,
                phone: placeData.phone,
                homepage: placeData.homepage,
                description: placeData.description,
                image_url: placeData.imageUrls || [],
                thumbnail: placeData.thumbnail || null,
                naver_rating: placeData.naverRating ? parseFloat(placeData.naverRating) : null,
                naver_review_count: placeData.naverReviewCount ? parseInt(placeData.naverReviewCount) : null
              }
            })
          }

          // Create CoursePlaces relationship
          await prisma.coursePlaces.create({
            data: {
              course_id: newCourse.id,
              place_id: place.id,
              visit_order: index + 1,
              recommended_time: placeData.recommendedTime ? parseInt(placeData.recommendedTime) : null,
              actual_time_spent: placeData.actualTimeSpent ? parseInt(placeData.actualTimeSpent) : null,
              tips: placeData.tips || null,
              rating: placeData.rating ? parseInt(placeData.rating) : null,
              experience: placeData.experience || null,
              transport_to_next: placeData.transportToNext || null,
              time_to_next: placeData.timeToNext ? parseInt(placeData.timeToNext) : null
            }
          })
        })
      )
    }

    return NextResponse.json(
      {
        message: '데이트 코스가 성공적으로 생성되었습니다.',
        course: {
          id: newCourse.id,
          name: newCourse.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ message: '코스 생성 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
