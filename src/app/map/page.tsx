import MapWithBottomSheet from '@/components/course/MapWithBottomSheet'
import TopBar from '@/components/layout/TopBar'

interface MapPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MapPage({ params }: MapPageProps) {
  const { id } = await params

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <TopBar />
      <div className='pt-12 h-full w-full'>
        <MapWithBottomSheet id={id} />
      </div>
    </div>
  )
}
