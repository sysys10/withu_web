'use client'
import Section from '@/components/common/Section'
import { useState, useEffect } from 'react'

export type HomeRecommendsCardType = 'today' | 'recent'

function getHomeRecommendsCardData(type: HomeRecommendsCardType, setData: (data: any[]) => void) {
  if (type === 'today') {
    setData([
      {
        id: '1',
        name: '장소1',
        image: '',
        address: '서울시 강남구',
        distance: 1.2,
        cost: 15000,
        tags: ['카페', '디저트']
      },
      {
        id: '2',
        name: '장소2',
        image: '',
        address: '서울시 마포구',
        distance: 0.8,
        cost: 25000,
        tags: ['레스토랑', '이탈리안']
      }
    ])
  } else if (type === 'recent') {
    setData([
      {
        id: '3',
        name: '최근 방문 장소',
        image: '',
        address: '서울시 용산구',
        distance: 2.5,
        cost: 30000,
        tags: ['바', '펍']
      }
    ])
  }
}

export default function HomeRecommendsCard({ name, type }: { name: string; type: HomeRecommendsCardType }) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getHomeRecommendsCardData(type, setData)
  }, [type])

  return (
    <Section title={name}>
      <div className="space-y-4">
        {data.map(item => (
          <HomeRecommendsCardItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </Section>
  )
}

function HomeRecommendsCardItem({
  name,
  image,
  address,
  distance,
  cost,
  tags
}: {
  name: string
  image: string
  address: string
  distance: number
  cost: number
  tags: string[]
}) {
  return (
    <div className='w-full h-24 flex gap-4 px-2 border border-gray-200 rounded-lg'>

      <div className='h-full aspect-square rounded-md bg-gray-400'></div>
      <div className='flex-1 h-full flex flex-col justify-between py-2'>
        <div>
          <h3 className='font-bold text-lg'>{name}</h3>
          <p className='text-sm text-gray-600'>{address}</p>
        </div>
        <div>
          <div className='flex justify-between text-sm'>
            <span>{distance}km</span>
            <span>{cost.toLocaleString()}원</span>
          </div>
          <div className='flex gap-1 mt-1'>
            {tags.map((tag, index) => (
              <span key={index} className='text-xs px-2 py-1 bg-gray-100 rounded-full'>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}