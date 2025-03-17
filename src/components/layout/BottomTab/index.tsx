'use client'

import { BOTTOM_TAB_ITEMS } from '@/constants/bottomtab.constant'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomTab() {
  const pathname = usePathname()
  return (
    <div className='fixed bg-white bottom-0 w-full max-w-xl border-t border-[#f9f9f9] h-14'>
      <div className='flex justify-between h-full items-center'>
        {BOTTOM_TAB_ITEMS.map(item => (
          <Link
            href={item.href}
            key={item.id}
            className='flex items-center justify-center flex-1 h-full'>
            <Image
              src={pathname.startsWith(item.href) ? `${item.icon}-fill.svg` : `${item.icon}.svg`}
              alt={item.href}
              width={24}
              height={24}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
