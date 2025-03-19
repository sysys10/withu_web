'use client'

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

// Same interface as in DateDetailPage
interface DatePlanDetails {
  id: string
  title: string
  date: string
  time: string
  location: string
  courseId: string
  course: {
    id: string
    name: string
    description: string
    thumbnail: string
    places: Array<{
      id: string
      name: string
      address: string
      image: string
    }>
  }
}

// Dummy data for a date plan detail (same as DateDetailPage)
const DUMMY_DATE_PLAN: DatePlanDetails = {
  id: '1',
  title: '한강 데이트',
  date: '2025-03-15',
  time: '15:00',
  location: '여의도 한강공원',
  courseId: 'course123',
  course: {
    id: 'course123',
    name: '한강 로맨틱 데이트 코스',
    description: '여의도 한강공원에서 시작해 카페와 레스토랑을 즐기는 로맨틱한 데이트 코스',
    thumbnail:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    places: [
      {
        id: 'place1',
        name: '여의도 한강공원',
        address: '서울특별시 영등포구 여의도동',
        image: 'https://www.culture.go.kr/upload/rdf/22/03/show_2022032211453677278.jpg'
      },
      {
        id: 'place2',
        name: '리버뷰 카페',
        address: '서울특별시 마포구 합정동 123-45',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg'
      },
      {
        id: 'place3',
        name: '로맨틱 이탈리안',
        address: '서울특별시 용산구 이태원동 456-78',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMTMg%2FMDAxNTk4MjM5MDgwMTA3.xNrrw-VBV5h8kiBw4OIx5XsU1mt9OoOJ1JYoLq7IwjEg.X8-WVrHQgEGXEbSZfk_q5L3UDsOWzGtNM68mLRaUqucg.JPEG.ilovetb%2FKakaoTalk_20200824_104743744_15.jpg'
      }
    ]
  }
}

// Dummy data for courses (same as in CreateDatePlanPage)
const MY_COURSES = [
  {
    id: 'course123',
    name: '한강 로맨틱 데이트 코스',
    thumbnail:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800',
    location: '여의도 한강공원'
  },
  {
    id: 'course456',
    name: '홍대 카페 투어',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg',
    location: '홍대입구역 주변'
  },
  {
    id: 'course789',
    name: '영화 데이트',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg',
    location: '시네마 파라다이스'
  }
]

interface DateEditPageProps {
  params: {
    id: string
  }
}

export default function DateEditPage({ params }: DateEditPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Set form values
      setTitle(DUMMY_DATE_PLAN.title)

      // Format yyyy-MM-dd for input
      const dateParts = DUMMY_DATE_PLAN.date.split('-')
      setDate(DUMMY_DATE_PLAN.date)

      setTime(DUMMY_DATE_PLAN.time)
      setSelectedCourseId(DUMMY_DATE_PLAN.courseId)

      setIsLoading(false)
    }

    fetchData()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCourseId || !title || !date || !time) {
      // Show error message
      return
    }

    setIsSaving(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSaving(false)
    router.push(`/mydate/${params.id}`)
  }

  if (isLoading) {
    return (
      <div className='min-h-screen pb-20'>
        <div className='bg-white p-4 fixed top-0 left-0 right-0 max-w-xl mx-auto z-10 border-b'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <button className='rounded-full p-1 hover:bg-gray-100'>
                <ChevronLeftIcon size={24} />
              </button>
              <Skeleton className='h-7 w-40' />
            </div>
          </div>
        </div>

        <div className='pt-20 px-4'>
          <Skeleton className='h-60 w-full rounded-lg mb-6' />
          <Skeleton className='h-10 w-full mb-4' />
          <Skeleton className='h-10 w-full mb-4' />
          <Skeleton className='h-10 w-full mb-4' />
        </div>
      </div>
    )
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
            <h1 className='text-xl font-bold'>일정 수정</h1>
          </div>
        </div>
      </div>

      <div className='pt-20 px-4'>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
            <h2 className='text-lg font-bold mb-4'>기본 정보</h2>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>일정 제목</label>
                <Input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder='일정 제목을 입력하세요'
                  required
                />
              </div>

              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1'>날짜</label>
                  <div className='relative'>
                    <Input
                      type='date'
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className='pr-10'
                      required
                    />
                    <CalendarIcon
                      size={18}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    />
                  </div>
                </div>

                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1'>시간</label>
                  <div className='relative'>
                    <Input
                      type='time'
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      className='pr-10'
                      required
                    />
                    <ClockIcon
                      size={18}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold'>데이트 코스 선택</h2>

              <button
                type='button'
                onClick={() => router.push('/search')}
                className='text-sm text-blue-500 font-medium'>
                새 코스 찾기
              </button>
            </div>

            <div className='space-y-3'>
              {MY_COURSES.map(course => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`flex border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedCourseId === course.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                  <div className='relative w-20 h-20'>
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1 p-3'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-bold'>{course.name}</h3>
                      {selectedCourseId === course.id && (
                        <div className='w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center'>
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M10 3L4.5 8.5L2 6'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                      <MapPinIcon size={14} />
                      <span>{course.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex gap-2'>
            <Button
              type='button'
              size='lg'
              onClick={() => router.back()}
              className='flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'>
              취소
            </Button>

            <Button
              type='submit'
              size='lg'
              disabled={isSaving || !selectedCourseId || !title || !date || !time}
              className='flex-1 bg-blue-500 hover:bg-blue-600'>
              {isSaving ? '저장 중...' : '수정 완료'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
