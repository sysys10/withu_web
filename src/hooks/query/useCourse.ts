import { getCourseDetails, getCourses } from '@/api/courseApi'
import { useErrorStore } from '@/store/useErrorStore'
import { DateCourse } from '@/types/courses.type'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

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
  const [course, setCourse] = useState<DateCourse | null>(null)
  const setError = useErrorStore(state => state.setError)

  const { isPending: isLoading } = useMutation({
    mutationFn: () => getCourseDetails({ id }),
    onSuccess: (data: DateCourse) => {
      setCourse(data)
    },
    onError: error => {
      setError(error.message)
    }
  })

  return { course, isLoading }
}

export const useCourses = ({ id, userId, placeId, tag }: UseCourseProps) => {
  const [course, setCourse] = useState<DateCourse[] | null>(null)
  const setError = useErrorStore(state => state.setError)

  const { isPending: isLoading } = useMutation({
    mutationFn: () => getCourses({ id, userId, placeId, tag }),
    onSuccess: (data: DateCourse[]) => {
      setCourse(data)
    },
    onError: error => {
      setError(error.message)
    }
  })

  return { course, isLoading }
}
