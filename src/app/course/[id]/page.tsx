import CourseDetail from '@/components/course/CourseDetail'

interface CourseDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const p = await params
  const courseId = p.id

  return <CourseDetail courseId={courseId} />
}
