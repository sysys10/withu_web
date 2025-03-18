import { UseCourseDetailProps, UseCourseProps } from '@/hooks/query/useCourse'

import { axiosPublic } from './axiosInstance'

const getCourseDetails = async ({ id }: UseCourseDetailProps) => {
  console.log('id', id)
  const { data } = await axiosPublic.get(`/api/course/detail?id=${id}`)
  console.log('data', data)
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
