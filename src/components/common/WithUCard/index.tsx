export default function WithRowCard({
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
              <span
                key={index}
                className='text-xs px-2 py-1 bg-gray-100 rounded-full'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
