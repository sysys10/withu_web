'use client'

import { getCourseDetails, getCourses } from '@/api/courseApi'
import { DateCourse } from '@/types/courses.type'
import { useQuery } from '@tanstack/react-query'

export interface UseCourseProps {
  id?: string
  userId?: string
  placeId?: string
  tag?: string
}

export interface UseCourseDetailProps {
  id: string
}
export const useCourseDetail = ({ id }: UseCourseDetailProps) => {
  console.log('id', id)

  const { data: course, isLoading } = useQuery<DateCourse>({
    queryKey: ['courseDetail', id],
    queryFn: () => getCourseDetails({ id })
  })

  return { course, isLoading }
}
export const useCourses = ({ id, userId, placeId, tag }: UseCourseProps) => {
  const { data: course, isLoading } = useQuery<DateCourse[]>({
    queryKey: ['courses', id, userId, placeId, tag],
    queryFn: () => getCourses({ id, userId, placeId, tag })
  })

  return { course, isLoading }
}
