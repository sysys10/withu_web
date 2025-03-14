// MongoDB Shell에서 실행할 단순화된 더미 데이터 스크립트
// 한 줄씩 복사해서 붙여넣어 실행하세요

// 기존 데이터 삭제
db.ReviewImage.deleteMany({})
db.Review.deleteMany({})
db.SavedCourse.deleteMany({})
db.CoursePlaces.deleteMany({})
db.DateCourse.deleteMany({})
db.Place.deleteMany({})
db.SocialConnection.deleteMany({})
db.AuthToken.deleteMany({})
db.User.deleteMany({})

// 변수 정의
const user1Id = ObjectId()
const user2Id = ObjectId()
const user3Id = ObjectId()

const place1Id = ObjectId() // 스타벅스 강남점
const place2Id = ObjectId() // 교보문고 광화문점
const place3Id = ObjectId() // 롯데시네마 월드타워
const place4Id = ObjectId() // 한강공원 반포지구
const place5Id = ObjectId() // 남산서울타워
const place6Id = ObjectId() // 코엑스몰

const course1Id = ObjectId() // 강남 데이트 코스
const course2Id = ObjectId() // 문화 데이트 코스
const course3Id = ObjectId() // 한강 데이트 코스
const course4Id = ObjectId() // 남산 데이트 코스
const course5Id = ObjectId() // 송파 데이트 코스

const review1Id = ObjectId()
const review2Id = ObjectId()
const review3Id = ObjectId()

// 1. 사용자 데이터 삽입
db.User.insertOne({
  _id: user1Id,
  email: 'user1@example.com',
  hashed_password: '$2b$10$12345678901234567890abcdefABCDEFabcdefABCDEFabcdefABCDEFabcdefAB',
  isComplete: true,
  name: '김철수',
  gender: '남성',
  age: 28,
  profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: '취미는 여행과 맛집 탐방입니다.',
  is_verified: true,
  created_at: new Date(),
  updated_at: new Date()
})

db.User.insertOne({
  _id: user2Id,
  email: 'user2@example.com',
  hashed_password: '$2b$10$12345678901234567890abcdefABCDEFabcdefABCDEFabcdefABCDEFabcdefAB',
  isComplete: true,
  name: '이영희',
  gender: '여성',
  age: 26,
  profile_image: 'https://randomuser.me/api/portraits/women/2.jpg',
  bio: '음악과 영화를 좋아합니다.',
  is_verified: true,
  created_at: new Date(),
  updated_at: new Date()
})

db.User.insertOne({
  _id: user3Id,
  email: 'user3@example.com',
  hashed_password: '$2b$10$12345678901234567890abcdefABCDEFabcdefABCDEFabcdefABCDEFabcdefAB',
  isComplete: true,
  name: '박지민',
  gender: '남성',
  age: 30,
  profile_image: 'https://randomuser.me/api/portraits/men/3.jpg',
  bio: '맛집 탐방을 즐겨합니다.',
  is_verified: true,
  created_at: new Date(),
  updated_at: new Date()
})

// 2. 장소 데이터 삽입
db.Place.insertOne({
  _id: place1Id,
  name: '스타벅스 강남점',
  address: '서울특별시 강남구 테헤란로 123',
  road_address: '서울특별시 강남구 테헤란로 123',
  latitude: 37.4967,
  longitude: 127.0276,
  category: '카페',
  naver_place_id: 'place_1',
  naver_category: '카페,디저트',
  phone: '02-123-4567',
  homepage: 'https://www.starbucks.co.kr',
  business_hours: {
    monday: '07:00-22:00',
    tuesday: '07:00-22:00',
    wednesday: '07:00-22:00',
    thursday: '07:00-22:00',
    friday: '07:00-22:00',
    saturday: '08:00-22:00',
    sunday: '08:00-22:00'
  },
  description: '강남의 대표적인 스타벅스 매장입니다.',
  thumbnail: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3337&auto=format&fit=crop',
  naver_rating: 4.5,
  naver_review_count: 120,
  created_at: new Date(),
  updated_at: new Date()
})

db.Place.insertOne({
  _id: place2Id,
  name: '교보문고 광화문점',
  address: '서울특별시 종로구 종로 1',
  road_address: '서울특별시 종로구 종로 1',
  latitude: 37.5704,
  longitude: 126.9781,
  category: '서점',
  naver_place_id: 'place_2',
  naver_category: '서점,문화시설',
  phone: '02-397-3500',
  homepage: 'https://www.kyobobook.co.kr',
  business_hours: {
    monday: '09:30-22:00',
    tuesday: '09:30-22:00',
    wednesday: '09:30-22:00',
    thursday: '09:30-22:00',
    friday: '09:30-22:00',
    saturday: '09:30-22:00',
    sunday: '09:30-22:00'
  },
  description: '국내 최대 규모의 서점입니다.',
  thumbnail: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=3271&auto=format&fit=crop',
  naver_rating: 4.7,
  naver_review_count: 300,
  created_at: new Date(),
  updated_at: new Date()
})

db.Place.insertOne({
  _id: place3Id,
  name: '롯데시네마 월드타워',
  address: '서울특별시 송파구 올림픽로 300',
  road_address: '서울특별시 송파구 올림픽로 300',
  latitude: 37.5126,
  longitude: 127.1025,
  category: '영화관',
  naver_place_id: 'place_3',
  naver_category: '영화관,문화시설',
  phone: '1544-8855',
  homepage: 'https://www.lottecinema.co.kr',
  business_hours: {
    monday: '10:00-24:00',
    tuesday: '10:00-24:00',
    wednesday: '10:00-24:00',
    thursday: '10:00-24:00',
    friday: '10:00-24:00',
    saturday: '10:00-24:00',
    sunday: '10:00-24:00'
  },
  description: '최신 시설을 갖춘 대형 영화관입니다.',
  thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=3270&auto=format&fit=crop',
  naver_rating: 4.6,
  naver_review_count: 250,
  created_at: new Date(),
  updated_at: new Date()
})

db.Place.insertOne({
  _id: place4Id,
  name: '한강공원 반포지구',
  address: '서울특별시 서초구 신반포로11길 40',
  road_address: '서울특별시 서초구 신반포로11길 40',
  latitude: 37.5099,
  longitude: 126.9968,
  category: '공원',
  naver_place_id: 'place_4',
  naver_category: '공원,레저,액티비티',
  phone: '02-591-5943',
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
  description: '반포대교 무지개분수가 있는 한강공원입니다.',
  thumbnail: 'https://images.unsplash.com/photo-1601621915196-b8b7c394b73d?q=80&w=2970&auto=format&fit=crop',
  naver_rating: 4.8,
  naver_review_count: 500,
  created_at: new Date(),
  updated_at: new Date()
})

db.Place.insertOne({
  _id: place5Id,
  name: '남산서울타워',
  address: '서울특별시 용산구 남산공원길 105',
  road_address: '서울특별시 용산구 남산공원길 105',
  latitude: 37.5512,
  longitude: 126.9882,
  category: '관광명소',
  naver_place_id: 'place_5',
  naver_category: '관광,명소',
  phone: '02-3455-9277',
  homepage: 'https://www.seoultower.co.kr',
  business_hours: {
    monday: '10:00-23:00',
    tuesday: '10:00-23:00',
    wednesday: '10:00-23:00',
    thursday: '10:00-23:00',
    friday: '10:00-23:00',
    saturday: '10:00-23:00',
    sunday: '10:00-23:00'
  },
  description: '서울의 상징인 남산서울타워입니다.',
  thumbnail: 'https://images.unsplash.com/photo-1584637869437-040edf2292fe?q=80&w=3270&auto=format&fit=crop',
  naver_rating: 4.7,
  naver_review_count: 800,
  created_at: new Date(),
  updated_at: new Date()
})

db.Place.insertOne({
  _id: place6Id,
  name: '코엑스몰',
  address: '서울특별시 강남구 영동대로 513',
  road_address: '서울특별시 강남구 영동대로 513',
  latitude: 37.5126,
  longitude: 127.0593,
  category: '쇼핑',
  naver_place_id: 'place_6',
  naver_category: '쇼핑,몰',
  phone: '02-6000-0114',
  homepage: 'https://www.coexmall.com',
  business_hours: {
    monday: '10:30-22:00',
    tuesday: '10:30-22:00',
    wednesday: '10:30-22:00',
    thursday: '10:30-22:00',
    friday: '10:30-22:00',
    saturday: '10:30-22:00',
    sunday: '10:30-22:00'
  },
  description: '대형 쇼핑몰과 수족관, 별마당 도서관이 있는 복합문화공간입니다.',
  thumbnail: 'https://images.unsplash.com/photo-1618840376620-8835aa0adf31?q=80&w=2941&auto=format&fit=crop',
  naver_rating: 4.5,
  naver_review_count: 600,
  created_at: new Date(),
  updated_at: new Date()
})

// 3. 데이트 코스 데이터 삽입
db.DateCourse.insertOne({
  _id: course1Id,
  name: '강남 데이트 코스',
  description: '강남에서 즐기는 커피와 쇼핑 데이트',
  creator_id: user1Id,
  thumbnail: 'https://images.unsplash.com/photo-1553969923-bbf91ae9122e?q=80&w=3269&auto=format&fit=crop',
  tags: ['카페', '쇼핑', '실내', '강남'],
  price: 50000,
  total_time: 240,
  total_distance: 3,
  is_public: true,
  view_count: 120,
  like_count: 45,
  rating: 4.8,
  created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1주일 전
  updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  is_recommend: true
})

db.DateCourse.insertOne({
  _id: course2Id,
  name: '문화 데이트 코스',
  description: '책과 영화로 즐기는 문화 데이트',
  creator_id: user2Id,
  thumbnail: 'https://images.unsplash.com/photo-1534801022022-6e319a11f249?q=80&w=3270&auto=format&fit=crop',
  tags: ['서점', '영화', '실내', '광화문'],
  price: 35000,
  total_time: 300,
  total_distance: 2,
  is_public: true,
  view_count: 85,
  like_count: 32,
  rating: 4.5,
  created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2주일 전
  updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  is_recommend: true
})

db.DateCourse.insertOne({
  _id: course3Id,
  name: '한강 데이트 코스',
  description: '한강에서 즐기는 로맨틱한 데이트',
  creator_id: user1Id,
  thumbnail: 'https://images.unsplash.com/photo-1522686681175-5f6384129000?q=80&w=3348&auto=format&fit=crop',
  tags: ['공원', '야외', '한강', '산책'],
  price: 20000,
  total_time: 180,
  total_distance: 4,
  is_public: true,
  view_count: 150,
  like_count: 67,
  rating: 4.9,
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
  updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  is_recommend: true
})

db.DateCourse.insertOne({
  _id: course4Id,
  name: '남산 데이트 코스',
  description: '남산에서 즐기는 뷰 맛집 데이트',
  creator_id: user3Id,
  thumbnail: 'https://images.unsplash.com/photo-1585107882441-275175eb42b7?q=80&w=3270&auto=format&fit=crop',
  tags: ['관광', '야경', '남산', '타워'],
  price: 40000,
  total_time: 240,
  total_distance: 3,
  is_public: true,
  view_count: 110,
  like_count: 48,
  rating: 4.7,
  created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10일 전
  updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  is_recommend: true
})

db.DateCourse.insertOne({
  _id: course5Id,
  name: '송파 데이트 코스',
  description: '롯데타워에서 즐기는 하이엔드 데이트',
  creator_id: user2Id,
  thumbnail: 'https://images.unsplash.com/photo-1516727003284-a96541e51e9c?q=80&w=3348&auto=format&fit=crop',
  tags: ['영화', '쇼핑', '실내', '송파'],
  price: 60000,
  total_time: 360,
  total_distance: 1,
  is_public: true,
  view_count: 95,
  like_count: 39,
  rating: 4.6,
  created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5일 전
  updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  is_recommend: true
})

// 4. 코스 장소 연결 데이터 삽입
db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course1Id,
  place_id: place1Id, // 스타벅스 강남점
  visit_order: 1,
  recommended_time: 60,
  tips: '창가 자리에 앉으면 전망이 좋습니다.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course1Id,
  place_id: place6Id, // 코엑스몰
  visit_order: 2,
  recommended_time: 180,
  tips: '별마당 도서관은 꼭 방문해보세요.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course2Id,
  place_id: place2Id, // 교보문고 광화문점
  visit_order: 1,
  recommended_time: 120,
  tips: '핫플레이스 내 카페에서 책을 읽으며 커피를 즐겨보세요.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course2Id,
  place_id: place3Id, // 롯데시네마 월드타워
  visit_order: 2,
  recommended_time: 180,
  tips: '특별관에서 영화를 관람하면 더 특별한 경험이 됩니다.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course3Id,
  place_id: place4Id, // 한강공원 반포지구
  visit_order: 1,
  recommended_time: 180,
  tips: '일몰 시간에 맞춰 방문하면 무지개분수와 야경을 감상할 수 있습니다.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course4Id,
  place_id: place5Id, // 남산서울타워
  visit_order: 1,
  recommended_time: 240,
  tips: '전망대에서 서울 전경을 감상하고 사랑의 자물쇠를 걸어보세요.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course5Id,
  place_id: place3Id, // 롯데시네마 월드타워
  visit_order: 1,
  recommended_time: 180,
  tips: '특별관 영화 예매는 미리 하는 것이 좋습니다.',
  created_at: new Date(),
  updated_at: new Date()
})

db.CoursePlaces.insertOne({
  _id: ObjectId(),
  course_id: course5Id,
  place_id: place6Id, // 코엑스몰
  visit_order: 2,
  recommended_time: 180,
  tips: '쇼핑 후 푸드코트에서 다양한 음식을 즐겨보세요.',
  created_at: new Date(),
  updated_at: new Date()
})

// 5. 저장된 코스 데이터 삽입
db.SavedCourse.insertOne({
  _id: ObjectId(),
  user_id: user1Id,
  course_id: course2Id, // 문화 데이트 코스
  saved_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5일 전
})

db.SavedCourse.insertOne({
  _id: ObjectId(),
  user_id: user2Id,
  course_id: course1Id, // 강남 데이트 코스
  saved_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3일 전
})

db.SavedCourse.insertOne({
  _id: ObjectId(),
  user_id: user3Id,
  course_id: course3Id, // 한강 데이트 코스
  saved_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1일 전
})

// 6. 리뷰 데이터 삽입
db.Review.insertOne({
  _id: review1Id,
  course_id: course1Id, // 강남 데이트 코스
  user_id: user2Id,
  rating: 5,
  comment: '정말 좋은 데이트 코스였습니다. 스타벅스에서 커피를 마시고 코엑스몰에서 쇼핑하는 코스가 완벽했어요!',
  visited_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8일 전
  created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7일 전
  updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
})

db.Review.insertOne({
  _id: review2Id,
  course_id: course2Id, // 문화 데이트 코스
  user_id: user1Id,
  rating: 4,
  comment: '교보문고에서 책을 고르고 영화를 보는 데이트는 문화적인 느낌이 좋았습니다. 다음에도 방문하고 싶어요.',
  visited_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15일 전
  created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14일 전
  updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
})

db.Review.insertOne({
  _id: review3Id,
  course_id: course3Id, // 한강 데이트 코스
  user_id: user3Id,
  rating: 5,
  comment: '한강에서의 데이트는 정말 로맨틱했습니다. 특히 일몰 시간에 무지개분수를 보는 건 잊지 못할 경험이었어요.',
  visited_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4일 전
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
  updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
})

// 7. 리뷰 이미지 데이터 삽입
db.ReviewImage.insertOne({
  _id: ObjectId(),
  review_id: review1Id,
  image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop',
  created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7일 전
})

db.ReviewImage.insertOne({
  _id: ObjectId(),
  review_id: review1Id,
  image_url: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=2787&auto=format&fit=crop',
  created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7일 전
})

db.ReviewImage.insertOne({
  _id: ObjectId(),
  review_id: review2Id,
  image_url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=3290&auto=format&fit=crop',
  created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14일 전
})

db.ReviewImage.insertOne({
  _id: ObjectId(),
  review_id: review3Id,
  image_url: 'https://images.unsplash.com/photo-1556741581-429e0d265096?q=80&w=3270&auto=format&fit=crop',
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3일 전
})

db.ReviewImage.insertOne({
  _id: ObjectId(),
  review_id: review3Id,
  image_url: 'https://images.unsplash.com/photo-1594392031173-e25188a2880b?q=80&w=2786&auto=format&fit=crop',
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3일 전
})

// 8. 인증 토큰 (로그인 세션용)
db.AuthToken.insertOne({
  _id: ObjectId(),
  user_id: user1Id,
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  device_info: 'Chrome on Windows',
  ip_address: '192.168.1.1',
  expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
  is_revoked: false,
  created_at: new Date(),
  updated_at: new Date()
})
// 8. 인증 토큰 (계속)
db.AuthToken.insertOne({
  _id: ObjectId(),
  user_id: user2Id,
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwOTg3NjU0MzIxIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.qREPrRJ159AvbcYU_oXBgdTqW1VI70_NYzOT0eWvYvU',
  device_info: 'Safari on MacOS',
  ip_address: '192.168.1.2',
  expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
  is_revoked: false,
  created_at: new Date(),
  updated_at: new Date()
})

// 9. 소셜 연결 (소셜 로그인 정보)
db.SocialConnection.insertOne({
  _id: ObjectId(),
  user_id: user3Id,
  provider: 'KAKAO',
  provider_user_id: 'kakao_user_123456789',
  provider_data: {
    nickname: '카카오닉네임',
    profile_image: 'https://example.com/kakao_profile.jpg'
  },
  created_at: new Date(),
  updated_at: new Date()
})

// 데이터 검증 쿼리 - 각 명령어를 한 줄씩 실행하세요
// 사용자 수 확인
db.User.countDocuments({})

// 장소 수 확인
db.Place.countDocuments({})

// 데이트 코스 수 확인
db.DateCourse.countDocuments({})

// 코스 장소 수 확인
db.CoursePlaces.countDocuments({})

// 저장된 코스 수 확인
db.SavedCourse.countDocuments({})

// 리뷰 수 확인
db.Review.countDocuments({})

// 리뷰 이미지 수 확인
db.ReviewImage.countDocuments({})

// 특정 사용자 정보 확인
db.User.findOne({ email: 'user1@example.com' })

// 특정 데이트 코스 정보 확인
db.DateCourse.findOne({ name: '강남 데이트 코스' })

// is_recommend가 true인 데이트 코스 확인
db.DateCourse.find({ is_recommend: true }).count()

// 특정 코스의 장소 목록 확인
const sampleCourseId = db.DateCourse.findOne({ name: '강남 데이트 코스' })._id
db.CoursePlaces.find({ course_id: sampleCourseId }).sort({ visit_order: 1 })

// 특정 코스의 리뷰 확인
db.Review.find({ course_id: sampleCourseId })

// 리뷰 이미지 확인
const sampleReviewId = db.Review.findOne({ course_id: sampleCourseId })._id
db.ReviewImage.find({ review_id: sampleReviewId })

// 각 사용자별 저장한 코스 수 확인
db.SavedCourse.aggregate([{ $group: { _id: '$user_id', count: { $sum: 1 } } }])
