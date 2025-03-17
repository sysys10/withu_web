'use client'

import { handleCreateCourse } from '@/utils/handleMobileAction'

export default function AddCourseButton({ text }: { text: string }) {
  return <button onClick={handleCreateCourse}>{text}</button>
}
