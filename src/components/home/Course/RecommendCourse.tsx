'use client'

import { axiosPublic } from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

import Section from '@/components/common/Section'
import WithRowCard from '@/components/common/WithUCard'
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

  return (
    <Section title={name}>
      <div className='space-y-4'>
        {isLoading ? (
          <Skeleton className='h-24 w-full' />
        ) : data?.length > 0 ? (
          data.map((item: any) => (
            <WithRowCard
              key={item.id}
              {...item}
            />
          ))
        ) : (
          <div className='text-center text-gray-500'>데이터가 없습니다.</div>
        )}
      </div>
    </Section>
  )
}
