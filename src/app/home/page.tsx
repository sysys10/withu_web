import React from 'react'

import MyRecentCourse from '@/components/home/Course/MyRecentCourse'
import RecommendCourse from '@/components/home/Course/RecommendCourse'
import HomeCarousel from '@/components/home/HomeCarousel'
import HomeCategories from '@/components/home/HomeCategories'
import TopBar from '@/components/layout/TopBar'

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main className='pt-2 pb-12'>
        <div>
          <HomeCarousel />
        </div>
        <div className='bg-[#f5f0e6] mt-6 pb-3 mx-0.5 pt-4 px-4 rounded-xl flex items-center'>
          <HomeCategories />
        </div>
        <div className='mt-6'>
          <RecommendCourse name='오늘의 추천' />
        </div>
        <div className='mt-6'>
          <MyRecentCourse name='최근 데이트' />
        </div>
      </main>
    </>
  )
}
