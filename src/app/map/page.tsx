'use client'

import { useEffect, useState } from 'react'

import MapWithBottomSheet from '@/components/course/MapWithBottomSheet'
import TopBar from '@/components/layout/TopBar'

// Mock data for now
const mockCourses = [
  {
    id: 'c1',
    name: '강남 데이트 코스',
    description: '강남에서 즐기는 커피와 쇼핑 데이트',
    tags: ['카페', '쇼핑', '실내', '강남'],
    price: 50000,
    total_time: 240,
    rating: 4.8,
    review_count: 120,
    thumbnail: 'https://images.unsplash.com/photo-1553969923-bbf91ae9122e?q=80&w=3269&auto=format&fit=crop',
    places: [
      {
        id: 'p1',
        order: 1,
        name: '스타벅스 강남점',
        latitude: 37.5172,
        longitude: 127.0474,
        address: '서울특별시 강남구 테헤란로 123',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3337&auto=format&fit=crop',
        category: '카페'
      },
      {
        id: 'p2',
        order: 2,
        name: '코엑스몰',
        latitude: 37.4944,
        longitude: 127.0286,
        address: '서울특별시 강남구 영동대로 513',
        image: 'https://images.unsplash.com/photo-1618840376620-8835aa0adf31?q=80&w=2941&auto=format&fit=crop',
        category: '쇼핑'
      },
      {
        id: 'p3',
        order: 3,
        name: '코엑스몰',
        latitude: 37.4944,
        longitude: 127.0286,
        address: '서울특별시 강남구 영동대로 513',
        image: 'https://images.unsplash.com/photo-1618840376620-8835aa0adf31?q=80&w=2941&auto=format&fit=crop',
        category: '쇼핑'
      }
    ]
  },
  {
    id: 'c2',
    name: '한양대 데이트 코스',
    description: '한양대에서 즐기는 데이트!',
    tags: ['카페', '실내', '한양대'],
    price: 30000,
    total_time: 120,
    rating: 4.8,
    review_count: 100,
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz39d6IVG1vjZCgaTcKX9gLv4LUN9AQFiOpA&s',
    places: [
      {
        id: 'p1',
        order: 1,
        name: '한양대 학생회관',
        latitude: 37.5565165,
        longitude: 127.0439206,
        address: '서울특별시 성동구 왕십리로 211',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz39d6IVG1vjZCgaTcKX9gLv4LUN9AQFiOpA&s',
        category: '카페'
      },
      {
        id: 'p2',
        order: 2,
        name: '청년감자탕',
        latitude: 37.5598986,
        longitude: 127.0474,
        address: '서울특별시 성동구 왕십리로 211',
        image: 'https://lh5.googleusercontent.com/p/AF1QipPmfEyeI-pNCPsXRkEi2tAPaYy9NUvTj9HHXq2Y=w408-h242-k-no',
        category: '카페'
      }
    ]
  }
]

export default function MapPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCourses(mockCourses)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching courses:', error)
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <TopBar />
      <div className='pt-12 h-full w-full'>
        <MapWithBottomSheet courses={courses[1]} />
      </div>
    </div>
  )
}
