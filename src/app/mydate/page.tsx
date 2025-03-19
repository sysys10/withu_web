'use client'

import { CalendarIcon, ChevronLeftIcon, ListIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import DateCalendarView from '@/components/mydate/DateCalendarView'
import DateListView from '@/components/mydate/DateListView'
import { Button } from '@/components/ui/button'

export default function MyDatePage() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const router = useRouter()

  return (
    <div className='pb-20'>
      <div className='bg-white p-4 fixed top-0 left-0 right-0 max-w-xl mx-auto z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => router.back()}
              className='rounded-full p-1 hover:bg-gray-100'>
              <ChevronLeftIcon size={24} />
            </button>
            <h1 className='text-xl font-bold'>나의 데이트 일정</h1>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
              <ListIcon size={20} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-full ${viewMode === 'calendar' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
              <CalendarIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className='pt-20 px-4'>{viewMode === 'list' ? <DateListView /> : <DateCalendarView />}</div>

      <div className='fixed bottom-16 right-4'>
        <Button
          size='sm'
          onClick={() => router.push('/mydate/create')}
          className='rounded-full w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 p-0 shadow-lg'>
          <PlusIcon size={24} />
        </Button>
      </div>
    </div>
  )
}
