import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/auth') || pathname === '/') {
    return NextResponse.next()
  }

  return NextResponse.next()
}
