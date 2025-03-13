/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      aspectRatio: {
        '10/16': '10 / 16',
        '16/10': '16 / 10'
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        caveat: ['var(--font-caveat)']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: []
} satisfies Config

export default config
