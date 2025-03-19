import { getRecommendedCourses } from '@/api/courseApi'
import { useQuery } from '@tanstack/react-query'

function useRecommendCourse() {
  const { data, isLoading } = useQuery({
    queryKey: ['courses', 'recommend'],
    queryFn: getRecommendedCourses,
    select: data => data.courses,
    staleTime: 1000 * 60 * 60 * 24
  })

  return { data, isLoading }
}
export { useRecommendCourse }
