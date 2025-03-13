import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'

import BottomTab from '@/components/layout/BottomTab'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/PretendardVariable.woff2',
      style: 'normal'
    }
  ],
  variable: '--font-pretendard'
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${pretendard.variable} ${caveat.variable} font-[--font-pretendard] max-w-lg mx-auto relative pb-12 h-screen`}>
        {children}
        <BottomTab />
      </body>
    </html>
  )
}
