'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

// Dummy data for calendar events
const EVENTS = [
  { date: '2025-03-15', title: '한강 데이트', time: '15:00' },
  { date: '2025-03-20', title: '홍대 카페 투어', time: '13:00' },
  { date: '2025-03-28', title: '영화 관람', time: '19:00' }
]

export default function DateCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before start of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // Check if a day has events
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return EVENTS.filter(event => event.date === dateStr)
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold'>
          {year}년 {MONTHS[month]}
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={prevMonth}
            className='p-1 rounded-full hover:bg-gray-100'>
            <ChevronLeftIcon size={20} />
          </button>
          <button
            onClick={nextMonth}
            className='p-1 rounded-full hover:bg-gray-100'>
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-7 gap-1 mb-2'>
        {DAYS.map(day => (
          <div
            key={day}
            className='text-center font-medium text-sm py-1'>
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className='aspect-square p-1 border border-gray-100 rounded-md'>
            {day && (
              <div className='h-full'>
                <div
                  className={`text-sm font-medium ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                  {day}
                </div>

                <div className='mt-1'>
                  {getEventsForDay(day).map((event, i) => (
                    <div
                      key={i}
                      className='bg-blue-100 text-blue-800 text-xs py-0.5 px-1 rounded truncate mb-0.5'
                      title={`${event.title} - ${event.time}`}>
                      {event.time} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
