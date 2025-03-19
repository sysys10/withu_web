import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'

// 사용자 프로필 조회 API
export async function GET(req: NextRequest) {
  try {
    // 쿠키에서 액세스 토큰 가져오기
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accesstoken')?.value

    if (!accessToken) {
      return NextResponse.json({ error: '인증 정보가 없습니다. 로그인이 필요합니다.' }, { status: 401 })
    }

    // 액세스 토큰 검증
    let userId: string
    try {
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as { userId: string }
      userId = decoded.userId
    } catch (error) {
      // 토큰 검증 실패 - 미들웨어에서 처리되어야 하지만 이중 안전장치로 여기서도 체크
      return NextResponse.json({ error: '유효하지 않은 인증 정보입니다. 다시 로그인해주세요.' }, { status: 401 })
    }

    // 사용자 프로필 조회
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        age: true,
        profile_image: true,
        bio: true,
        is_verified: true,
        isComplete: true,
        created_at: true,
        _count: {
          select: {
            created_courses: true,
            saved_courses: true,
            follows: true,
            followers: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 프로필 데이터 변환
    const userProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      age: user.age,
      profileImage: user.profile_image,
      bio: user.bio,
      isVerified: user.is_verified,
      isComplete: user.isComplete,
      createdAt: user.created_at,
      stats: {
        coursesCreated: user._count.created_courses,
        coursesSaved: user._count.saved_courses,
        following: user._count.follows,
        followers: user._count.followers
      }
    }

    return NextResponse.json(userProfile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: '프로필을 불러오는 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// 사용자 프로필 업데이트 API
export async function PATCH(req: NextRequest) {
  try {
    // 쿠키에서 액세스 토큰 가져오기
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accesstoken')?.value

    if (!accessToken) {
      return NextResponse.json({ error: '인증 정보가 없습니다. 로그인이 필요합니다.' }, { status: 401 })
    }

    // 액세스 토큰 검증
    let userId: string
    try {
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as { userId: string }
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ error: '유효하지 않은 인증 정보입니다. 다시 로그인해주세요.' }, { status: 401 })
    }

    // 요청 본문 파싱
    const { name, gender, age, profileImage, bio } = await req.json()

    // 사용자 프로필 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: name || undefined,
        gender: gender || undefined,
        age: age ? parseInt(age.toString()) : undefined,
        profile_image: profileImage || undefined,
        bio: bio || undefined,
        isComplete: true // 프로필 수정 시 완료 표시
      },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        age: true,
        profile_image: true,
        bio: true,
        is_verified: true,
        isComplete: true
      }
    })

    return NextResponse.json({
      message: '프로필이 성공적으로 업데이트되었습니다.',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        gender: updatedUser.gender,
        age: updatedUser.age,
        profileImage: updatedUser.profile_image,
        bio: updatedUser.bio,
        isVerified: updatedUser.is_verified,
        isComplete: updatedUser.isComplete
      }
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: '프로필을 업데이트하는 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
