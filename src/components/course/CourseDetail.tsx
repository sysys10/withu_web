'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { ArrowLeftIcon, BookmarkIcon, HeartIcon, MapPinIcon, ShareIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import BackIcons from '@/components/common/BackIcons'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useCourseDetail } from '@/hooks/query/useCourse'

export default function CourseDetail({ courseId }: { courseId: string }) {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const { course, isLoading } = useCourseDetail({ id: courseId })

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

  return (
    <div className='pb-20'>
      <div className='relative h-72 w-full'>
        <Image
          src={
            course?.thumbnail ||
            'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=3271&auto=format&fit=crop'
          }
          alt={course?.name || 'hello'}
          fill
          className='object-cover'
        />
        <div className='absolute top-4 left-4 bg-white/80 p-2 rounded-full'>
          <button onClick={() => router.back()}>
            <ArrowLeftIcon size={24} />
          </button>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h1 className='text-2xl font-bold'>{course?.name}</h1>
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
          <span className='font-medium'>{course?.rating}</span>
          <span className='text-gray-500'>({course?.review_count})</span>
        </div>

        <div className='flex items-center gap-1 mb-3 text-gray-600'>
          <MapPinIcon size={16} />
          <span>{course?.places[0].address}</span>
        </div>

        <div className='flex flex-wrap gap-2 mb-4'>
          {course?.tags.map((tag, index) => (
            <span
              key={index}
              className='px-3 py-1 bg-gray-100 rounded-full text-sm'>
              #{tag}
            </span>
          ))}
        </div>

        <div className='mb-6'>
          <h2 className='text-lg font-bold mb-2'>코스 소개</h2>
          <p className='text-gray-700 whitespace-pre-line'>{course?.description}</p>
        </div>

        <div className='mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-lg font-bold'>코스 장소</h2>
            <button className='text-sm text-blue-500'>지도로 보기</button>
          </div>

          <div className='space-y-4'>
            {course?.places.map((place, index) => (
              <div
                key={place.id}
                className='flex border border-gray-200 rounded-lg overflow-hidden'>
                <div className='relative w-24 h-24'>
                  <Image
                    src={place.image_url[0]}
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
                src={
                  course?.creator.image ||
                  'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=3271&auto=format&fit=crop'
                }
                alt={
                  course?.creator.name ||
                  'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=3271&auto=format&fit=crop'
                }
                fill
                className='object-cover'
              />
            </div>
            <div>
              <p className='font-medium'>{course?.creator.name}</p>
              <p className='text-sm text-gray-500'>데이트 코스 큐레이터</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center max-w-xl mx-auto'>
        <Button
          size='lg'
          className='bg-blue-500 hover:bg-blue-600'
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/auth')
            } else {
              alert('데이트 코스가 예약되었습니다!')
            }
          }}>
          {isAuthenticated ? '예약하기' : '로그인하여 예약하기'}
        </Button>
      </div>
    </div>
  )
}
