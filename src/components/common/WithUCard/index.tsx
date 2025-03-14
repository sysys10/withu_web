// src/components/common/WithUCard/index.tsx
import Image from 'next/image'

interface WithRowCardProps {
  id: string
  name: string
  image: string
  address: string
  distance: number
  price: number
  tags: string[]
}

export default function WithRowCard({ id, name, image, address, distance, price, tags }: WithRowCardProps) {
  return (
    <div className='w-full flex gap-4 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      <div className='h-24 w-24 relative rounded-md overflow-hidden'>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className='object-cover'
          />
        ) : (
          <div className='h-full w-full bg-gray-300 flex items-center justify-center'>
            <span className='text-gray-500 text-xs'>No Image</span>
          </div>
        )}
      </div>

      <div className='flex-1 flex flex-col justify-between py-1'>
        <div>
          <h3 className='font-bold text-lg line-clamp-1'>{name}</h3>
          <p className='text-sm text-gray-600 line-clamp-1'>{address}</p>
        </div>

        <div>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-500'>{distance}km</span>
            <span className='font-medium'>{price.toLocaleString()}원</span>
          </div>

          <div className='flex flex-wrap gap-1 mt-1'>
            {tags && tags.length > 0 ? (
              tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='text-xs px-2 py-0.5 bg-gray-100 rounded-full'>
                  #{tag}
                </span>
              ))
            ) : (
              <span className='text-xs text-gray-400'>태그 없음</span>
            )}

            {tags && tags.length > 3 && <span className='text-xs text-gray-500'>+{tags.length - 3}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
