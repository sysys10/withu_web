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
}
export type { Place, DateCourse }
