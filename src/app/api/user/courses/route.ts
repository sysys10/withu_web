// src/app/api/user/courses/route.ts
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

// Get courses created by the current user
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'created' // 'created' or 'saved'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let courses

    if (type === 'created') {
      // Get courses created by the user
      courses = await prisma.dateCourse.findMany({
        where: {
          creator_id: userId
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
            },
            take: 1
          },
          _count: {
            select: {
              reviews: true,
              likes: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        },
        skip: offset,
        take: limit
      })
    } else if (type === 'saved') {
      // Get courses saved by the user
      const savedCourses = await prisma.savedCourse.findMany({
        where: {
          user_id: userId
        },
        include: {
          course: {
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
                },
                take: 1
              },
              _count: {
                select: {
                  reviews: true,
                  likes: true
                }
              }
            }
          }
        },
        orderBy: {
          saved_at: 'desc'
        },
        skip: offset,
        take: limit
      })

      courses = savedCourses.map(savedCourse => savedCourse.course)
    } else {
      return NextResponse.json(
        { message: '유효하지 않은 타입입니다. "created" 또는 "saved"만 가능합니다.' },
        { status: 400 }
      )
    }

    // Transform courses to expected format
    const transformedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      tags: course.tags,
      price: course.price || 0,
      thumbnail: course.thumbnail || '',
      rating: course.rating,
      likeCount: course.like_count,
      reviewCount: course._count?.reviews || 0,
      creator: {
        id: course.creator.id,
        name: course.creator.name,
        image: course.creator.profile_image
      },
      // Get first place for address
      address: course.places[0]?.place.address || '',
      // For saved courses, we could include the savedAt date
      ...(type === 'saved' && { savedAt: course.created_at })
    }))

    // Get total count for pagination
    const totalCount = await (type === 'created'
      ? prisma.dateCourse.count({ where: { creator_id: userId } })
      : prisma.savedCourse.count({ where: { user_id: userId } }))

    return NextResponse.json({
      courses: transformedCourses,
      pagination: {
        total: totalCount,
        offset,
        limit,
        hasMore: offset + courses.length < totalCount
      }
    })
  } catch (error) {
    console.error(`Error fetching ${req.url.includes('saved') ? 'saved' : 'created'} courses:`, error)
    return NextResponse.json({ message: '코스를 불러오는 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
