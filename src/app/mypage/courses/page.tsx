'use client'

import { ChevronLeftIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Dummy course data
const CREATED_COURSES = [
  {
    id: 'course1',
    name: '한강 로맨틱 데이트 코스',
    description: '여의도 한강공원에서 시작해 카페와 레스토랑을 즐기는 로맨틱한 데이트 코스',
    thumbnail:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    tags: ['로맨틱', '야경', '한강', '자전거'],
    price: 80000,
    likeCount: 24,
    reviewCount: 5,
    rating: 4.7
  },
  {
    id: 'course2',
    name: '홍대 카페 투어',
    description: '홍대 거리의 특색있는 카페들을 방문하는 데이트 코스',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
    tags: ['카페', '홍대', '분위기'],
    price: 50000,
    likeCount: 18,
    reviewCount: 3,
    rating: 4.5
  }
]

const SAVED_COURSES = [
  {
    id: 'course3',
    name: '영화 데이트',
    description: '영화관에서 영화 감상 후 근처 맛집에서 식사하는 데이트 코스',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg',
    tags: ['영화', '식사', '실내'],
    price: 60000,
    likeCount: 12,
    reviewCount: 2,
    rating: 4.2
  },
  {
    id: 'course4',
    name: '남산 데이트',
    description: '남산타워와 주변 공원을 즐기는 데이트 코스',
    thumbnail: 'https://www.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=15842&fileTy=MEDIA&fileNo=1',
    tags: ['남산', '야경', '케이블카'],
    price: 70000,
    likeCount: 30,
    reviewCount: 8,
    rating: 4.8
  },
  {
    id: 'course5',
    name: '경복궁 한복 데이트',
    description: '한복을 입고 경복궁을 둘러보는 전통 데이트 코스',
    thumbnail: 'https://www.agoda.com/wp-content/uploads/2019/03/Seoul-attractions-Gyeongbokgung-Palace.jpg',
    tags: ['한복', '경복궁', '전통'],
    price: 90000,
    likeCount: 42,
    reviewCount: 12,
    rating: 4.9
  }
]

export default function UserCoursesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'created'

  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState<typeof CREATED_COURSES>([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      setCourses(type === 'created' ? CREATED_COURSES : SAVED_COURSES)
      setIsLoading(false)
    }

    fetchData()
  }, [type])

  const changeType = (newType: string) => {
    router.push(`/mypage/courses?type=${newType}`)
  }

  return (
    <div className='min-h-screen pb-20'>
      <div className='bg-white p-4 fixed top-0 left-0 right-0 max-w-xl mx-auto z-10 border-b'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => router.back()}
              className='rounded-full p-1 hover:bg-gray-100'>
              <ChevronLeftIcon size={24} />
            </button>
            <h1 className='text-xl font-bold'>{type === 'created' ? '내가 만든 코스' : '저장한 코스'}</h1>
          </div>
        </div>
      </div>

      <div className='pt-20 px-4'>
        {/* Type selector */}
        <div className='flex border border-gray-200 rounded-lg overflow-hidden mb-6'>
          <button
            onClick={() => changeType('created')}
            className={`flex-1 py-3 text-center font-medium ${type === 'created' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>
            내가 만든 코스
          </button>
          <button
            onClick={() => changeType('saved')}
            className={`flex-1 py-3 text-center font-medium ${type === 'saved' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>
            저장한 코스
          </button>
        </div>

        {isLoading ? (
          <div className='space-y-4'>
            {[1, 2, 3].map(i => (
              <Skeleton
                key={i}
                className='h-32 w-full rounded-lg'
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className='text-center py-10'>
            <div className='bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
              {type === 'created' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-gray-400'>
                  <path d='M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z' />
                  <path d='M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-gray-400'>
                  <path d='m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z' />
                </svg>
              )}
            </div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              {type === 'created' ? '만든 코스가 없습니다' : '저장한 코스가 없습니다'}
            </h3>
            <p className='text-gray-500 mb-4'>
              {type === 'created' ? '새로운 데이트 코스를 만들어보세요!' : '마음에 드는 데이트 코스를 저장해보세요!'}
            </p>
            {type === 'created' && (
              <Button
                onClick={() => router.push('/add/course')}
                className='bg-blue-500 hover:bg-blue-600'>
                <PlusIcon
                  size={18}
                  className='mr-1'
                />
                새 코스 만들기
              </Button>
            )}
            {type === 'saved' && (
              <Button
                onClick={() => router.push('/search')}
                className='bg-blue-500 hover:bg-blue-600'>
                코스 찾아보기
              </Button>
            )}
          </div>
        ) : (
          <div className='space-y-4'>
            {courses.map(course => (
              <div
                key={course.id}
                onClick={() => router.push(`/course/${course.id}`)}
                className='bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-300 transition-colors'>
                <div className='flex'>
                  <div className='relative w-28 h-28'>
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1 p-3 flex flex-col'>
                    <div>
                      <h3 className='font-bold mb-1'>{course.name}</h3>
                      <p className='text-sm text-gray-500 line-clamp-2 mb-2'>{course.description}</p>
                      <div className='flex flex-wrap gap-1 mb-2'>
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className='text-xs px-2 py-0.5 bg-gray-100 rounded-full'>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-auto'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='14'
                            height='14'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='text-yellow-500 fill-yellow-500 mr-1'>
                            <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                          </svg>
                          <span className='text-xs'>{course.rating.toFixed(1)}</span>
                        </div>
                        <div className='text-xs text-gray-500'>리뷰 {course.reviewCount}</div>
                      </div>
                      <div className='font-medium text-right'>{course.price.toLocaleString()}원</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {type === 'created' && (
              <div className='fixed bottom-16 right-4'>
                <Button
                  size='sm'
                  onClick={() => router.push('/add/course')}
                  className='rounded-full w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 p-0 shadow-lg'>
                  <PlusIcon size={24} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
