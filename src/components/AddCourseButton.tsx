'use client'

import { handleCreateCourse } from '@/utils/handleMobileAction'

export default function AddCourseButton({ text }: { text: string }) {
  return (
    <button
      className='bg-blue-400 rounded-lg text-white p-2'
      onClick={handleCreateCourse}>
      {text}
    </button>
  )
}
