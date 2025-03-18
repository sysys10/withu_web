// MongoDB 데이트 코스 앱 데이터 삽입 스크립트
// mongosh 사용법: mongosh "mongodb+srv://username:password@cluster.example.mongodb.net/dbname" insert_data.js

// 데이터베이스 선택 (존재하지 않으면 자동 생성)
const dbName = 'withu'
db = db.getSiblingDB(dbName)

// 컬렉션 삭제 (기존 데이터 초기화)
db.User.drop()
db.SocialConnection.drop()
db.AuthToken.drop()
db.DateCourse.drop()
db.CourseImage.drop()
db.Place.drop()
db.PlacePhoto.drop()
db.CoursePlaces.drop()
db.PlaceVisitPhoto.drop()
db.SavedCourse.drop()
db.Review.drop()
db.ReviewImage.drop()
db.Like.drop()
db.Follow.drop()
db.DateMission.drop()

print('기존 컬렉션을 초기화했습니다.')

// 현재 시간 구하기
const now = new Date()

// bcrypt 해시를 대신하는 함수 (실제 해시는 아니지만 데모용으로 사용)
function mockPasswordHash(password) {
  return `hashed_${password}_${Date.now()}`
}

// ObjectId 생성 함수
function createObjectId() {
  return new ObjectId()
}

// 1. 사용자 생성
print('사용자 데이터 생성 중...')

const userId1 = createObjectId()
const userId2 = createObjectId()
const userId3 = createObjectId()

db.User.insertMany([
  {
    _id: userId1,
    email: 'minjae@example.com',
    hashed_password: mockPasswordHash('password123'),
    name: '김민재',
    gender: '남성',
    age: 28,
    profile_image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: '맛집 탐방과 여행을 좋아하는 남자입니다.',
    is_verified: true,
    isComplete: true,
    created_at: now,
    updated_at: now
  },
  {
    _id: userId2,
    email: 'jisoo@example.com',
    hashed_password: mockPasswordHash('password123'),
    name: '박지수',
    gender: '여성',
    age: 26,
    profile_image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: '영화 보는 걸 좋아하고 카페 탐방이 취미입니다.',
    is_verified: true,
    isComplete: true,
    created_at: now,
    updated_at: now
  },
  {
    _id: userId3,
    email: 'junyoung@example.com',
    hashed_password: mockPasswordHash('password123'),
    name: '이준영',
    gender: '남성',
    age: 30,
    profile_image: 'https://randomuser.me/api/portraits/men/55.jpg',
    bio: '사진 찍는 걸 좋아하는 30대 남성입니다.',
    is_verified: true,
    isComplete: true,
    created_at: now,
    updated_at: now
  }
])

// 코스 장소 방문 사진 추가
const placeVisitPhotoId1 = createObjectId()
const placeVisitPhotoId2 = createObjectId()
const placeVisitPhotoId3 = createObjectId()
const placeVisitPhotoId4 = createObjectId()
const placeVisitPhotoId5 = createObjectId()
const placeVisitPhotoId6 = createObjectId()

db.PlaceVisitPhoto.insertMany([
  {
    _id: placeVisitPhotoId1,
    course_place_id: coursePlaceId1,
    image_url:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    description: '한강 야경 사진',
    created_at: now
  },
  {
    _id: placeVisitPhotoId2,
    course_place_id: coursePlaceId1,
    image_url:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FetTlXZ%2FbtqR9ZvkMX6%2FYkMBiaKyOqVUlJVK6kZSw0%2Fimg.jpg',
    description: '자전거 대여해서 타는 중',
    created_at: now
  },
  {
    _id: placeVisitPhotoId3,
    course_place_id: coursePlaceId2,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
    description: '카페에서 본 한강 뷰',
    created_at: now
  },
  {
    _id: placeVisitPhotoId4,
    course_place_id: coursePlaceId2,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MjZfMjYg%2FMDAxNjY0MTkyNTAyMDYw.7PqSfWPs1mAf5QOPVH-Oy4l_YAtl6MilOpENQZGrMisg.jgHAKcO9sCk4Mf0AUrkqNr0BwHGqscNKl_Vn3GxTPJkg.JPEG.myhome_arirang%2F20220924%25A3%25DF152755.jpg',
    description: '아메리카노와 티라미수',
    created_at: now
  },
  {
    _id: placeVisitPhotoId5,
    course_place_id: coursePlaceId3,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMTMg%2FMDAxNTk4MjM5MDgwMTA3.xNrrw-VBV5h8kiBw4OIx5XsU1mt9OoOJ1JYoLq7IwjEg.X8-WVrHQgEGXEbSZfk_q5L3UDsOWzGtNM68mLRaUqucg.JPEG.ilovetb%2FKakaoTalk_20200824_104743744_15.jpg',
    description: '디너 플레이팅',
    created_at: now
  },
  {
    _id: placeVisitPhotoId6,
    course_place_id: coursePlaceId3,
    image_url:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbB8K0P%2FbtqIPczTHkQ%2FKlHH49FTrwDOfyRvUqy1t0%2Fimg.jpg',
    description: '와인 페어링',
    created_at: now
  }
])

// 4. 리뷰 생성
print('리뷰 데이터 생성 중...')

const reviewId1 = createObjectId()
const reviewId2 = createObjectId()
const reviewId3 = createObjectId()

const reviewImageId1 = createObjectId()
const reviewImageId2 = createObjectId()
const reviewImageId3 = createObjectId()

// 한강 데이트 코스 리뷰
db.Review.insertMany([
  {
    _id: reviewId1,
    course_id: courseId1,
    user_id: userId2,
    rating: 5,
    comment:
      '한강 야경이 정말 예뻐요! 카페에서 보는 한강 뷰도 좋고, 레스토랑도 분위기가 너무 좋았어요. 다음에 또 가고 싶은 코스입니다.',
    visited_date: new Date('2025-03-20'),
    created_at: now,
    updated_at: now
  },
  {
    _id: reviewId2,
    course_id: courseId1,
    user_id: userId3,
    rating: 4,
    comment:
      '전반적으로 좋은 코스였어요. 한강 자전거 대여는 주말에는 사람이 많아서 조금 기다렸어요. 카페 뷰는 정말 좋았고 레스토랑도 맛있었습니다!',
    visited_date: new Date('2025-03-10'),
    created_at: now,
    updated_at: now
  },
  {
    _id: reviewId3,
    course_id: courseId2,
    user_id: userId1,
    rating: 4,
    comment:
      '영화관이 생각보다 아늑하고 좋았어요. 카페도 분위기가 좋아서 데이트 하기에 딱 좋은 코스입니다. 비 오는 날 가기 좋아요!',
    visited_date: new Date('2025-02-25'),
    created_at: now,
    updated_at: now
  }
])

// 리뷰 이미지 추가
db.ReviewImage.insertMany([
  {
    _id: reviewImageId1,
    review_id: reviewId1,
    image_url:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    description: '한강 야경 사진',
    created_at: now
  },
  {
    _id: reviewImageId2,
    review_id: reviewId1,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMTMg%2FMDAxNTk4MjM5MDgwMTA3.xNrrw-VBV5h8kiBw4OIx5XsU1mt9OoOJ1JYoLq7IwjEg.X8-WVrHQgEGXEbSZfk_q5L3UDsOWzGtNM68mLRaUqucg.JPEG.ilovetb%2FKakaoTalk_20200824_104743744_15.jpg',
    description: '레스토랑 음식',
    created_at: now
  },
  {
    _id: reviewImageId3,
    review_id: reviewId2,
    image_url:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FetTlXZ%2FbtqR9ZvkMX6%2FYkMBiaKyOqVUlJVK6kZSw0%2Fimg.jpg',
    description: '한강 자전거 타기',
    created_at: now
  }
])

// 5. 좋아요 생성
print('좋아요 데이터 생성 중...')

const likeId1 = createObjectId()
const likeId2 = createObjectId()
const likeId3 = createObjectId()

db.Like.insertMany([
  {
    _id: likeId1,
    user_id: userId2,
    course_id: courseId1,
    created_at: now
  },
  {
    _id: likeId2,
    user_id: userId3,
    course_id: courseId1,
    created_at: now
  },
  {
    _id: likeId3,
    user_id: userId1,
    course_id: courseId2,
    created_at: now
  }
])

// 6. 저장된 코스 생성
print('저장된 코스 데이터 생성 중...')

const savedCourseId1 = createObjectId()
const savedCourseId2 = createObjectId()
const savedCourseId3 = createObjectId()

db.SavedCourse.insertMany([
  {
    _id: savedCourseId1,
    user_id: userId2,
    course_id: courseId1,
    notes: '다음 기념일에 가보고 싶은 코스',
    saved_at: now
  },
  {
    _id: savedCourseId2,
    user_id: userId3,
    course_id: courseId1,
    notes: '한강 야경이 예뻐 보이는 코스',
    saved_at: now
  },
  {
    _id: savedCourseId3,
    user_id: userId1,
    course_id: courseId2,
    notes: '비 오는 날 실내 데이트 코스로 좋을 듯',
    saved_at: now
  }
])

// 7. 팔로우 관계 생성
print('팔로우 관계 데이터 생성 중...')

const followId1 = createObjectId()
const followId2 = createObjectId()
const followId3 = createObjectId()

db.Follow.insertMany([
  {
    _id: followId1,
    follower_id: userId2,
    following_id: userId1,
    created_at: now
  },
  {
    _id: followId2,
    follower_id: userId3,
    following_id: userId1,
    created_at: now
  },
  {
    _id: followId3,
    follower_id: userId1,
    following_id: userId2,
    created_at: now
  }
])

// 8. 데이트 미션 생성
print('데이트 미션 데이터 생성 중...')

const missionId1 = createObjectId()
const missionId2 = createObjectId()
const missionId3 = createObjectId()

db.DateMission.insertMany([
  {
    _id: missionId1,
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
  },
  {
    _id: missionId2,
    title: '맛있는 디저트 맞추기',
    description: '서로 눈을 가리고 상대방이 고른 디저트 맛을 맞춰보세요. 틀릴 때마다 벌칙!',
    category: '카페',
    difficulty: 1,
    estimatedTime: 30,
    place_type: '카페',
    seasons: ['사계절'],
    time_of_day: ['오후', '저녁'],
    relationship_stage: '초기',
    isActive: true,
    created_at: now,
    updated_at: now
  },
  {
    _id: missionId3,
    title: '영화 대사 따라하기',
    description: '함께 본 영화의 대사를 서로 몰래 녹음해 상대방에게 들려주고 어떤 장면인지 맞춰보세요.',
    category: '문화',
    difficulty: 3,
    estimatedTime: 45,
    place_type: '영화관',
    seasons: ['사계절'],
    time_of_day: ['전체'],
    relationship_stage: '중기',
    isActive: true,
    created_at: now,
    updated_at: now
  }
])

print('모든 더미 데이터가 성공적으로 생성되었습니다!')
print('총 생성된 데이터:')
print('- 사용자: ' + db.User.countDocuments() + '명')
print('- 장소: ' + db.Place.countDocuments() + '개')
print('- 데이트 코스: ' + db.DateCourse.countDocuments() + '개')
print('- 리뷰: ' + db.Review.countDocuments() + '개')
print('- 좋아요: ' + db.Like.countDocuments() + '개')
print('- 저장된 코스: ' + db.SavedCourse.countDocuments() + '개')
print('- 팔로우 관계: ' + db.Follow.countDocuments() + '개')
print('- 데이트 미션: ' + db.DateMission.countDocuments() + '개')

// 소셜 연결 추가
const socialId1 = createObjectId()
db.SocialConnection.insertOne({
  _id: socialId1,
  user_id: userId3,
  provider: 'KAKAO',
  provider_user_id: '12345678',
  provider_data: {
    nickname: '준영',
    profile_image: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  created_at: now,
  updated_at: now
})

// 2. 장소 데이터 생성
print('장소 데이터 생성 중...')

const placeId1 = createObjectId()
const placeId2 = createObjectId()
const placeId3 = createObjectId()
const placeId4 = createObjectId()

const placePhotoId1 = createObjectId()
const placePhotoId2 = createObjectId()

db.Place.insertMany([
  {
    _id: placeId1,
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
      'https://www.culture.go.kr/upload/rdf/22/03/show_2022032211453677278.jpg',
      'https://i.pinimg.com/originals/75/d4/a6/75d4a6a6ee722c384694b666179b8e77.jpg',
      'https://blog.kakaocdn.net/dn/bGDjR8/btqUWYftZHw/EwQKNvUPpTLYvE1kWk9YvK/img.jpg'
    ],
    thumbnail: 'https://www.culture.go.kr/upload/rdf/22/03/show_2022032211453677278.jpg',
    naver_rating: 4.5,
    naver_review_count: 1245,
    created_at: now,
    updated_at: now
  },
  {
    _id: placeId2,
    name: '리버뷰 카페',
    address: '서울특별시 마포구 합정동 123-45',
    road_address: '서울특별시 마포구 월드컵로 123',
    latitude: 37.5505,
    longitude: 126.917,
    category: '카페',
    naver_place_id: 'place_cafe_1',
    naver_category: '음식점 > 카페',
    phone: '02-123-4567',
    homepage: 'https://example.com/riverview',
    business_hours: {
      monday: '10:00-22:00',
      tuesday: '10:00-22:00',
      wednesday: '10:00-22:00',
      thursday: '10:00-22:00',
      friday: '10:00-23:00',
      saturday: '10:00-23:00',
      sunday: '11:00-22:00'
    },
    description: '한강이 보이는 전망 좋은 카페입니다. 커피와 디저트가 맛있기로 유명합니다.',
    image_url: [
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MjZfMjYg%2FMDAxNjY0MTkyNTAyMDYw.7PqSfWPs1mAf5QOPVH-Oy4l_YAtl6MilOpENQZGrMisg.jgHAKcO9sCk4Mf0AUrkqNr0BwHGqscNKl_Vn3GxTPJkg.JPEG.myhome_arirang%2F20220924%25A3%25DF152755.jpg',
      'https://blog.kakaocdn.net/dn/Xz5ax/btrJZnBFbNu/Jg7KbJkiU40WwXkWA0o5I1/img.jpg'
    ],
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
    naver_rating: 4.3,
    naver_review_count: 528,
    my_rating: 5,
    my_notes: '창가 자리가 뷰가 정말 좋다. 아메리카노와 티라미수 추천!',
    created_at: now,
    updated_at: now
  },
  {
    _id: placeId3,
    name: '로맨틱 이탈리안',
    address: '서울특별시 용산구 이태원동 456-78',
    road_address: '서울특별시 용산구 이태원로 456',
    latitude: 37.5348,
    longitude: 126.9947,
    category: '레스토랑',
    naver_place_id: 'place_restaurant_1',
    naver_category: '음식점 > 이탈리안',
    phone: '02-987-6543',
    homepage: 'https://example.com/romantic-italian',
    business_hours: {
      monday: '11:30-15:00,17:30-22:00',
      tuesday: '11:30-15:00,17:30-22:00',
      wednesday: '11:30-15:00,17:30-22:00',
      thursday: '11:30-15:00,17:30-22:00',
      friday: '11:30-15:00,17:30-23:00',
      saturday: '11:30-23:00',
      sunday: '11:30-22:00'
    },
    description: '로맨틱한 분위기에서 즐기는 정통 이탈리안 레스토랑. 수제 파스타와 와인이 유명합니다.',
    image_url: [
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMTMg%2FMDAxNTk4MjM5MDgwMTA3.xNrrw-VBV5h8kiBw4OIx5XsU1mt9OoOJ1JYoLq7IwjEg.X8-WVrHQgEGXEbSZfk_q5L3UDsOWzGtNM68mLRaUqucg.JPEG.ilovetb%2FKakaoTalk_20200824_104743744_15.jpg',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMThfOTAg%2FMDAxNjc0MDM1NzU0MDA5.P1BNzrN3fJsm4I5W9BW42rLVIk6USrKwGa7S42_M9xsg.t2Qn6g3h5VnQdsjLZf9WC7ObP-vRZzj-pn-D8IU1hIMg.JPEG.heeya9843%2F20230118%25A3%25DF161850.jpg',
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbB8K0P%2FbtqIPczTHkQ%2FKlHH49FTrwDOfyRvUqy1t0%2Fimg.jpg'
    ],
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMTMg%2FMDAxNTk4MjM5MDgwMTA3.xNrrw-VBV5h8kiBw4OIx5XsU1mt9OoOJ1JYoLq7IwjEg.X8-WVrHQgEGXEbSZfk_q5L3UDsOWzGtNM68mLRaUqucg.JPEG.ilovetb%2FKakaoTalk_20200824_104743744_15.jpg',
    naver_rating: 4.7,
    naver_review_count: 876,
    created_at: now,
    updated_at: now
  },
  {
    _id: placeId4,
    name: '시네마 파라다이스',
    address: '서울특별시 마포구 서교동 789-10',
    road_address: '서울특별시 마포구 월드컵북로 789',
    latitude: 37.5566,
    longitude: 126.9256,
    category: '영화관',
    naver_place_id: 'place_cinema_1',
    naver_category: '문화시설 > 영화관',
    phone: '02-345-6789',
    homepage: 'https://example.com/cinema-paradise',
    business_hours: {
      monday: '10:00-24:00',
      tuesday: '10:00-24:00',
      wednesday: '10:00-24:00',
      thursday: '10:00-24:00',
      friday: '10:00-02:00',
      saturday: '09:00-02:00',
      sunday: '09:00-24:00'
    },
    description: '독립영화와 예술영화를 주로 상영하는 아트 시네마. 커플 좌석과 프라이빗 상영관이 있습니다.',
    image_url: [
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg',
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrWkl3%2FbtqCxhgVcDY%2FKNB9nOLe9HmGPw7o9fZMY0%2Fimg.jpg',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MDVfNTIg%2FMDAxNjg1OTQ2ODU2NTA0.IBB6E39VC3eM2fxvElKkw4sLGtw4l-mJdT9GXrBKrZ8g.E4GBNMcQ40AW_mJIq5H-i9NuG6vSiLzTFzjK2Q4K2Ogg.JPEG.wltjd1300%2FIMG_0069.jpg'
    ],
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg',
    naver_rating: 4.2,
    naver_review_count: 342,
    created_at: now,
    updated_at: now
  }
])

// 장소 사진 추가
db.PlacePhoto.insertMany([
  {
    _id: placePhotoId1,
    place_id: placeId1,
    image_url:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    description: '한강에서 찍은 야경 사진',
    taken_at: new Date('2025-02-15T18:30:00Z'),
    created_at: now
  },
  {
    _id: placePhotoId2,
    place_id: placeId1,
    image_url:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FetTlXZ%2FbtqR9ZvkMX6%2FYkMBiaKyOqVUlJVK6kZSw0%2Fimg.jpg',
    description: '한강에서 자전거 타기',
    taken_at: new Date('2025-02-15T16:45:00Z'),
    created_at: now
  }
])

// 3. 데이트 코스 생성
print('데이트 코스 데이터 생성 중...')

const courseId1 = createObjectId()
const courseId2 = createObjectId()

// 코스 이미지 ID
const courseImageId1 = createObjectId()
const courseImageId2 = createObjectId()
const courseImageId3 = createObjectId()
const courseImageId4 = createObjectId()
const courseImageId5 = createObjectId()

// 한강 데이트 코스
db.DateCourse.insertOne({
  _id: courseId1,
  name: '한강 로맨틱 데이트 코스',
  description: '여의도 한강공원에서 시작해 카페와 레스토랑을 즐기는 로맨틱한 데이트 코스',
  creator_id: userId1,
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
  thumbnail:
    'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
  created_at: now,
  updated_at: now
})

// 영화관 데이트 코스
db.DateCourse.insertOne({
  _id: courseId2,
  name: '홍대 영화 & 카페 데이트',
  description: '홍대에서 영화 보고 카페에서 여유로운 시간을 보내는 데이트 코스',
  creator_id: userId2,
  tags: ['영화', '카페', '실내', '홍대'],
  price: 50000,
  total_time: 240,
  total_distance: 1000,
  mood: '편안한',
  best_season: '사계절',
  best_time: '저녁',
  visited_date: new Date('2025-02-20'),
  my_review:
    '비 오는 날 실내에서 즐기기 좋은 데이트 코스예요. 영화관 좌석이 편안하고 카페도 분위기 있어서 대화하기 좋았어요!',
  my_rating: 4,
  expenses: { food: 30000, transportation: 5000, activities: 15000 },
  is_public: true,
  like_count: 15,
  rating: 4.2,
  thumbnail:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg',
  created_at: now,
  updated_at: now
})

// 코스 이미지 추가
db.CourseImage.insertMany([
  {
    _id: courseImageId1,
    course_id: courseId1,
    image_url:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    description: '한강 야경',
    is_main: true,
    created_at: now
  },
  {
    _id: courseImageId2,
    course_id: courseId1,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
    description: '리버뷰 카페에서',
    is_main: false,
    created_at: now
  },
  {
    _id: courseImageId3,
    course_id: courseId1,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMTMg%2FMDAxNTk4MjM5MDgwMTA3.xNrrw-VBV5h8kiBw4OIx5XsU1mt9OoOJ1JYoLq7IwjEg.X8-WVrHQgEGXEbSZfk_q5L3UDsOWzGtNM68mLRaUqucg.JPEG.ilovetb%2FKakaoTalk_20200824_104743744_15.jpg',
    description: '로맨틱 이탈리안에서 디너',
    is_main: false,
    created_at: now
  },
  {
    _id: courseImageId4,
    course_id: courseId2,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg',
    description: '영화관 입구',
    is_main: true,
    created_at: now
  },
  {
    _id: courseImageId5,
    course_id: courseId2,
    image_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
    description: '카페에서의 티타임',
    is_main: false,
    created_at: now
  }
])

// 코스-장소 연결 생성
const coursePlaceId1 = createObjectId()
const coursePlaceId2 = createObjectId()
const coursePlaceId3 = createObjectId()
const coursePlaceId4 = createObjectId()
const coursePlaceId5 = createObjectId()

db.CoursePlaces.insertMany([
  {
    _id: coursePlaceId1,
    course_id: courseId1,
    place_id: placeId1,
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
  },
  {
    _id: coursePlaceId2,
    course_id: courseId1,
    place_id: placeId2,
    visit_order: 2,
    recommended_time: 90,
    actual_time_spent: 100,
    tips: '창가 자리가 한강이 보여서 뷰가 좋아요. 예약 필수!',
    rating: 5,
    experience: '커피와 디저트가 맛있고 한강 뷰가 정말 예쁨. 대화하기에 분위기도 좋았어요.',
    transport_to_next: '택시',
    time_to_next: 20,
    created_at: now,
    updated_at: now
  },
  {
    _id: coursePlaceId3,
    course_id: courseId1,
    place_id: placeId3,
    visit_order: 3,
    recommended_time: 120,
    actual_time_spent: 130,
    tips: '주말에는 미리 예약하는 것이 좋아요. 와인 페어링 코스 추천!',
    rating: 4,
    experience:
      '분위기 좋은 레스토랑에서 맛있는 파스타와 와인으로 마무리. 가격은 조금 있지만 특별한 날 방문하기 좋아요.',
    created_at: now,
    updated_at: now
  },
  {
    _id: coursePlaceId4,
    course_id: courseId2,
    place_id: placeId4,
    visit_order: 1,
    recommended_time: 150,
    actual_time_spent: 160,
    tips: '커플석은 미리 예약하는 것이 좋아요. 평일 저녁 타임은 사람이 적어요.',
    rating: 4,
    experience: '아늑한 분위기의 영화관에서 편안하게 영화를 봤어요. 일반 영화관보다 좌석이 편안하고 공간이 여유로워요.',
    transport_to_next: '도보',
    time_to_next: 10,
    created_at: now,
    updated_at: now
  },
  {
    _id: coursePlaceId5,
    course_id: courseId2,
    place_id: placeId2,
    visit_order: 2,
    recommended_time: 90,
    actual_time_spent: 85,
    tips: '영화 후기를 나누기 좋은 조용한 자리는 2층에 있어요.',
    rating: 4,
    experience: '영화 본 후 영화 이야기를 나누며 커피와 디저트를 즐겼어요. 카페 분위기가 아늑해서 대화하기 좋았어요.',
    created_at: now,
    updated_at: now
  }
])

print('데이트 코스 데이터 생성 완료')
