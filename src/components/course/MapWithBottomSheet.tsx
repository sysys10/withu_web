'use client'

import { DateCourse, Place } from '@/types/courses.type'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CreditCardIcon,
  LoaderIcon,
  MapPinIcon,
  StarIcon
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BottomSheet } from 'react-web-bottomsheet'

import { useCourseDetail } from '@/hooks/query/useCourse'

// Map Marker Component
const createMarkerContent = (index: number) => {
  return `
    <div class="custom-marker">
      <div style="width: 36px; height: 36px; border-radius: 18px; background-color: #3B82F6; color: white; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        ${index + 1}
      </div>
    </div>
  `
}

// Loading Component
const LoadingView = () => (
  <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-50'>
    <LoaderIcon className='w-12 h-12 text-blue-500 animate-spin mb-4' />
    <p className='text-gray-600 font-medium'>지도를 로딩 중입니다...</p>
  </div>
)

// Empty State Component
const EmptyState = () => (
  <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-50'>
    <MapPinIcon className='w-12 h-12 text-gray-400 mb-4' />
    <h3 className='text-xl font-bold text-gray-700 mb-2'>코스 정보가 없습니다</h3>
    <p className='text-gray-600'>해당 코스를 찾을 수 없거나 정보가 삭제되었습니다.</p>
  </div>
)

// Place Item Component
const PlaceItem = ({
  place,
  index,
  isSelected,
  onClick
}: {
  place: Place
  index: number
  isSelected: boolean
  onClick: () => void
}) => (
  <div
    className={`flex border rounded-lg overflow-hidden cursor-pointer transition-colors ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}
    onClick={onClick}>
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
)

// Course Details Component
const CourseDetails = ({
  course,
  selectedPlace,
  setSelectedPlace,
  bottomSheetHeight,
  setBottomSheetHeight,
  map
}: {
  course: DateCourse
  selectedPlace: Place
  setSelectedPlace: (place: Place) => void
  bottomSheetHeight: number
  setBottomSheetHeight: (height: number) => void
  map: naver.maps.Map
}) => {
  const toggleBottomSheetExpansion = () => {
    setBottomSheetHeight(bottomSheetHeight <= 200 ? 400 : 200)
  }

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place)

    if (map) {
      const position = new naver.maps.LatLng(place.latitude, place.longitude)
      map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
      map.setZoom(16)
    }
  }

  return (
    <>
      <div
        className='p-4 border-b border-gray-200'
        onTouchStart={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}>
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
        style={{ height: 'calc(100% - 80px)' }}
        onTouchStart={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}>
        <div className='mb-6'>
          <div className='flex items-center mb-2'>
            <div className='flex items-center mr-4'>
              <ClockIcon className='w-4 h-4 text-gray-500 mr-1' />
              <span className='text-sm text-gray-600'>{course.total_time}분</span>
            </div>
            <div className='flex items-center'>
              <CreditCardIcon className='w-4 h-4 text-gray-500 mr-1' />
              <span className='text-sm text-gray-600'>{course.price.toLocaleString()}원</span>
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
            {course.places.map((place: Place, index: number) => (
              <PlaceItem
                key={place.id}
                place={place}
                index={index}
                isSelected={selectedPlace?.id === place.id}
                onClick={() => handlePlaceClick(place)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const MapWithBottomSheet = ({ id }: { id: string }) => {
  const { course, isLoading } = useCourseDetail({ id })
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(20)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([])
  const [polyline, setPolyline] = useState<naver.maps.Polyline | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Set initial selected place when course data loads
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
      right: 100,
      bottom: 300,
      left: 100
    })
  }

  // Initialize map
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

  // Setup markers and polyline
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

      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedPlace(place)
        setBottomSheetHeight(200)
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

  const handleDragStart = () => {
    if (mapRef.current) {
      mapRef.current.classList.add('pointer-events-none')
    }
  }

  const handleDragEnd = () => {
    if (mapRef.current) {
      mapRef.current.classList.remove('pointer-events-none')
    }
  }

  // Show loading state
  if (isLoading) {
    return <LoadingView />
  }

  if (!course || !course.places || course.places.length === 0) {
    return <EmptyState />
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* View All Course Button */}
      <div className='absolute top-4 right-4 z-10'>
        <button
          className='bg-white px-4 py-2 rounded-md shadow-md font-medium text-blue-600'
          onClick={fitMapToAllPlaces}>
          전체 코스 보기
        </button>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className='w-full h-full'></div>

      {/* Bottom Sheet */}
      <BottomSheet
        sheetHeight={bottomSheetHeight}
        setSheetHeight={setBottomSheetHeight}
        isVisible={true}
        minHeight='20%'
        className='max-w-xl mx-auto w-full'
        maxHeight='90%'
        initialHeight='20%'
        snapPoints={[20, 45, 80]}
        showBackdrop={false}
        animated={true}
        animationDuration={300}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        containerStyle={{
          zIndex: 10,
          touchAction: 'none'
        }}
        handleStyle={{
          width: '60px',
          height: '6px',
          backgroundColor: '#CBD5E0',
          cursor: 'grab'
        }}>
        <CourseDetails
          course={course}
          selectedPlace={selectedPlace!}
          setSelectedPlace={setSelectedPlace}
          bottomSheetHeight={bottomSheetHeight}
          setBottomSheetHeight={setBottomSheetHeight}
          map={map!}
        />
      </BottomSheet>
    </div>
  )
}

export default MapWithBottomSheet
