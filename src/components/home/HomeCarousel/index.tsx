'use client'
import React from 'react'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/navigation'
const carouselItems = [
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/9b46a65717a646b08965d01a371dd448',
    id: '1',
    href: '/'
  },
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/b5c0c875eafd45309c7ebb6394df1c0a',
    id: '2',
    href: '/'
  },
  {
    image: 'https://d2ba33ltwyhxsm.cloudfront.net/common_img/comm_252615244369729.webp',
    id: '3',
    href: '/'
  },
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/b5c0c875eafd45309c7ebb6394df1c0a',
    id: '4',
    href: '/'
  }
]

export default function HomeCarousel() {
  const router = useRouter()
  return (
    <div className='w-full mx-auto'>
      <div className='relative'>
        <Carousel
          showStatus={false}
          showArrows={false}
          showThumbs={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          swipeable={true}
          autoPlay={true}
          interval={2000}
          emulateTouch={true}
          centerMode={true}
          centerSlidePercentage={95}
          selectedItem={1}>
          {carouselItems.map(item => (
            <div
              key={item.id}
              className='h-fit px-1'>
              <div
                onClick={() => router.push(item.href)}
                className='w-full relative aspect-[16/10]'>
                <Image
                  fill
                  className='object-cover rounded-2xl'
                  src={item.image}
                  alt={`Slide ${item.id}`}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* <button
        type='button'
        className='text-right w-full pr-4 text-gray-400 text-xs'>
        + 더보기
      </button> */}
    </div>
  )
}
