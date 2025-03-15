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
        name: '스타벅스 강남점',
        address: '서울특별시 강남구 테헤란로 123',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3337&auto=format&fit=crop',
        category: '카페'
      },
      {
        id: 'p2',
        name: '코엑스몰',
        address: '서울특별시 강남구 영동대로 513',
        image: 'https://images.unsplash.com/photo-1618840376620-8835aa0adf31?q=80&w=2941&auto=format&fit=crop',
        category: '쇼핑'
      }
    ]
  },
  {
    id: 'c2',
    name: '한강 데이트 코스',
    description: '한강에서 즐기는 로맨틱한 데이트',
    tags: ['공원', '야외', '한강', '산책'],
    price: 20000,
    total_time: 180,
    rating: 4.9,
    review_count: 150,
    thumbnail: 'https://images.unsplash.com/photo-1522686681175-5f6384129000?q=80&w=3348&auto=format&fit=crop',
    places: [
      {
        id: 'p4',
        name: '한강공원 반포지구',
        address: '서울특별시 서초구 신반포로11길 40',
        image: 'https://images.unsplash.com/photo-1601621915196-b8b7c394b73d?q=80&w=2970&auto=format&fit=crop',
        category: '공원'
      }
    ]
  },
  {
    id: 'c3',
    name: '남산 데이트 코스',
    description: '남산에서 즐기는 뷰 맛집 데이트',
    tags: ['관광', '야경', '남산', '타워'],
    price: 40000,
    total_time: 240,
    rating: 4.7,
    review_count: 110,
    thumbnail: 'https://images.unsplash.com/photo-1585107882441-275175eb42b7?q=80&w=3270&auto=format&fit=crop',
    places: [
      {
        id: 'p5',
        name: '남산서울타워',
        address: '서울특별시 용산구 남산공원길 105',
        image: 'https://images.unsplash.com/photo-1584637869437-040edf2292fe?q=80&w=3270&auto=format&fit=crop',
        category: '관광명소'
      }
    ]
  }
]

export default function MapPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [loading, setLoading] = useState(true)

  // In a real implementation, you would fetch course data from your API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Example API call (commented out for now)
        // const response = await axiosPublic.get('/api/courses/map');
        // setCourses(response.data.courses);

        // For now, we'll just use the mock data
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
      <div className='fixed top-0 left-0 right-0 z-10'>
        <TopBar />
      </div>
      <div className='pt-12 h-full w-full'>
        <MapWithBottomSheet courses={courses} />
      </div>
    </div>
  )
}
