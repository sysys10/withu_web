'use client'
import Section from '@/components/common/Section'
import { useState } from 'react'

export type HomeRecommendsCardType = 'today' | 'recent'

function getHomeRecommendsCardData(type: HomeRecommendsCardType, setData: (data: any[]) => void) {
  if (type === 'today') {
    setData([])
  } else if (type === 'recent') {
    setData([])
  }
}

export default function HomeRecommendsCard({ name, type }: { name: string; type: HomeRecommendsCardType }) {
  const [data, setData] = useState<any[]>([])

  return (
    <Section title={name}>
      {data.map(item => (
        <HomeRecommendsCardItem
          key={item.id}
          {...item}
        />
      ))}
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
    <div className='w-full h-52'>
      <div className='aspect-square rounded-lg bg-gray-500'></div>
    </div>
  )
}
