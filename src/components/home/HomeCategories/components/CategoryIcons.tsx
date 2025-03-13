import Image from 'next/image'
import Link from 'next/link'

interface HomeCategoryIconProps {
  imgSrc: string
  hasNew?: boolean
  title: string
  href: string
}
export default function HomeCategoryIcon({ imgSrc, hasNew = false, title, href }: HomeCategoryIconProps) {
  return (
    <Link
      href={href}
      className='flex flex-col items-center relative'>
      <Image
        width={40}
        height={40}
        src={imgSrc}
        alt={title}
      />
      {hasNew && <div className='absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs px-1 rounded-full'>N</div>}
      <div className='text-sm mt-2 leading-3'>{title}</div>
    </Link>
  )
}
