// src/components/home/Course/MyRecentCourse.tsx
'use client'

import { axiosPrivate } from '@/api/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Section from '@/components/common/Section'
import WithRowCard from '@/components/common/WithUCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// src/components/home/Course/MyRecentCourse.tsx

const getMyRecentCourse = async () => {
  try {
    const response = await axiosPrivate.get('/api/course/myrecent')
    return response.data
  } catch (error) {
    console.error('Error fetching my recent courses:', error)
    return { courses: [] }
  }
}

function useMyRecentCourse() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const accessToken = useAuthStore(state => state.accessToken)

  useEffect(() => {
    if (accessToken) {
      axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
  }, [accessToken])

  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', 'myrecent', !!isAuthenticated],
    queryFn: isAuthenticated ? getMyRecentCourse : () => ({ courses: [] }),
    select: data => data.courses,
    enabled: !!isAuthenticated
  })

  return { data, isLoading, error, isAuthenticated }
}

export default function MyRecentCourse({ name }: { name: string }) {
  const { data, isLoading, error, isAuthenticated } = useMyRecentCourse()
  const router = useRouter()

  if (!isAuthenticated) {
    return (
      <Section title={name}>
        <div className='p-6 border border-gray-200 rounded-lg bg-gray-50 text-center'>
          <p className='text-gray-600 mb-4'>로그인하여 나만의 데이트 코스를 찾아보세요.</p>
          <Button
            size='md'
            onClick={() => router.push('/auth')}
            className='bg-blue-500 hover:bg-blue-600'>
            로그인하기
          </Button>
        </div>
      </Section>
    )
  }

  return (
    <Section title={name}>
      <div className='space-y-4'>
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              className='h-24 w-full'
            />
          ))
        ) : data?.length > 0 ? (
          data.map((item: any) => (
            <WithRowCard
              key={item.id}
              {...item}
            />
          ))
        ) : (
          <div className='p-6 border border-gray-200 rounded-lg text-center'>
            <p className='text-gray-600 mb-4'>아직 데이트 코스가 없어요. 새로운 코스를 추가해보세요!</p>
            <Link href='/add'>
              <Button
                size='lg'
                className='gap-2'>
                <PlusIcon size={18} />
                <span>새 데이트 코스 만들기</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Section>
  )
}
