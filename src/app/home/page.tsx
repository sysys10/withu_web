import HomeRecommendsCard from '@/components/home/HomeCard'
import HomeCarousel from '@/components/home/HomeCarousel'
import HomeCategories from '@/components/home/HomeCategories'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main className='pt-2'>
        <div>
          <HomeCarousel />
        </div>
        <div className='bg-[#f5f0e6] mt-6 pb-3 mx-0.5 pt-4 px-4 rounded-xl flex items-center'>
          <HomeCategories />
        </div>
        <div className='mt-6'>
          <HomeRecommendsCard
            name='오늘의 추천'
            type='today'
          />
        </div>
        <div className='mt-6'>
          <HomeRecommendsCard
            name='최근 데이트'
            type='recent'
          />
        </div>
      </main>
    </>
  )
}
