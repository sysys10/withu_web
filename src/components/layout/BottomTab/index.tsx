'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BOTTOM_TAB_ITEMS = [
  {
    id: 1,
    icon: '/icons/home',
    href: '/home'
    // nativeScreen: 'Home'
  },
  {
    id: 2,
    icon: '/icons/search',
    href: '/search'
    // nativeScreen: 'Search'
  },
  // {
  //   id: 3,
  //   icon: '/icons/add-circle',
  //   href: '/add'
  //   // nativeScreen: 'Add'
  // },
  {
    id: 4,
    icon: '/icons/calendar-clear',
    href: '/map'
    // nativeScreen: 'Wishlist'
  },
  {
    id: 5,
    icon: '/icons/person',
    href: '/mypage'
    // nativeScreen: 'Profile'
  }
]

export default function BottomTab() {
  const pathname = usePathname()
  return (
    <div className='fixed bg-white bottom-0 w-full max-w-xl border-t border-[#f9f9f9] h-12'>
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
