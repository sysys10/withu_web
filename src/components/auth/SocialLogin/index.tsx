'use client'
export default function SocialLogin() {
  const handleKakaoLogin = () => {
    console.log('kakao login')
  }
  const handleNaverLogin = () => {
    console.log('naver login')
  }
  const handleGoogleLogin = () => {
    console.log('google login')
  }

  return (
    <div className='flex justify-center gap-6 w-full'>
      <button
        onClick={handleKakaoLogin}
        className='flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 3C6.48 3 2 6.48 2 10.8C2 13.8 3.9 16.41 6.74 17.84C6.6 18.39 6.02 20.24 5.93 20.67C5.82 21.2 6.14 21.2 6.41 21.02C6.62 20.89 8.98 19.3 9.69 18.84C10.44 18.98 11.21 19.05 12 19.05C17.52 19.05 22 15.57 22 11.25C22 6.93 17.52 3 12 3Z'
            fill='#391B1B'
          />
        </svg>
      </button>

      <button
        onClick={handleNaverLogin}
        className='flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 transition-colors'>
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16 8.33333V15.6667H13.6L10.4 10.9067V15.6667H8V8.33333H10.4L13.6 13.0933V8.33333H16Z'
            fill='white'
          />
        </svg>
      </button>

      <button
        onClick={handleGoogleLogin}
        className='flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
            fill='#FFC107'
          />
          <path
            d='M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z'
            fill='#FF3D00'
          />
          <path
            d='M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3037 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z'
            fill='#4CAF50'
          />
          <path
            d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.784L18.7045 19.403C18.4855 19.6015 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
            fill='#1976D2'
          />
        </svg>
      </button>
    </div>
  )
}
