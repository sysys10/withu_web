'use client'

import { CameraIcon, ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

// Dummy profile data (same as in ProfilePage)
const PROFILE_DATA = {
  id: 'user123',
  name: '김민재',
  email: 'minjae@example.com',
  profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: '맛집 탐방과 여행을 좋아하는 남자입니다.',
  gender: '남성',
  age: 28,
  stats: {
    coursesCreated: 5,
    coursesSaved: 12,
    following: 23,
    followers: 18
  }
}

export default function EditProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      setName(PROFILE_DATA.name)
      setBio(PROFILE_DATA.bio || '')
      setGender(PROFILE_DATA.gender || '')
      setAge(PROFILE_DATA.age?.toString() || '')
      setProfileImage(PROFILE_DATA.profileImage || '')

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For a real implementation, you would upload this file to your server
    // and get a URL back. For this demo, we'll simulate that.
    const reader = new FileReader()
    reader.onload = () => {
      setProfileImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      alert('이름을 입력해주세요.')
      return
    }

    setIsSaving(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSaving(false)
    router.push('/mypage')
  }

  if (isLoading) {
    return (
      <div className='min-h-screen pb-20'>
        <div className='bg-white p-4 fixed top-0 left-0 right-0 max-w-xl mx-auto z-10 border-b'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <button className='rounded-full p-1 hover:bg-gray-100'>
                <ChevronLeftIcon size={24} />
              </button>
              <Skeleton className='h-7 w-40' />
            </div>
          </div>
        </div>

        <div className='pt-20 px-4'>
          <div className='flex justify-center mb-6'>
            <Skeleton className='w-24 h-24 rounded-full' />
          </div>

          <div className='space-y-4'>
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-20 w-full rounded-lg' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-20'>
      <div className='bg-white p-4 fixed top-0 left-0 right-0 max-w-xl mx-auto z-10 border-b'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => router.back()}
              className='rounded-full p-1 hover:bg-gray-100'>
              <ChevronLeftIcon size={24} />
            </button>
            <h1 className='text-xl font-bold'>프로필 수정</h1>
          </div>
        </div>
      </div>

      <div className='pt-20 px-4'>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          {/* Profile image */}
          <div className='flex justify-center mb-6'>
            <div className='relative'>
              <div className='w-24 h-24 rounded-full overflow-hidden'>
                <Image
                  src={profileImage || '/default-avatar.png'}
                  alt='Profile'
                  width={96}
                  height={96}
                  className='object-cover'
                />
              </div>
              <label
                htmlFor='profile-image'
                className='absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer'>
                <CameraIcon size={16} />
                <input
                  type='file'
                  id='profile-image'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>이름</Label>
              <Input
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='이름을 입력하세요'
                required
              />
            </div>

            <div className='flex gap-4'>
              <div className='flex-1'>
                <Label htmlFor='gender'>성별</Label>
                <select
                  id='gender'
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className='w-full h-12 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'>
                  <option value=''>선택 안함</option>
                  <option value='남성'>남성</option>
                  <option value='여성'>여성</option>
                  <option value='기타'>기타</option>
                </select>
              </div>

              <div className='flex-1'>
                <Label htmlFor='age'>나이</Label>
                <Input
                  id='age'
                  type='number'
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  placeholder='나이'
                  min={1}
                  max={120}
                />
              </div>
            </div>

            <div>
              <Label htmlFor='bio'>자기 소개</Label>
              <textarea
                id='bio'
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder='자신을 소개해주세요'
                className='w-full min-h-20 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none'
              />
            </div>
          </div>

          <div className='flex gap-2'>
            <Button
              type='button'
              size='lg'
              onClick={() => router.back()}
              className='flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'>
              취소
            </Button>

            <Button
              type='submit'
              size='lg'
              disabled={isSaving || !name}
              className='flex-1 bg-blue-500 hover:bg-blue-600'>
              {isSaving ? '저장 중...' : '저장하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
