'use client'

import { useAuthStore } from '@/store/useAuthStore'
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ClockIcon,
  CreditCardIcon,
  HeartIcon,
  LoaderIcon,
  MapPinIcon,
  ShareIcon,
  StarIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// 커스텀 바텀시트 컴포넌트 가져오기
import BottomSheet from '@/components/BottomSheet'
import { Button } from '@/components/ui/button'

import { useCourseDetail } from '@/hooks/query/useCourse'

const createMarkerContent = (index: number) => {
  return `
    <div class="custom-marker">
      <div style="width: 36px; height: 36px; border-radius: 18px; background-color: #3B82F6; color: white; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        ${index + 1}
      </div>
    </div>
  `
}

const LoadingView = () => (
  <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-50'>
    <LoaderIcon className='w-12 h-12 text-blue-500 animate-spin mb-4' />
    <p className='text-gray-600 font-medium'>코스 정보를 불러오는 중입니다...</p>
  </div>
)

const EmptyState = () => (
  <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-50'>
    <MapPinIcon className='w-12 h-12 text-gray-400 mb-4' />
    <h3 className='text-xl font-bold text-gray-700 mb-2'>코스 정보가 없습니다</h3>
    <p className='text-gray-600'>해당 코스를 찾을 수 없거나 정보가 삭제되었습니다.</p>
  </div>
)

export default function CourseDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const { course, isLoading } = useCourseDetail({ id })
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(30)
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([])
  const [polyline, setPolyline] = useState<naver.maps.Polyline | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (course && course.places && course.places.length > 0 && !selectedPlace) {
      setSelectedPlace(course.places[0])
    }
  }, [course, selectedPlace])

  const fitMapToAllPlaces = () => {
    if (!course || !map || !course.places || course.places.length === 0) return

    const positions = course.places.map(place => new naver.maps.LatLng(place.latitude, place.longitude))
    const bounds = new naver.maps.LatLngBounds(positions[0], positions[0])

    for (let i = 1; i < positions.length; i++) {
      bounds.extend(positions[i])
    }

    map.fitBounds(bounds, {
      top: 100,
      right: 50,
      bottom: 300,
      left: 50
    })
  }

  useEffect(() => {
    if (!course || !course.places || course.places.length === 0) return

    if (mapRef.current && !map) {
      try {
        const mapInstance = new naver.maps.Map(mapRef.current, {
          center: new naver.maps.LatLng(course.places[0].latitude - 0.0004, course.places[0].longitude),
          zoom: 15,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
          }
        })

        setMap(mapInstance)
        setMapLoaded(true)
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    }
  }, [mapRef, course, map])

  useEffect(() => {
    if (!map || !mapLoaded || !course || !course.places || course.places.length === 0) return

    // Clear existing markers and polyline
    markers.forEach(marker => marker.setMap(null))
    if (polyline) polyline.setMap(null)

    const newMarkers: naver.maps.Marker[] = []
    const path: naver.maps.LatLng[] = []

    // Create markers for each place
    course.places.forEach((place, index) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude)
      path.push(position)

      const marker = new naver.maps.Marker({
        position,
        map,
        icon: {
          content: createMarkerContent(index),
          size: new naver.maps.Size(36, 36),
          anchor: new naver.maps.Point(18, 18)
        },
        zIndex: 100
      })

      map.setOptions({
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: false
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedPlace(place)
        setBottomSheetHeight(50)
        map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
        map.setZoom(16)
      })

      newMarkers.push(marker)
    })

    // Create polyline connecting all places
    const newPolyline = new naver.maps.Polyline({
      path,
      strokeColor: '#5347AA',
      strokeWeight: 3,
      strokeOpacity: 0.8,
      map
    })

    setMarkers(newMarkers)
    setPolyline(newPolyline)
    fitMapToAllPlaces()
  }, [map, mapLoaded, course])

  const handleSheetChange = (newHeight: number): void => {
    setBottomSheetHeight(newHeight)

    // 바텀시트 높이가 변경될 때 지도 영역 터치 이벤트 관리
    if (mapRef.current) {
      if (newHeight > 50) {
        mapRef.current.classList.add('pointer-events-none')
      } else {
        mapRef.current.classList.remove('pointer-events-none')
      }
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  if (isLoading) {
    return <LoadingView />
  }

  if (!course || !course.places || course.places.length === 0) {
    return <EmptyState />
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center'>
        <button
          onClick={() => router.back()}
          className='bg-white p-2 rounded-full shadow-md'>
          <ChevronLeftIcon size={24} />
        </button>

        <div className='flex gap-2'>
          <button
            onClick={toggleLike}
            className={`p-2 rounded-full shadow-md ${isLiked ? 'bg-red-100' : 'bg-white'}`}>
            <HeartIcon
              size={20}
              className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}
            />
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full shadow-md ${isBookmarked ? 'bg-blue-100' : 'bg-white'}`}>
            <BookmarkIcon
              size={20}
              className={isBookmarked ? 'text-blue-500 fill-blue-500' : 'text-gray-700'}
            />
          </button>
        </div>
      </div>

      <div
        ref={mapRef}
        className='w-full h-full'
      />

      {course && (
        <BottomSheet
          initialHeight={30}
          minHeight={20}
          maxHeight={80}
          snapPoints={[30, 50, 80]}
          onSheetChange={handleSheetChange}
          className='max-w-xl mx-auto w-full'>
          <div className='border-b border-gray-200 pb-4'>
            <div className='flex justify-between items-start'>
              <div className='flex-1'>
                <h2 className='text-xl font-bold'>{course.name}</h2>
                <div className='flex items-center mt-1'>
                  <StarIcon className='w-4 h-4 text-yellow-500 fill-yellow-500 mr-1' />
                  <span className='text-sm font-medium'>{course.rating}</span>
                  <span className='text-sm text-gray-500 ml-1'>({course.review_count})</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const newHeight = bottomSheetHeight === 30 ? 50 : 30
                  handleSheetChange(newHeight)
                  setBottomSheetHeight(newHeight)
                }}
                className='p-2 rounded-full bg-gray-100'>
                {bottomSheetHeight > 30 ? (
                  <ChevronDownIcon className='w-5 h-5 text-gray-600' />
                ) : (
                  <ChevronUpIcon className='w-5 h-5 text-gray-600' />
                )}
              </button>
            </div>
          </div>

          <div className='mt-4 pb-24'>
            <div className='mb-6'>
              <div className='flex items-center mb-2'>
                <div className='flex items-center mr-4'>
                  <ClockIcon className='w-4 h-4 text-gray-500 mr-1' />
                  <span className='text-sm text-gray-600'>{course.total_time}분</span>
                </div>
                <div className='flex items-center'>
                  <CreditCardIcon className='w-4 h-4 text-gray-500 mr-1' />
                  <span className='text-sm text-gray-600'>{course.price?.toLocaleString()}원</span>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 mb-3'>
                {course.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className='px-3 py-1 bg-gray-100 rounded-full text-sm'>
                    #{tag}
                  </span>
                ))}
              </div>

              <p className='text-gray-700'>{course.description}</p>
            </div>

            <div>
              <h3 className='text-lg font-bold mb-3'>코스 장소</h3>
              <div className='space-y-4'>
                {course.places.map((place: any, index: number) => (
                  <div
                    key={place.id}
                    onClick={() => {
                      setSelectedPlace(place)
                      if (map) {
                        const position = new naver.maps.LatLng(place.latitude, place.longitude)
                        map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
                        map.setZoom(16)
                      }
                    }}
                    className={`flex border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                      selectedPlace?.id === place.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}>
                    <div className='relative w-24 h-24'>
                      <Image
                        src={place.image_url[0] || '/placeholder-image.jpg'}
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
                      <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                        <MapPinIcon size={14} />
                        <span>{place.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 
            <div className='mt-8'>
              <div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                  <Image
                    src={course.creator.image || '/default-avatar.png'}
                    alt={course.creator.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <p className='font-medium'>{course.creator.name}</p>
                </div>
              </div>
            </div> */}
            <div className='bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center max-w-xl mx-auto z-20'>
              <Button
                size='lg'
                className='bg-blue-500 text-white hover:bg-blue-600 w-full'
                onClick={() => {
                  if (!isAuthenticated) {
                    router.push('/auth')
                  } else {
                    router.push(`/mydate/create?courseId=${course.id}`)
                  }
                }}>
                {isAuthenticated ? '이 코스로 일정 만들기' : '로그인하여 일정 만들기'}
              </Button>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
