'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftIcon, BookmarkIcon, HeartIcon, MapPinIcon, ShareIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import BackIcons from '@/components/common/BackIcons'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Mock function to get course details
const getCourseDetails = async (id: string) => {
  try {
    // In a real app, you would fetch from API
    // const response = await axiosPublic.get(`/api/course/${id}`)
    // return response.data

    // For now, return mock data
    return {
      course: {
        id,
        name: '한강 데이트 코스',
        description:
          '서울의 중심을 가로지르는 한강에서 즐기는 로맨틱한 데이트 코스입니다. 자전거 타기, 피크닉, 유람선 등 다양한 활동을 즐길 수 있어요.',
        image: 'https://via.placeholder.com/600x400',
        thumbnail: 'https://via.placeholder.com/600x400',
        address: '서울특별시 영등포구 여의도동',
        distance: 2.5,
        price: 50000,
        rating: 4.5,
        review_count: 120,
        tags: ['실외', '자연', '로맨틱', '액티비티'],
        places: [
          {
            id: 'p1',
            name: '여의도 한강공원',
            address: '서울 영등포구 여의도동',
            description: '아름다운 경치와 다양한 활동을 즐길 수 있는 공간',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            id: 'p2',
            name: '더 리버 카페',
            address: '서울 영등포구 여의도동 63빌딩 내',
            description: '한강이 내려다보이는 아늑한 카페',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            id: 'p3',
            name: '한강 유람선',
            address: '서울 영등포구 여의도동 선착장',
            description: '낭만적인 한강 유람선 투어',
            image: 'https://via.placeholder.com/300x200'
          }
        ],
        creator: {
          id: 'user1',
          name: '김데이트',
          image: 'https://via.placeholder.com/50x50'
        }
      }
    }
  } catch (error) {
    console.error('Error fetching course details:', error)
    throw error
  }
}
export default function CourseDetail({ courseId }: { courseId: string }) {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseDetails(courseId),
    select: data => data.course
  })

  if (isLoading) {
    return (
      <div className='p-4'>
        <div className='flex items-center mb-4'>
          <BackIcons />
          <Skeleton className='h-8 w-40 ml-4' />
        </div>
        <Skeleton className='h-64 w-full rounded-lg mb-4' />
        <Skeleton className='h-10 w-3/4 mb-2' />
        <Skeleton className='h-6 w-1/2 mb-4' />
        <div className='flex gap-2 mb-4'>
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-20' />
        </div>
        <Skeleton className='h-32 w-full mb-4' />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className='p-4 text-center'>
        <div className='flex items-center mb-4'>
          <button
            onClick={() => router.back()}
            className='p-2'>
            <ArrowLeftIcon size={24} />
          </button>
        </div>
        <div className='p-8 border border-gray-200 rounded-lg'>
          <h2 className='text-xl font-bold mb-2'>오류가 발생했습니다</h2>
          <p className='text-gray-600 mb-4'>코스 정보를 불러올 수 없습니다.</p>
          <Button
            size='md'
            onClick={() => router.back()}>
            뒤로 가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='pb-20'>
      {/* Header Image */}
      <div className='relative h-72 w-full'>
        <Image
          src={data.image}
          alt={data.name}
          fill
          className='object-cover'
        />
        <div className='absolute top-4 left-4 bg-white/80 p-2 rounded-full'>
          <button onClick={() => router.back()}>
            <ArrowLeftIcon size={24} />
          </button>
        </div>
      </div>

      {/* Course Info */}
      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h1 className='text-2xl font-bold'>{data.name}</h1>
          <div className='flex gap-2'>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${isLiked ? 'bg-red-100' : 'bg-gray-100'}`}>
              <HeartIcon
                size={20}
                className={isLiked ? 'text-red-500' : 'text-gray-500'}
              />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full ${isBookmarked ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <BookmarkIcon
                size={20}
                className={isBookmarked ? 'text-blue-500' : 'text-gray-500'}
              />
            </button>
            <button className='p-2 rounded-full bg-gray-100'>
              <ShareIcon
                size={20}
                className='text-gray-500'
              />
            </button>
          </div>
        </div>

        <div className='flex items-center gap-1 mb-2'>
          <StarIcon
            size={18}
            className='text-yellow-500 fill-yellow-500'
          />
          <span className='font-medium'>{data.rating}</span>
          <span className='text-gray-500'>({data.review_count})</span>
        </div>

        <div className='flex items-center gap-1 mb-3 text-gray-600'>
          <MapPinIcon size={16} />
          <span>{data.address}</span>
        </div>

        <div className='flex flex-wrap gap-2 mb-4'>
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className='px-3 py-1 bg-gray-100 rounded-full text-sm'>
              #{tag}
            </span>
          ))}
        </div>

        <div className='mb-6'>
          <h2 className='text-lg font-bold mb-2'>코스 소개</h2>
          <p className='text-gray-700 whitespace-pre-line'>{data.description}</p>
        </div>

        <div className='mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-lg font-bold'>코스 장소</h2>
            <button className='text-sm text-blue-500'>지도로 보기</button>
          </div>

          <div className='space-y-4'>
            {data.places.map((place, index) => (
              <div
                key={place.id}
                className='flex border border-gray-200 rounded-lg overflow-hidden'>
                <div className='relative w-24 h-24'>
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute top-1 left-1 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs'>
                    {index + 1}
                  </div>
                </div>
                <div className='flex-1 p-3'>
                  <h3 className='font-bold'>{place.name}</h3>
                  <p className='text-sm text-gray-500 mb-1'>{place.address}</p>
                  <p className='text-sm line-clamp-2'>{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-6'>
          <h2 className='text-lg font-bold mb-2'>만든 사람</h2>
          <div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg'>
            <div className='relative w-12 h-12 rounded-full overflow-hidden'>
              <Image
                src={data.creator.image}
                alt={data.creator.name}
                fill
                className='object-cover'
              />
            </div>
            <div>
              <p className='font-medium'>{data.creator.name}</p>
              <p className='text-sm text-gray-500'>데이트 코스 큐레이터</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center max-w-lg mx-auto'>
        <div>
          <p className='text-sm text-gray-500'>예상 비용</p>
          <p className='text-xl font-bold'>{data.price.toLocaleString()}원</p>
        </div>
        <Button
          size='lg'
          className='bg-blue-500 hover:bg-blue-600'
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/auth')
            } else {
              // Navigation logic for authenticated users
              alert('데이트 코스가 예약되었습니다!')
            }
          }}>
          {isAuthenticated ? '예약하기' : '로그인하여 예약하기'}
        </Button>
      </div>
    </div>
  )
}
