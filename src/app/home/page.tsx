import React from 'react'

import MyRecentCourse from '@/components/home/Course/MyRecentCourse'
import RecommendCourse from '@/components/home/Course/RecommendCourse'
import HomeCarousel from '@/components/home/HomeCarousel'
import HomeCategories from '@/components/home/HomeCategories'
import TopBar from '@/components/layout/TopBar'

export default function HomePage() {
  return (
    <div className='pb-16'>
      <TopBar />

      <main className='pt-14 px-4'>
        <div className='mb-6'>
          <HomeCarousel />
        </div>

        <div className='bg-[#f5f0e6] mt-6 pb-3 mx-0.5 pt-4 px-4 rounded-xl'>
          <HomeCategories />
        </div>

        <div className='mt-8'>
          <RecommendCourse name='오늘의 추천 데이트 코스' />
        </div>

        <div className='mt-8'>
          <MyRecentCourse name='나의 최근 데이트 코스' />
        </div>

        <div className='mt-8 bg-white rounded-xl shadow-md p-5'>
          <h2 className='text-xl font-semibold mb-3'>지금 인기 있는 데이트 코스</h2>
          <div className='space-y-4'>
            <div className='relative rounded-lg overflow-hidden'>
              <div className='w-full h-40 bg-gray-300'></div>
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3'>
                <h3 className='text-white font-bold'>서울숲 피크닉 데이트</h3>
                <div className='flex gap-2 mt-1'>
                  <span className='text-xs bg-white/30 text-white px-2 py-1 rounded-full'>실외</span>
                  <span className='text-xs bg-white/30 text-white px-2 py-1 rounded-full'>저렴한</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
