import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/auth') || pathname === '/') {
    return NextResponse.next()
  }
  if (pathname.startsWith('/mypage')) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}
