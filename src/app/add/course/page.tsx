import { handleCreateCourse } from '@/utils/handleMobileAction'

export default function AddCoursePage() {
  handleCreateCourse()
  return (
    <div className='h-screen w-screen pt-40'>
      AddCoursePage
      <button onClick={handleCreateCourse}>Create Course</button>
    </div>
  )
}
