'use client'

import { DateCourse, Place } from '@/types/courses.type'
import { ChevronDownIcon, ChevronUpIcon, ClockIcon, CreditCardIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BottomSheet } from 'react-web-bottomsheet'

interface MapComponentProps {
  course: DateCourse
}

const MapWithBottomSheet = ({ course }: MapComponentProps) => {
  const [selectedPlace, setSelectedPlace] = useState<Place>(course.places[0])
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(20) // 초기 높이 (축소 상태)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([])
  const [polyline, setPolyline] = useState<naver.maps.Polyline | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const fitMapToAllPlaces = () => {
    if (!map || course.places.length === 0) return

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

  useEffect(() => {
    if (mapRef.current && !map) {
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
    }
  }, [mapRef, course])

  useEffect(() => {
    if (map && mapLoaded && course.places.length > 0) {
      markers.forEach(marker => marker.setMap(null))
      if (polyline) polyline.setMap(null)

      const newMarkers: naver.maps.Marker[] = []
      const path: naver.maps.LatLng[] = []

      course.places.forEach((place, index) => {
        const position = new naver.maps.LatLng(place.latitude, place.longitude)
        path.push(position)

        const markerContent = `
        <div class="custom-marker">
          <div style="width: 36px; height: 36px; border-radius: 18px; background-color: #3B82F6; color: white; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${index + 1}
          </div>
        </div>
      `

        const marker = new naver.maps.Marker({
          position,
          map,
          icon: {
            content: markerContent,
            size: new naver.maps.Size(36, 36),
            anchor: new naver.maps.Point(18, 18)
          },
          zIndex: 100
        })
        naver.maps.Event.addListener(marker, 'click', () => {
          setSelectedPlace(place)
          setIsBottomSheetVisible(true)
          setBottomSheetHeight(200)
          map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
          map.setZoom(16)
        })

        newMarkers.push(marker)
      })
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
    }
  }, [map, mapLoaded, course.places])

  const toggleBottomSheetExpansion = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible)
    setBottomSheetHeight(bottomSheetHeight <= 200 ? 400 : 200)
  }

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

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place)

    if (map) {
      const position = new naver.maps.LatLng(place.latitude, place.longitude)

      map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
      map.setZoom(16)
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <div className='absolute top-4 right-4 z-10'>
        <button
          className='bg-white px-4 py-2 rounded-md shadow-md font-medium text-blue-600'
          onClick={fitMapToAllPlaces}>
          전체 코스 보기
        </button>
      </div>

      <div
        ref={mapRef}
        className='w-full h-full'></div>
      {course && (
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
          <div
            className='p-4 border-b border-gray-200'
            // Prevent map from receiving events when interacting with sheet header
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
                {course.tags.map((tag, idx) => (
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
                {course.places.map((place, index) => (
                  <div
                    key={place.id}
                    className={`flex border rounded-lg overflow-hidden cursor-pointer transition-colors ${selectedPlace.id === place.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => handlePlaceClick(place)}>
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
          </div>
        </BottomSheet>
      )}
    </div>
  )
}

export default MapWithBottomSheet
