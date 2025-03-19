'use client'

import { axiosPrivate } from '@/api/axiosInstance'
import { DEFAULT_PROFILE_IMAGE } from '@/constants'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import {
  BookmarkIcon,
  CalendarIcon,
  CameraIcon,
  CogIcon,
  LogOutIcon,
  MapIcon,
  PencilIcon,
  UserIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useLogout } from '@/hooks/query'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export async function getMyProfile() {
  const { data } = await axiosPrivate.get('/api/user/profile')
  return data
}

export function useMyProfile() {
  const { data, isLoading, error } = useQuery({
    queryFn: getMyProfile,
    queryKey: []
  })
  return { data, isLoading, error }
}

export default function Profile() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const { data: profile, isLoading } = useMyProfile()
  const { logout, isPending: isLoggingOut } = useLogout()

  const handleLogout = async () => {
    if (!confirm('정말 로그아웃 하시겠습니까?')) {
      return
    }
    logout()
  }
  useEffect(() => {
    if (!isAuthenticated) {
      alert(user)
      window.location.href = '/auth'
    }
  }, [isAuthenticated, user])

  if (isLoading) {
    return (
      <div className='min-h-screen pb-20'>
        <div className='bg-blue-500 text-white pt-8 pb-12 px-4'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-xl font-bold'>마이페이지</h1>
            <CogIcon size={24} />
          </div>

          <div className='flex items-center gap-4'>
            <Skeleton className='w-20 h-20 rounded-full bg-white/20' />
            <div className='flex-1'>
              <Skeleton className='h-6 w-24 mb-2 bg-white/20' />
              <Skeleton className='h-4 w-40 bg-white/20' />
            </div>
          </div>
        </div>

        <div className='px-4 -mt-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6'>
            <div className='flex justify-around'>
              <Skeleton className='h-16 w-16' />
              <Skeleton className='h-16 w-16' />
              <Skeleton className='h-16 w-16' />
              <Skeleton className='h-16 w-16' />
            </div>
          </div>

          <div className='space-y-4'>
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-12 w-full rounded-lg' />
            <Skeleton className='h-12 w-full rounded-lg' />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-2'>프로필을 불러올 수 없습니다</h2>
          <p className='text-gray-500 mb-4'>잠시 후 다시 시도해주세요.</p>
          <Button
            onClick={() => window.location.reload()}
            className='bg-blue-500 text-white hover:bg-blue-600'>
            새로고침
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-20'>
      <div className='bg-blue-500 text-white pt-8 pb-12 px-4'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-xl font-bold'>마이페이지</h1>
          <button
            onClick={() => router.push('/mypage/settings')}
            className='p-1 rounded-full hover:bg-blue-400'>
            <CogIcon size={24} />
          </button>
        </div>

        <div className='flex items-center gap-4'>
          <div className='relative'>
            <div className='w-20 h-20 rounded-full overflow-hidden'>
              <Image
                src={profile.profileImage || DEFAULT_PROFILE_IMAGE}
                alt={profile.name}
                width={80}
                height={80}
                className='object-cover'
              />
            </div>
            <button
              onClick={() => router.push('/mypage/edit-profile')}
              className='absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full border-2 border-white'>
              <CameraIcon size={14} />
            </button>
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-bold'>{profile.name}</h2>
              <button
                onClick={() => router.push('/mypage/edit-profile')}
                className='p-1 rounded-full hover:bg-blue-400'>
                <PencilIcon size={14} />
              </button>
            </div>
            <p className='text-blue-100'>{profile.email}</p>
          </div>
        </div>
      </div>

      <div className='px-4 -mt-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6'>
          <div className='flex justify-around text-center'>
            <div>
              <p className='text-xl font-bold'>{profile.stats.coursesCreated}</p>
              <p className='text-sm text-gray-500'>작성 코스</p>
            </div>
            <div>
              <p className='text-xl font-bold'>{profile.stats.coursesSaved}</p>
              <p className='text-sm text-gray-500'>저장 코스</p>
            </div>
            <div>
              <p className='text-xl font-bold'>{profile.stats.following}</p>
              <p className='text-sm text-gray-500'>팔로잉</p>
            </div>
            <div>
              <p className='text-xl font-bold'>{profile.stats.followers}</p>
              <p className='text-sm text-gray-500'>팔로워</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className='space-y-4'>
          <button
            onClick={() => router.push('/mypage/courses?type=created')}
            className='w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <MapIcon
                  size={20}
                  className='text-blue-500'
                />
              </div>
              <span className='font-medium'>내가 만든 코스</span>
            </div>
            <div className='w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center'>
              <span className='text-xs text-gray-500'>{profile.stats.coursesCreated}</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/mypage/courses?type=saved')}
            className='w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <BookmarkIcon
                  size={20}
                  className='text-blue-500'
                />
              </div>
              <span className='font-medium'>저장한 코스</span>
            </div>
            <div className='w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center'>
              <span className='text-xs text-gray-500'>{profile.stats.coursesSaved}</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/mydate')}
            className='w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <CalendarIcon
                  size={20}
                  className='text-blue-500'
                />
              </div>
              <span className='font-medium'>나의 데이트 일정</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/mypage/following')}
            className='w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <UserIcon
                  size={20}
                  className='text-blue-500'
                />
              </div>
              <span className='font-medium'>팔로우 관리</span>
            </div>
          </button>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className='w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center'>
                <LogOutIcon
                  size={20}
                  className='text-red-500'
                />
              </div>
              <span className='font-medium text-red-500'>{isLoggingOut ? '로그아웃 중...' : '로그아웃'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
