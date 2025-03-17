import { UseCourseDetailProps, UseCourseProps } from '@/hooks/query/useCourse'

import { axiosPublic } from './axiosInstance'

const getCourseDetails = async ({ id }: UseCourseDetailProps) => {
  const { data } = await axiosPublic.post(`/api/course/details`, {
    id
  })
  return data
}
const getCourses = async ({ id, userId, placeId, tag }: UseCourseProps) => {
  const { data } = await axiosPublic.post(`/api/courses`, {
    id,
    userId,
    placeId,
    tag
  })
  return data
}

export { getCourseDetails, getCourses }
