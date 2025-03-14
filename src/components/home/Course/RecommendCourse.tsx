'use client'

import { axiosPublic } from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRef, useState } from 'react'

import CourseCard, { CourseCardProps } from '@/components/common/CourseCard'
import Section from '@/components/common/Section'
import { Skeleton } from '@/components/ui/skeleton'

const getRecommendCourse = async () => {
  const response = await axiosPublic.get('/api/course/recommend')
  return response.data
}

function useRecommendCourse() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', 'recommend'],
    queryFn: getRecommendCourse,
    select: data => data.courses,
    staleTime: 1000 * 60 * 60 * 24
  })

  return { data, isLoading, error }
}

export default function RecommendCourse({ name }: { name: string }) {
  const { data, isLoading, error } = useRecommendCourse()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <Section title={name}>
      <div className='relative'>
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md'
            aria-label='이전 항목 보기'>
            <ChevronLeftIcon size={24} />
          </button>
        )}

        {showRightButton && (
          <button
            onClick={scrollRight}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md'
            aria-label='다음 항목 보기'>
            <ChevronRightIcon size={24} />
          </button>
        )}

        <div
          className='overflow-x-auto scrollbar-hide py-2 px-1'
          ref={scrollContainerRef}
          onScroll={handleScroll}>
          {isLoading ? (
            <div className='flex gap-4'>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className='min-w-[260px] h-64'
                />
              ))}
            </div>
          ) : data?.length > 0 ? (
            <div className='flex gap-4 pb-1'>
              {data.map((item: CourseCardProps) => (
                <CourseCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  thumbnail={item.thumbnail}
                  description={item.description || ''}
                  tags={item.tags || []}
                  price={item.price}
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-10 text-gray-500'>추천 코스가 없습니다.</div>
          )}
        </div>
      </div>
    </Section>
  )
}
