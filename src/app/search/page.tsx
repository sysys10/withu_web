export default async function SearchPage() {
  return (
    <div className='w-full min-h-screen bg-white'>
      <SearchPageHeader />
    </div>
  )
}

function SearchPageHeader() {
  return (
    <div className='px-4 py-5 font-sans'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>검색하기</h1>
      </div>
      <div className='flex items-center border border-gray-200 rounded-lg px-3 py-2 mb-4'>
        <div className='mr-2 text-gray-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <circle
              cx='11'
              cy='11'
              r='8'></circle>
            <line
              x1='21'
              y1='21'
              x2='16.65'
              y2='16.65'></line>
          </svg>
        </div>
        <input
          type='text'
          placeholder='지역이나 태그를 검색해보세요!'
          className='w-full outline-none text-base'
        />
      </div>

      <div className='flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 mb-4'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 text-gray-500'>
            <rect
              x='3'
              y='4'
              width='18'
              height='18'
              rx='2'
              ry='2'></rect>
            <line
              x1='16'
              y1='2'
              x2='16'
              y2='6'></line>
            <line
              x1='8'
              y1='2'
              x2='8'
              y2='6'></line>
            <line
              x1='3'
              y1='10'
              x2='21'
              y2='10'></line>
          </svg>
          <span className='text-base'>날짜 · 인원 · 시간</span>
        </div>
        <div className='text-gray-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <polyline points='6 9 12 15 18 9'></polyline>
          </svg>
        </div>
      </div>

      <div className='flex gap-2 overflow-x-auto pb-2 mb-6'>
        <button className='flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 text-sm whitespace-nowrap'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <line
              x1='4'
              y1='21'
              x2='4'
              y2='14'></line>
            <line
              x1='4'
              y1='10'
              x2='4'
              y2='3'></line>
            <line
              x1='12'
              y1='21'
              x2='12'
              y2='12'></line>
            <line
              x1='12'
              y1='8'
              x2='12'
              y2='3'></line>
            <line
              x1='20'
              y1='21'
              x2='20'
              y2='16'></line>
            <line
              x1='20'
              y1='12'
              x2='20'
              y2='3'></line>
            <line
              x1='1'
              y1='14'
              x2='7'
              y2='14'></line>
            <line
              x1='9'
              y1='8'
              x2='15'
              y2='8'></line>
            <line
              x1='17'
              y1='16'
              x2='23'
              y2='16'></line>
          </svg>
          <span>필터</span>
        </button>
        <button className='bg-gray-100 rounded-full px-4 py-2 text-sm whitespace-nowrap'>내 주변</button>
        <button className='bg-gray-100 rounded-full px-4 py-2 text-sm whitespace-nowrap'>지역</button>
        <button className='bg-gray-100 rounded-full px-4 py-2 text-sm whitespace-nowrap'>음식 종류</button>
        <button className='flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 text-sm whitespace-nowrap'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M9 11l3 3L22 4'></path>
            <path d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11'></path>
          </svg>
          <span>혜택</span>
        </button>
        <button className='bg-gray-100 rounded-full px-4 py-2 text-sm whitespace-nowrap'>가격</button>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-medium mb-4'>어떤 데이트 코스를 찾으세요?</h2>
        <div className='flex gap-3 overflow-x-auto pb-2 mb-6'>
          <div className='min-w-48 rounded-xl overflow-hidden shadow-md'>
            <div className='h-44 bg-gray-300 bg-center bg-cover'></div>
            <div className='p-3'>
              <h3 className='text-lg font-medium'>봄맞이 특집</h3>
              <p className='text-gray-600 mb-1'>실내</p>
              <span className='text-xs text-gray-500'>#저장 필수 맛집 총정리</span>
            </div>
          </div>
          <div className='min-w-48 rounded-xl overflow-hidden shadow-md'>
            <div className='h-44 bg-gray-300 bg-center bg-cover'></div>
            <div className='p-3'>
              <h3 className='text-lg font-medium'>신규 오픈</h3>
              <p className='text-gray-600 mb-1'>미식 스팟</p>
              <span className='text-xs text-gray-500'>#방금오픈 #뉴플레이스</span>
            </div>
          </div>
          <div className='min-w-48 rounded-xl overflow-hidden shadow-md'>
            <div className='h-44 bg-gray-300 bg-center bg-cover'></div>
            <div className='p-3'>
              <h3 className='text-lg font-medium'>쿠폰 사용 가능</h3>
              <p className='text-gray-600 mb-1'>다이닝 모음</p>
              <span className='text-xs text-gray-500'>#이벤트부터 1+1까지</span>
            </div>
          </div>
        </div>
        <div className='mb-6'>
          <h3 className='text-lg font-medium mb-3'>추천 해시태그</h3>
          <div className='flex gap-2 overflow-x-auto pb-2'>
            <button className='border border-red-400 text-red-400 rounded-full px-4 py-2 text-sm whitespace-nowrap'>
              #예약 오픈 달력
            </button>
            <button className='border border-red-400 text-red-400 rounded-full px-4 py-2 text-sm whitespace-nowrap'>
              #믿고먹는 브랜드관
            </button>
            <button className='border border-red-400 text-red-400 rounded-full px-4 py-2 text-sm whitespace-nowrap'>
              #스시오마카세
            </button>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <button className='w-full bg-red-500 text-white font-bold rounded-lg py-4 text-lg'>검색</button>
      </div>
    </div>
  )
}
