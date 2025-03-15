'use client'

import { ChevronDownIcon, ChevronUpIcon, ClockIcon, CreditCardIcon, MapPinIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BottomSheet } from 'react-web-bottomsheet'

// Type definitions
interface Place {
  id: string
  name: string
  address: string
  image: string
  category: string
}

interface DateCourse {
  id: string
  name: string
  description: string
  tags: string[]
  price: number
  total_time: number
  rating: number
  review_count: number
  thumbnail: string
  places: Place[]
}

interface MapComponentProps {
  courses: DateCourse[]
  initialCenter?: { lat: number; lng: number }
}

const MapWithBottomSheet = ({ courses, initialCenter = { lat: 37.5665, lng: 126.978 } }: MapComponentProps) => {
  const [selectedCourse, setSelectedCourse] = useState<DateCourse>(courses[0])
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(20) // 초기 높이 (축소 상태)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Map initialization logic would go here in a real implementation
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleCourseSelect = (course: DateCourse) => {
    setSelectedCourse(course)
    setIsBottomSheetVisible(true)
  }

  const toggleBottomSheetExpansion = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible)
    setBottomSheetHeight(bottomSheetHeight === 200 ? 400 : 200)
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <div
        ref={mapRef}
        className='w-full h-full bg-gray-100 relative'
        style={{ zIndex: 1 }}>
        {!mapLoaded ? (
          <div className='flex items-center justify-center h-full'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : (
          <div className='absolute inset-0 bg-gray-200'>
            <div className='absolute top-4 left-4 right-4 h-12 bg-white rounded-lg shadow-md flex items-center px-4'>
              <MapPinIcon className='h-5 w-5 text-gray-400 mr-2' />
              <span className='text-gray-600'>서울특별시</span>
            </div>

            <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='flex flex-wrap gap-4 justify-center'>
                {courses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => handleCourseSelect(course)}
                    className='bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                    <div className='w-24 h-24 relative mb-2 rounded-lg overflow-hidden'>
                      <Image
                        src={
                          course.thumbnail ||
                          'http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1541167760496-1628856ab772%3Fq%3D80%26w%3D3337%26auto%3Dformat%26fit%3Dcrop&w=3840&q=75'
                        }
                        alt={course.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='text-sm font-medium text-center line-clamp-1'>{course.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedCourse && (
        <BottomSheet
          sheetHeight={bottomSheetHeight}
          setSheetHeight={setBottomSheetHeight}
          isVisible={true}
          minHeight='20%'
          className='max-w-xl mx-auto w-full'
          maxHeight='80%'
          initialHeight='50%'
          snapPoints={[20, 50, 80]}
          showBackdrop={false}
          animated={true}
          animationDuration={300}>
          <div className='p-4 border-b border-gray-200'>
            <div className='flex justify-between items-start'>
              <div className='flex-1'>
                <h2 className='text-xl font-bold'>{selectedCourse.name}</h2>
                <div className='flex items-center mt-1'>
                  <StarIcon className='w-4 h-4 text-yellow-500 fill-yellow-500 mr-1' />
                  <span className='text-sm font-medium'>{selectedCourse.rating}</span>
                  <span className='text-sm text-gray-500 ml-1'>({selectedCourse.review_count})</span>
                </div>
              </div>
              <button
                onClick={toggleBottomSheetExpansion}
                className='p-2 rounded-full bg-gray-100'>
                {bottomSheetHeight > 200 ? (
                  <ChevronDownIcon className='w-5 h-5 text-gray-600' />
                ) : (
                  <ChevronUpIcon className='w-5 h-5 text-gray-600' />
                )}
              </button>
            </div>
          </div>

          <div
            className='p-4 overflow-y-auto'
            style={{ height: 'calc(100% - 80px)' }}>
            <div className='mb-6'>
              <div className='flex items-center mb-2'>
                <div className='flex items-center mr-4'>
                  <ClockIcon className='w-4 h-4 text-gray-500 mr-1' />
                  <span className='text-sm text-gray-600'>{selectedCourse.total_time}분</span>
                </div>
                <div className='flex items-center'>
                  <CreditCardIcon className='w-4 h-4 text-gray-500 mr-1' />
                  <span className='text-sm text-gray-600'>{selectedCourse.price.toLocaleString()}원</span>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 mb-3'>
                {selectedCourse.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className='px-3 py-1 bg-gray-100 rounded-full text-sm'>
                    #{tag}
                  </span>
                ))}
              </div>

              <p className='text-gray-700'>{selectedCourse.description}</p>
            </div>

            {/* Places */}
            <div>
              <h3 className='text-lg font-bold mb-3'>코스 장소</h3>
              <div className='space-y-4'>
                {selectedCourse.places.map((place, index) => (
                  <div
                    key={place.id}
                    className='flex border border-gray-200 rounded-lg overflow-hidden'>
                    <div className='relative w-24 h-24'>
                      <Image
                        src={place.image || 'https://via.placeholder.com/100'}
                        alt={place.name}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute top-1 left-1 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs'>
                        {index + 1}
                      </div>
                    </div>
                    <div className='flex-1 p-3'>
                      <h4 className='font-bold'>{place.name}</h4>
                      <p className='text-sm text-gray-500 mb-1'>{place.address}</p>
                      <p className='text-sm text-gray-600'>{place.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Button */}
            <div className='mt-6 pb-6'>
              <Link href={`/course/${selectedCourse.id}`}>
                <button className='w-full bg-blue-500 text-white font-bold py-3 rounded-lg'>자세히 보기</button>
              </Link>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}

export default MapWithBottomSheet
