'use client'

import { CalendarIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Dummy data for date plans
const DATE_PLANS = [
  {
    id: '1',
    title: '한강 데이트',
    date: '2025-03-15',
    time: '15:00',
    location: '여의도 한강공원',
    courseId: 'course123',
    image:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTlfMjIy/MDAxNTg5ODYxNzgyMDk5.RB2rvq3QFA761XyNYymuq-L_54nS1BJQBDbi8mV0V5Qg.muFdvvNHbZ03vpOBX6HC0z2DPYTAU4XfQNzisZDt8GQg.JPEG.seoulcityhall/1.jpg?type=w800'
  },
  {
    id: '2',
    title: '홍대 카페 투어',
    date: '2025-03-20',
    time: '13:00',
    location: '홍대입구역 주변',
    courseId: 'course456',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTRfNjkg%2FMDAxNjc4Nzg4MjgxMjU1.uZv1NopiZRoJDrns8zyQk9iZlzr9FpQK8bYFwnxc5U0g.7gZ1sSXyIAn6M9PEcbIdb1h5e-6w8lBGJXIIzf9A48kg.JPEG.sun_land%2F1678788279166.jpg'
  },
  {
    id: '3',
    title: '영화 관람',
    date: '2025-03-28',
    time: '19:00',
    location: '시네마 파라다이스',
    courseId: 'course789',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMjQ5%2FMDAxNjYxNDkyNzI2Mzk1.8_gGLdXoTyZI7vUohtFXc-f-zBnQUftMcQKGtxz_Pccg.V27TQKZVSjIRwOFlL9m37nzTx8Bj7UJq3-UEAIPSwYIg.JPEG.1234_ring%2F1661492722900.jpg'
  }
]

// Group date plans by month
const groupByMonth = (plans: typeof DATE_PLANS) => {
  const grouped: Record<string, typeof DATE_PLANS> = {}

  plans.forEach(plan => {
    const date = new Date(plan.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!grouped[monthKey]) {
      grouped[monthKey] = []
    }

    grouped[monthKey].push(plan)
  })

  return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))
}

export default function DateListView() {
  const router = useRouter()
  const groupedPlans = groupByMonth(DATE_PLANS)

  const formatMonthHeader = (monthKey: string) => {
    const [year, month] = monthKey.split('-')
    return `${year}년 ${parseInt(month)}월`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
    return `${day}일 (${dayOfWeek})`
  }

  return (
    <div className='space-y-6'>
      {groupedPlans.length === 0 ? (
        <div className='text-center py-10'>
          <div className='bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
            <CalendarIcon
              size={32}
              className='text-gray-400'
            />
          </div>
          <h3 className='text-lg font-medium text-gray-700 mb-2'>데이트 일정이 없습니다</h3>
          <p className='text-gray-500 mb-4'>새로운 데이트 일정을 추가해보세요!</p>
        </div>
      ) : (
        groupedPlans.map(([month, plans]) => (
          <div key={month}>
            <h2 className='text-lg font-bold mb-3'>{formatMonthHeader(month)}</h2>
            <div className='space-y-3'>
              {plans.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => router.push(`/mydate/${plan.id}`)}
                  className='bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-300 transition-colors'>
                  <div className='flex'>
                    <div className='relative w-24 h-24'>
                      <Image
                        src={plan.image}
                        alt={plan.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='flex-1 p-3 flex flex-col justify-between'>
                      <div>
                        <div className='flex justify-between items-start'>
                          <h3 className='font-bold'>{plan.title}</h3>
                          <ChevronRightIcon
                            size={18}
                            className='text-gray-400'
                          />
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                          <MapPinIcon size={14} />
                          <span>{plan.location}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-1 text-sm mt-1'>
                        <CalendarIcon
                          size={14}
                          className='text-blue-500'
                        />
                        <span>
                          {formatDate(plan.date)} {plan.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
