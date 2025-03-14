import Image from 'next/image'
import Link from 'next/link'

interface HomeCategoryIconProps {
  imgSrc: string
  hasNew?: boolean
  color?: string
  title: string
  href: string
}
export default function HomeCategoryIcon({ imgSrc, color, hasNew = false, title, href }: HomeCategoryIconProps) {
  return (
    <Link
      href={href}
      className='flex flex-1 flex-col items-center relative'>
      {/* <Image
        width={40}
        height={40}
        src={imgSrc}
        alt={title}
      /> */}
      <div className={`w-12 h-12 opacity-60 rounded-full ${color}`} />
      {hasNew && <div className='absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs px-1 rounded-full'>N</div>}
      <div className='text-sm mt-2 leading-3'>{title}</div>
    </Link>
  )
}
