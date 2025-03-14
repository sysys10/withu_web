'use client'

import { axiosPrivate } from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

import Section from '@/components/common/Section'
import WithRowCard from '@/components/common/WithUCard'
import { Skeleton } from '@/components/ui/skeleton'

const getMyRecentCourse = async () => {
  const response = await axiosPrivate.get('/api/course/myrecent')
  return response.data
}

function useMyRecentCourse() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', 'myrecent'],
    queryFn: getMyRecentCourse,
    select: data => data.courses
  })

  return { data, isLoading, error }
}

export default function MyRecentCourse({ name }: { name: string }) {
  const { data, isLoading, error } = useMyRecentCourse()

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
