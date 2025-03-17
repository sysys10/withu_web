'use client'

import { ChevronDownIcon, ChevronUpIcon, ClockIcon, CreditCardIcon, MapPinIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BottomSheet } from 'react-web-bottomsheet'

interface Place {
  id: string
  name: string
  address: string
  image: string
  category: string
  latitude: number
  longitude: number
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
  courses: DateCourse
  initialCenter?: { lat: number; lng: number }
}

const MapWithBottomSheet = ({ courses, initialCenter = { lat: 37.5665, lng: 126.978 } }: MapComponentProps) => {
  const [selectedCourse, setSelectedCourse] = useState<DateCourse>(courses)
  const [selectedPlace, setSelectedPlace] = useState<Place>(courses.places[0])
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(20) // 초기 높이 (축소 상태)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([])
  const [polyline, setPolyline] = useState<naver.maps.Polyline | null>(null)
  const [allPlacesVisible, setAllPlacesVisible] = useState(true) // 모든 장소를 보여주는 상태인지

  // 모든 장소들이 지도에 표시될 수 있도록 경계를 계산하고 지도를 맞추는 함수
  const fitMapToAllPlaces = () => {
    if (!map || courses.places.length === 0) return

    const positions = courses.places.map(place => new naver.maps.LatLng(place.latitude, place.longitude))

    // 첫 번째 좌표로 경계를 초기화하고 나머지를 추가
    const bounds = new naver.maps.LatLngBounds(positions[0], positions[0])
    for (let i = 1; i < positions.length; i++) {
      bounds.extend(positions[i])
    }

    // 약간의 여백을 추가하여 모든 마커가 잘 보이도록 설정
    map.fitBounds(bounds, {
      top: 100,
      right: 100,
      bottom: 200,
      left: 100
    })

    setAllPlacesVisible(true)
  }

  useEffect(() => {
    if (mapRef.current && !map) {
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(courses.places[0].latitude - 0.0004, courses.places[0].longitude),
        zoom: 15, // 초기 줌 레벨을 약간 낮게 설정
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT
        }
      })

      setMap(mapInstance)
      setMapLoaded(true)
    }
  }, [mapRef, courses, initialCenter])

  useEffect(() => {
    if (map && mapLoaded && courses.places.length > 0) {
      markers.forEach(marker => marker.setMap(null))
      if (polyline) polyline.setMap(null)

      const newMarkers: naver.maps.Marker[] = []
      const path: naver.maps.LatLng[] = []

      courses.places.forEach((place, index) => {
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

        // Add click event to marker
        naver.maps.Event.addListener(marker, 'click', () => {
          setSelectedPlace(place)
          setAllPlacesVisible(false)

          // Ensure bottom sheet is visible and at correct height
          setIsBottomSheetVisible(true)
          setBottomSheetHeight(200)

          // Center map on selected place with smooth animation
          map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
          map.setZoom(16)
        })

        newMarkers.push(marker)
      })

      // Create polyline to connect places
      const newPolyline = new naver.maps.Polyline({
        path,
        strokeColor: '#5347AA', // Using the purple color from your example
        strokeWeight: 3,
        strokeOpacity: 0.8,
        map
      })

      setMarkers(newMarkers)
      setPolyline(newPolyline)

      // 모든 장소가 보이도록 지도를 맞춤
      fitMapToAllPlaces()
    }
  }, [map, mapLoaded, courses.places])

  const toggleBottomSheetExpansion = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible)
    setBottomSheetHeight(bottomSheetHeight <= 200 ? 400 : 200)
  }

  const handleDragStart = () => {
    // Add a class to the map container to disable pointer events during drag
    if (mapRef.current) {
      mapRef.current.classList.add('pointer-events-none')
    }
  }

  const handleDragEnd = () => {
    // Re-enable pointer events on the map when drag ends
    if (mapRef.current) {
      mapRef.current.classList.remove('pointer-events-none')
    }
  }

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place)
    setAllPlacesVisible(false)

    if (map) {
      // Center map on selected place with smooth animation
      const position = new naver.maps.LatLng(place.latitude, place.longitude)

      // 부드러운 이동 애니메이션 추가
      map.panTo(position, { duration: 500, easing: 'easeOutCubic' })
      map.setZoom(16)
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* 전체 코스 보기 버튼 */}
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
      {selectedCourse && (
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
            style={{ height: 'calc(100% - 80px)' }}
            // Prevent map interaction when scrolling sheet content
            onTouchStart={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}>
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
