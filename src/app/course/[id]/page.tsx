import CourseDetail from '@/components/course/CourseDetail'

interface CourseDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { id } = await params
  return <CourseDetail courseId={id} />
}
