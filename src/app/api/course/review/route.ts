import { prisma } from '@/lib/prisma'
import { Review } from '@prisma/client'
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

    const { courseId, rating, comment, visitedDate, images } = await req.json()

    if (!courseId || !rating) {
      return NextResponse.json({ message: '코스 ID와 평점은 필수 항목입니다.' }, { status: 400 })
    }

    // Validate rating is between 1 and 5
    const ratingNum = parseInt(rating)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ message: '평점은 1부터 5 사이의 숫자여야 합니다.' }, { status: 400 })
    }

    // Check if the course exists
    const course = await prisma.dateCourse.findUnique({
      where: { id: courseId }
    })

    if (!course) {
      return NextResponse.json({ message: '존재하지 않는 코스입니다.' }, { status: 404 })
    }

    // Check if user already reviewed the course
    const existingReview = await prisma.review.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId
        }
      }
    })

    let review: Review

    if (existingReview) {
      // Update existing review
      review = await prisma.review.update({
        where: {
          id: existingReview.id
        },
        data: {
          rating: ratingNum,
          comment: comment || null,
          visited_date: visitedDate ? new Date(visitedDate) : null,
          updated_at: new Date()
        }
      })

      // If new images are provided, delete old ones and add new ones
      if (images && images.length > 0) {
        // Delete old images
        await prisma.reviewImage.deleteMany({
          where: {
            review_id: existingReview.id
          }
        })

        // Add new images
        await Promise.all(
          images.map(async (image: string) => {
            await prisma.reviewImage.create({
              data: {
                review_id: existingReview.id,
                image_url: image
              }
            })
          })
        )
      }
    } else {
      // Create new review
      review = await prisma.review.create({
        data: {
          user_id: userId,
          course_id: courseId,
          rating: ratingNum,
          comment: comment || null,
          visited_date: visitedDate ? new Date(visitedDate) : null
        }
      })

      // Add images if provided
      if (images && images.length > 0) {
        await Promise.all(
          images.map(async (image: string) => {
            await prisma.reviewImage.create({
              data: {
                review_id: review.id,
                image_url: image
              }
            })
          })
        )
      }
    }

    // Update course average rating
    const allReviews = await prisma.review.findMany({
      where: {
        course_id: courseId
      },
      select: {
        rating: true
      }
    })

    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / allReviews.length

    await prisma.dateCourse.update({
      where: {
        id: courseId
      },
      data: {
        rating: parseFloat(averageRating.toFixed(1))
      }
    })

    return NextResponse.json({
      message: existingReview ? '리뷰를 수정했습니다.' : '리뷰를 등록했습니다.',
      review: {
        id: review.id,
        rating: review.rating,
        comment: review.comment
      }
    })
  } catch (error) {
    console.error('Error handling course review:', error)
    return NextResponse.json({ message: '리뷰 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// Get reviews for a course
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ message: '코스 ID가 필요합니다.' }, { status: 400 })
    }

    // Get reviews for the course
    const reviews = await prisma.review.findMany({
      where: {
        course_id: courseId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile_image: true
          }
        },
        images: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    // Transform reviews to expected format
    const transformedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      visitedDate: review.visited_date,
      createdAt: review.created_at,
      user: {
        id: review.user.id,
        name: review.user.name,
        profileImage: review.user.profile_image
      },
      images: review.images.map(image => image.image_url)
    }))

    return NextResponse.json({
      reviews: transformedReviews,
      totalReviews: reviews.length
    })
  } catch (error) {
    console.error('Error fetching course reviews:', error)
    return NextResponse.json({ message: '리뷰를 불러오는 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
