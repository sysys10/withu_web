// src/api/courseApi.ts
import { DateCourse } from '@/types/courses.type'

import { UseCourseDetailProps, UseCourseProps } from '@/hooks/query/useCourse'

import { axiosPrivate, axiosPublic } from './axiosInstance'

// Get course details by ID
export const getCourseDetails = async ({ id }: UseCourseDetailProps): Promise<DateCourse> => {
  try {
    const { data } = await axiosPublic.get(`/api/course/detail?id=${id}`)
    return data
  } catch (error) {
    console.error('Error fetching course details:', error)
    throw error
  }
}

// Get courses with optional filters
export const getCourses = async ({ id, userId, placeId, tag }: UseCourseProps): Promise<DateCourse[]> => {
  try {
    const { data } = await axiosPublic.post(`/api/courses`, {
      id,
      userId,
      placeId,
      tag
    })
    return data
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

// Get recommended courses
export const getRecommendedCourses = async (): Promise<{ courses: DateCourse[] }> => {
  try {
    const { data } = await axiosPublic.get('/api/course/recommend')
    return data
  } catch (error) {
    console.error('Error fetching recommended courses:', error)
    throw error
  }
}

// Get user's recent courses
export const getMyRecentCourses = async (): Promise<{ courses: DateCourse[] }> => {
  try {
    const { data } = await axiosPrivate.get('/api/course/myrecent')
    return data
  } catch (error) {
    console.error('Error fetching my recent courses:', error)
    return { courses: [] }
  }
}

// Create a new course
export const createCourse = async (courseData: any) => {
  try {
    const { data } = await axiosPrivate.post('/api/course/create', courseData)
    return data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

// Like a course
export const likeCourse = async (courseId: string) => {
  try {
    const { data } = await axiosPrivate.post(`/api/course/like`, { courseId })
    return data
  } catch (error) {
    console.error('Error liking course:', error)
    throw error
  }
}

// Save a course
export const saveCourse = async (courseId: string, notes?: string) => {
  try {
    const { data } = await axiosPrivate.post(`/api/course/save`, { courseId, notes })
    return data
  } catch (error) {
    console.error('Error saving course:', error)
    throw error
  }
}
