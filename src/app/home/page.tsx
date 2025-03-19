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
      </main>
    </div>
  )
}
