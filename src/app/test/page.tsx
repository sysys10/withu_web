'use client'

import { useEffect, useState } from 'react'
import { BottomSheet } from 'react-webview-bottomsheet'

export default function App() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const [isVisible, setIsVisible] = useState(true)
  const [currentHeight, setCurrentHeight] = useState(50)
  if (!isMounted) return null
  return (
    <div>
      <div className='h-screen w-screen -z-50 bg-red-100'>hello</div>
      <BottomSheet
        isVisible={isVisible}
        sheetHeight={currentHeight}
        setSheetHeight={setCurrentHeight}
        onClose={() => setIsVisible(false)}
        initialHeight='50%'
        showBackdrop={false}
        snapPoints={[20, 50, 80]}>
        <div>
          <h2>바텀시트 내용</h2>
          <p>이 바텀시트는 편리한 드래그 기능을 제공합니다.</p>
        </div>
      </BottomSheet>
    </div>
  )
}
