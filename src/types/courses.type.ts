// src/types/courses.type.ts
interface Creator {
  id: string
  name: string
  image: string
}

interface Place {
  id: string
  name: string
  address: string
  image_url: string[]
  category: string
  latitude: number
  longitude: number
  visit_order?: number
  recommended_time?: number | null
  tips?: string | null
}

interface ReviewImage {
  image_url: string
}

interface Review {
  id: string
  rating: number
  comment: string | null
  user: {
    id: string
    name: string
    profileImage: string | null
  }
  visitedDate: string | null
  createdAt: string
  images: string[]
}

interface DateCourse {
  id: string
  name: string
  description: string
  tags: string[]
  price: number
  total_time: number
  rating: number
  review_count: number
  like_count: number
  thumbnail: string
  creator: Creator
  places: Place[]
  reviews?: Review[]
  isLiked?: boolean
  isSaved?: boolean
}

// Request/Response types
interface CourseCreateRequest {
  name: string
  description: string
  tags: string[]
  price?: number
  totalTime?: number
  mood?: string
  bestSeason?: string
  bestTime?: string
  visitedDate?: string
  myReview?: string
  myRating?: number
  expenses?: Record<string, number>
  isPublic?: boolean
  thumbnail?: string
  images?: Array<{
    url: string
    description?: string
  }>
  places: Array<{
    id?: string
    name: string
    address: string
    roadAddress?: string
    latitude: number
    longitude: number
    category?: string
    naverPlaceId?: string
    phone?: string
    homepage?: string
    description?: string
    imageUrls?: string[]
    thumbnail?: string
    naverRating?: number
    naverReviewCount?: number
    recommendedTime?: number
    actualTimeSpent?: number
    tips?: string
    rating?: number
    experience?: string
    transportToNext?: string
    timeToNext?: number
  }>
}

interface CourseSearchParams {
  id?: string
  userId?: string
  placeId?: string
  tag?: string
}

interface ReviewCreateRequest {
  courseId: string
  rating: number
  comment?: string
  visitedDate?: string
  images?: string[]
}

export type {
  Place,
  DateCourse,
  Creator,
  Review,
  ReviewImage,
  CourseCreateRequest,
  CourseSearchParams,
  ReviewCreateRequest
}
