'use client'

import {
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  EditIcon,
  MapPinIcon,
  MoreVerticalIcon,
  ShareIcon,
  Trash2Icon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

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

// Dummy data for a date plan detail
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

interface DateDetailPageProps {
  params: {
    id: string
  }
}

export default function DateDetailPage({ params }: DateDetailPageProps) {
  const router = useRouter()
  const [datePlan, setDatePlan] = useState<DatePlanDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setDatePlan(DUMMY_DATE_PLAN)
      setIsLoading(false)
    }

    fetchData()
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`
  }

  const handleDelete = async () => {
    if (!confirm('이 데이트 일정을 삭제하시겠습니까?')) {
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push('/mydate')
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
          <Skeleton className='h-10 w-3/4 mb-4' />
          <Skeleton className='h-6 w-1/2 mb-8' />

          <Skeleton className='h-8 w-40 mb-3' />
          <div className='space-y-4 mb-8'>
            <Skeleton className='h-20 w-full rounded-lg' />
            <Skeleton className='h-20 w-full rounded-lg' />
            <Skeleton className='h-20 w-full rounded-lg' />
          </div>
        </div>
      </div>
    )
  }

  if (!datePlan) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-2'>일정을 찾을 수 없습니다</h2>
          <p className='text-gray-500 mb-4'>해당 데이트 일정이 존재하지 않거나 삭제되었습니다.</p>
          <Button
            size='lg'
            onClick={() => router.push('/mydate')}
            className='bg-blue-500 hover:bg-blue-600'>
            일정 목록으로 돌아가기
          </Button>
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
            <h1 className='text-xl font-bold'>{datePlan.title}</h1>
          </div>

          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='rounded-full p-1 hover:bg-gray-100'>
              <MoreVerticalIcon size={24} />
            </button>

            {showMenu && (
              <div className='absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20'>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    router.push(`/mydate/edit/${datePlan.id}`)
                  }}
                  className='w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-50'>
                  <EditIcon size={16} />
                  <span>일정 수정</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  className='w-full text-left px-4 py-3 flex items-center gap-2 text-red-500 hover:bg-gray-50'>
                  <Trash2Icon size={16} />
                  <span>일정 삭제</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='pt-20 px-4'>
        <div className='relative w-full h-60 rounded-lg overflow-hidden mb-6'>
          <Image
            src={datePlan.course.thumbnail}
            alt={datePlan.course.name}
            fill
            className='object-cover'
          />
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6'>
          <h2 className='text-xl font-bold mb-3'>{datePlan.title}</h2>

          <div className='space-y-2 mb-4'>
            <div className='flex items-center gap-2'>
              <CalendarIcon
                size={18}
                className='text-blue-500'
              />
              <span>{formatDate(datePlan.date)}</span>
            </div>

            <div className='flex items-center gap-2'>
              <ClockIcon
                size={18}
                className='text-blue-500'
              />
              <span>{datePlan.time}</span>
            </div>

            <div className='flex items-center gap-2'>
              <MapPinIcon
                size={18}
                className='text-blue-500'
              />
              <span>{datePlan.location}</span>
            </div>
          </div>

          <div className='flex gap-2'>
            <Button
              size='sm'
              onClick={() => router.push(`/course/${datePlan.courseId}`)}
              className='flex-1 bg-blue-500 hover:bg-blue-600'>
              코스 보기
            </Button>

            <Button
              size='sm'
              onClick={() => router.push(`/map?id=${datePlan.courseId}`)}
              className='flex-1 bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'>
              지도에서 보기
            </Button>
          </div>
        </div>

        <h3 className='text-lg font-bold mb-3'>방문 장소</h3>
        <div className='space-y-3 mb-8'>
          {datePlan.course.places.map((place, index) => (
            <div
              key={place.id}
              className='flex border border-gray-200 rounded-lg overflow-hidden'>
              <div className='relative w-20 h-20'>
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
                <h4 className='font-bold'>{place.name}</h4>
                <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                  <MapPinIcon size={14} />
                  <span>{place.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-2'>
          <Button
            size='lg'
            onClick={() => router.push(`/mydate/edit/${datePlan.id}`)}
            className='flex-1 bg-blue-500 hover:bg-blue-600'>
            일정 수정
          </Button>

          <Button
            size='lg'
            onClick={() => {
              // Simulate sharing
              alert('공유 기능은 준비 중입니다.')
            }}
            className='w-12 bg-white border border-gray-200 hover:bg-gray-50 p-0'>
            <ShareIcon
              size={20}
              className='text-gray-500'
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
