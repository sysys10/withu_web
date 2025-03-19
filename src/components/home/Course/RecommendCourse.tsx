'use client'

import { useRef } from 'react'

import CourseCard, { CourseCardProps } from '@/components/common/CourseCard'
import Section from '@/components/common/Section'
import { Skeleton } from '@/components/ui/skeleton'

import { useRecommendCourse } from './hooks/useRecommendCourse'

export default function RecommendCourse({ name }: { name: string }) {
  const { data, isLoading } = useRecommendCourse()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <Section title={name}>
      <div className='relative'>
        <div
          className='overflow-x-auto scrollbar-hide py-2 px-1'
          ref={scrollContainerRef}>
          {isLoading ? (
            <div className='flex gap-4'>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className='min-w-[260px] h-40'
                />
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <div className='flex gap-4 pb-1'>
              {data.map((item: CourseCardProps) => (
                <CourseCard
                  rating={item.rating}
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
