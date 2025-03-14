import Image from 'next/image'
import Link from 'next/link'

export interface CourseCardProps {
  id: string
  name: string
  thumbnail: string
  description: string
  tags: string[]
  price: number
}

export default function CourseCard({ id, name, thumbnail, description, tags, price }: CourseCardProps) {
  return (
    <Link
      href={`/course/${id}`}
      className='min-w-[260px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
      <div className='relative w-full h-40'>
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
      <div className='p-4'>
        <h3 className='font-bold text-lg mb-1 line-clamp-1'>{name}</h3>
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
        <p className='font-medium text-right'>{price?.toLocaleString() || 0}원</p>
      </div>
    </Link>
  )
}
