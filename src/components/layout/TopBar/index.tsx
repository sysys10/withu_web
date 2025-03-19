import Image from 'next/image'
import Link from 'next/link'

export default function TopBar() {
  return (
    <header className='h-14 px-2 fixed max-w-xl mx-auto top-0 right-0 left-0 bg-white z-50'>
      <nav className='flex h-full items-center justify-between'>
        <Link href='/home'>
          <Image
            src='/WithU_Logo.png'
            alt='logo'
            width={100}
            height={100}
          />
        </Link>

        <div className='flex items-center gap-2'>
          <Link href='/search'>
            <Image
              src='/icons/search.svg'
              alt='search'
              width={24}
              height={24}
            />
          </Link>
          <Link href='/wishlist'>
            <Image
              src='/icons/bookmark.svg'
              alt='bookmark'
              width={24}
              height={24}
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
