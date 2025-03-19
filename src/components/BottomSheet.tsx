'use client'

import React, {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  useEffect,
  useRef,
  useState
} from 'react'

interface BottomSheetProps {
  children: ReactNode
  initialHeight?: number
  minHeight?: number
  maxHeight?: number
  snapPoints?: number[]
  onSheetChange?: (height: number) => void
  className?: string
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  initialHeight = 30,
  minHeight = 20,
  maxHeight = 80,
  snapPoints = [30, 50, 80],
  onSheetChange,
  className = ''
}) => {
  // 상태 설정
  const [currentHeight, setCurrentHeight] = useState<number>(initialHeight)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startY, setStartY] = useState<number>(0)
  const [startHeight, setStartHeight] = useState<number>(initialHeight)

  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 가장 가까운 스냅 포인트 찾기
  const findClosestSnapPoint = (height: number): number => {
    return snapPoints.reduce((prev, curr) => (Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev))
  }

  // 드래그 시작 핸들러
  const handleDragStart = (e: ReactTouchEvent | ReactMouseEvent): void => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    setIsDragging(true)
    setStartY(clientY)
    setStartHeight(currentHeight)

    // 마우스 이벤트인 경우 document에 이벤트 리스너 추가
    if (!('touches' in e)) {
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
    }
  }

  // 드래그 이동 핸들러
  const handleDragMove = (e: TouchEvent | MouseEvent): void => {
    if (!isDragging) return

    // 현재 Y 좌표 가져오기
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = clientY - startY

    // 높이 계산 (드래그 방향에 따라 높이 조정)
    const windowHeight = window.innerHeight
    const delta = (deltaY / windowHeight) * 100
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - delta))

    setCurrentHeight(newHeight)

    if (onSheetChange) {
      onSheetChange(newHeight)
    }

    if (e.cancelable) {
      e.preventDefault()
    }
  }

  // 드래그 종료 핸들러
  const handleDragEnd = (): void => {
    if (!isDragging) return

    setIsDragging(false)

    // 가장 가까운 스냅 포인트로 이동
    const snapPoint = findClosestSnapPoint(currentHeight)
    setCurrentHeight(snapPoint)

    if (onSheetChange) {
      onSheetChange(snapPoint)
    }

    // 이벤트 리스너 제거
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', handleDragEnd)
  }

  // 모든 터치 이벤트를 시트 전체에 설정
  useEffect(() => {
    const sheet = sheetRef.current

    if (sheet) {
      const handleTouchStart = (e: TouchEvent) => {
        // 콘텐츠 영역 스크롤 중인지 확인
        if (
          contentRef.current &&
          e.target instanceof Node &&
          contentRef.current.contains(e.target) &&
          contentRef.current.scrollTop > 0 &&
          contentRef.current.scrollTop < contentRef.current.scrollHeight - contentRef.current.clientHeight
        ) {
          return // 스크롤 중이면 드래그 시작하지 않음
        }

        // 드래그 시작
        setIsDragging(true)
        setStartY(e.touches[0].clientY)
        setStartHeight(currentHeight)

        // 이미 스크롤 중이 아닌 경우 기본 동작 방지
        if (e.cancelable) {
          e.preventDefault()
        }
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return

        const clientY = e.touches[0].clientY
        const deltaY = clientY - startY

        const windowHeight = window.innerHeight
        const delta = (deltaY / windowHeight) * 100
        const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - delta))

        setCurrentHeight(newHeight)

        if (onSheetChange) {
          onSheetChange(newHeight)
        }

        // 드래그 중일 때 스크롤 방지
        if (e.cancelable) {
          e.preventDefault()
        }
      }

      const handleTouchEnd = () => {
        if (!isDragging) return

        setIsDragging(false)

        // 가장 가까운 스냅 포인트로 이동
        const snapPoint = findClosestSnapPoint(currentHeight)
        setCurrentHeight(snapPoint)

        if (onSheetChange) {
          onSheetChange(snapPoint)
        }
      }

      sheet.addEventListener('touchstart', handleTouchStart, { passive: false })
      sheet.addEventListener('touchmove', handleTouchMove, { passive: false })
      sheet.addEventListener('touchend', handleTouchEnd)

      return () => {
        sheet.removeEventListener('touchstart', handleTouchStart)
        sheet.removeEventListener('touchmove', handleTouchMove)
        sheet.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, startY, startHeight, currentHeight, minHeight, maxHeight, onSheetChange])

  return (
    <div
      ref={sheetRef}
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg rounded-t-2xl ${className}`}
      style={{
        height: `${currentHeight}vh`,
        transition: isDragging ? 'none' : 'height 0.3s ease-out',
        touchAction: 'pan-x'
      }}>
      {/* 드래그 핸들 - 마우스 이벤트를 위해 특별히 추가 */}
      <div
        className='w-full cursor-grab active:cursor-grabbing'
        onMouseDown={handleDragStart}>
        <div className='flex justify-center pt-3 pb-2'>
          <div className='w-12 h-1.5 bg-gray-300 rounded-full'></div>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        ref={contentRef}
        className='overflow-y-auto px-4 pb-4'
        style={{ height: 'calc(100% - 24px)', overscrollBehavior: 'contain' }}>
        {children}
      </div>
    </div>
  )
}

export default BottomSheet
