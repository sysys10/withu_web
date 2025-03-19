import { Star, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface CourseCardProps {
  id: string
  name: string
  thumbnail: string
  rating: number
  description: string
  tags: string[]
  price: number
}

export default function CourseCard({ id, name, thumbnail, description, tags, rating }: CourseCardProps) {
  return (
    <Link
      href={`/course/${id}`}
      className='min-w-[220px] bg-white'>
      <div className='relative w-full h-32 rounded-lg overflow-hidden'>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name}
            fill
            className='object-cover'
          />
        ) : (
          <div className='h-full bg-gray-200 flex items-center justify-center'>
            <span className='text-gray-500'>이미지 없음</span>
          </div>
        )}
      </div>
      <div className='p-3'>
        <div className='flex justify-between items-center'>
          <h3 className='font-medium mb-1 line-clamp-1'>{name}</h3>
          <div className='flex items-center gap-1'>
            <StarIcon className='w-4 h-4 fill-yellow-400 text-yellow-400' />
            <span className='text-sm text-gray-600'>{rating}</span>
          </div>
        </div>

        <p className='text-sm text-gray-600 mb-2 line-clamp-2'>{description}</p>
        <div className='flex flex-wrap gap-1 mb-2'>
          {tags &&
            tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className='text-xs px-2 py-0.5 bg-gray-100 rounded-full'>
                #{tag}
              </span>
            ))}
        </div>
      </div>
    </Link>
  )
}
