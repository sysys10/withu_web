'use client'

import { axiosPrivate } from '@/api/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import CourseCard, { CourseCardProps } from '@/components/common/CourseCard'
import Section from '@/components/common/Section'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import useIsReactNativeWebview from '@/hooks/useIsReactNativeWebView'

import { handleCreateCourse } from '@/utils/handleMobileAction'

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

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void
    }
  }
}

export default function MyRecentCourse({ name }: { name: string }) {
  const { data, isLoading, error, isAuthenticated } = useMyRecentCourse()
  const router = useRouter()

  const isInAppWebView = useIsReactNativeWebview()

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
          data.map((item: CourseCardProps) => (
            <CourseCard
              key={item.id}
              {...item}
            />
          ))
        ) : (
          <div className='p-6 border border-gray-200 rounded-lg text-center'>
            <p className='text-gray-600 mb-4'>아직 기록된 데이트 코스가 없어요. 기록해보세요!</p>
            <Button
              size='lg'
              onClick={handleCreateCourse}
              className='gap-2 flex items-center justify-center'>
              <PlusIcon size={18} />
              <span>새 데이트 코스 만들기</span>
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}
