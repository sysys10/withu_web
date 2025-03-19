// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('시드 데이터 생성 시작...')

  // 현재 시간
  const now = new Date()

  // 비밀번호 해싱 함수
  const hashPassword = async password => {
    return await bcrypt.hash(password, 10)
  }

  // 1. 사용자 생성
  console.log('사용자 데이터 생성 중...')
  const hashedPassword = await hashPassword('password123')

  const user = await prisma.user.upsert({
    where: { email: 'kim.minjae@example.com' },
    update: {},
    create: {
      email: 'kim.minjae@example.com',
      hashed_password: hashedPassword,
      name: '김민재',
      gender: '남성',
      age: 28,
      profile_image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: '맛집 탐방과 여행을 좋아하는 남자입니다.',
      is_verified: true,
      isComplete: true,
      created_at: now,
      updated_at: now
    }
  })
  console.log('사용자 생성 완료:', user.id)

  // 2. 장소 생성
  console.log('장소 데이터 생성 중...')
  const place = await prisma.place.create({
    data: {
      name: '여의도 한강공원',
      address: '서울특별시 영등포구 여의도동',
      road_address: '서울특별시 영등포구 여의동로 330',
      latitude: 37.5285,
      longitude: 126.9327,
      category: '공원',
      naver_place_id: 'place_hangang_1',
      naver_category: '명소/관광지',
      phone: '02-120',
      homepage: 'https://hangang.seoul.go.kr',
      business_hours: {
        monday: '00:00-24:00',
        tuesday: '00:00-24:00',
        wednesday: '00:00-24:00',
        thursday: '00:00-24:00',
        friday: '00:00-24:00',
        saturday: '00:00-24:00',
        sunday: '00:00-24:00'
      },
      description: '여의도에 위치한 한강공원으로 자전거 대여, 피크닉, 야경 감상 등이 가능합니다.',
      image_url: [
        'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang.webp',
        'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang2.jpg'
      ],
      thumbnail: 'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang.webp',
      naver_rating: 4.5,
      naver_review_count: 1245,
      created_at: now,
      updated_at: now
    }
  })
  console.log('장소 생성 완료:', place.id)

  // 3. 장소 사진 생성
  const placePhoto = await prisma.placePhoto.create({
    data: {
      place_id: place.id,
      image_url: 'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang3.jpeg',
      description: '한강에서 찍은 야경 사진',
      taken_at: new Date('2025-02-15T18:30:00Z'),
      created_at: now
    }
  })
  console.log('장소 사진 생성 완료:', placePhoto.id)

  // 4. 데이트 코스 생성
  console.log('데이트 코스 데이터 생성 중...')
  const dateCourse = await prisma.dateCourse.create({
    data: {
      name: '한강 로맨틱 데이트 코스',
      description: '여의도 한강공원에서 시작해 카페와 레스토랑을 즐기는 로맨틱한 데이트 코스',
      creator_id: user.id,
      tags: ['로맨틱', '야경', '한강', '자전거'],
      price: 80000,
      total_time: 360,
      total_distance: 5000,
      mood: '로맨틱',
      best_season: '봄',
      best_time: '오후',
      visited_date: new Date('2025-03-15'),
      my_review: '한강에서 자전거 타고 야경 보면서 산책하니 정말 로맨틱했어요. 카페에서 본 한강 뷰도 최고!',
      my_rating: 5,
      expenses: { food: 60000, transportation: 10000, activities: 10000 },
      is_public: true,
      like_count: 24,
      rating: 4.7,
      is_recommend: true,
      thumbnail: 'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang4.jpeg',
      created_at: now,
      updated_at: now
    }
  })
  console.log('데이트 코스 생성 완료:', dateCourse.id)

  // 5. 코스 이미지 생성
  const courseImage = await prisma.courseImage.create({
    data: {
      course_id: dateCourse.id,

      image_url: 'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang3.jpeg',
      description: '한강 야경',
      is_main: true,
      created_at: now
    }
  })
  console.log('코스 이미지 생성 완료:', courseImage.id)

  // 6. 코스-장소 연결 생성
  const coursePlaces = await prisma.coursePlaces.create({
    data: {
      course_id: dateCourse.id,
      place_id: place.id,
      visit_order: 1,
      recommended_time: 120,
      actual_time_spent: 130,
      tips: '자전거 대여소는 입구 오른쪽에 있으니 일찍 가는 것이 좋아요.',
      rating: 5,
      experience: '한강에서 자전거 타고 돌아다니니 너무 좋았어요. 날씨가 좋으면 야경이 정말 예쁩니다.',
      transport_to_next: '도보',
      time_to_next: 15,
      created_at: now,
      updated_at: now
    }
  })
  console.log('코스-장소 연결 생성 완료:', coursePlaces.id)

  // 7. 장소 방문 사진 생성
  const placeVisitPhoto = await prisma.placeVisitPhoto.create({
    data: {
      course_place_id: coursePlaces.id,
      image_url: 'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang3.jpeg',
      description: '한강 야경 사진',
      created_at: now
    }
  })
  console.log('장소 방문 사진 생성 완료:', placeVisitPhoto.id)

  // 8. 리뷰 생성
  const review = await prisma.review.create({
    data: {
      course_id: dateCourse.id,
      user_id: user.id,
      rating: 5,
      comment:
        '한강 야경이 정말 예뻐요! 카페에서 보는 한강 뷰도 좋고, 레스토랑도 분위기가 너무 좋았어요. 다음에 또 가고 싶은 코스입니다.',
      visited_date: new Date('2025-03-20'),
      created_at: now,
      updated_at: now
    }
  })
  console.log('리뷰 생성 완료:', review.id)

  // 9. 리뷰 이미지 생성
  const reviewImage = await prisma.reviewImage.create({
    data: {
      review_id: review.id,
      image_url: 'https://withus3bucket.s3.ap-northeast-2.amazonaws.com/hangang3.jpeg',
      description: '한강 야경 사진',
      created_at: now
    }
  })
  console.log('리뷰 이미지 생성 완료:', reviewImage.id)

  // 10. 좋아요 생성
  const like = await prisma.like.create({
    data: {
      user_id: user.id,
      course_id: dateCourse.id,
      created_at: now
    }
  })
  console.log('좋아요 생성 완료:', like.id)

  // 11. 저장된 코스 생성
  const savedCourse = await prisma.savedCourse.create({
    data: {
      user_id: user.id,
      course_id: dateCourse.id,
      notes: '다음 기념일에 가보고 싶은 코스',
      saved_at: now
    }
  })
  console.log('저장된 코스 생성 완료:', savedCourse.id)

  // 12. 소셜 연결 생성
  const socialConnection = await prisma.socialConnection.create({
    data: {
      user_id: user.id,
      provider: 'KAKAO',
      provider_user_id: '12345678',
      provider_data: {
        nickname: '민재',
        profile_image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      created_at: now,
      updated_at: now
    }
  })
  console.log('소셜 연결 생성 완료:', socialConnection.id)

  // 13. 인증 토큰 생성
  const authToken = await prisma.authToken.create({
    data: {
      user_id: user.id,
      refresh_token: 'refresh_token_example_' + Date.now(),
      access_token: 'access_token_example_' + Date.now(),
      device_info: 'Chrome on Windows',
      ip_address: '127.0.0.1',
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
      is_revoked: false,
      created_at: now,
      updated_at: now
    }
  })
  console.log('인증 토큰 생성 완료:', authToken.id)

  // 14. 데이트 미션 생성 (스키마에 있는 경우)
  try {
    const dateMission = await prisma.dateMission.create({
      data: {
        title: '한강 노을 보며 소원 적기',
        description: '한강에서 노을이 질 때 종이배에 서로의 소원을 적어 강에 띄워보세요.',
        category: '야외활동',
        difficulty: 2,
        estimatedTime: 60,
        place_type: '한강공원',
        seasons: ['봄', '가을'],
        time_of_day: ['저녁'],
        relationship_stage: '모든 단계',
        isActive: true,
        created_at: now,
        updated_at: now
      }
    })
    console.log('데이트 미션 생성 완료:', dateMission.id)
  } catch (e) {
    console.log('데이트 미션 모델이 없거나 생성 오류:', e.message)
  }

  console.log('모든 시드 데이터가 성공적으로 생성되었습니다!')
}

main()
  .catch(e => {
    console.error('시드 데이터 생성 중 오류 발생:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
