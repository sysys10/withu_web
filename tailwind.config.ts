/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config = {
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'headline-4': ['2.5rem', '1.2']
      },
      aspectRatio: {
        '10/16': '10 / 16',
        '16/10': '16 / 10'
      },
      boxShadow: {
        'inset-b': 'inset 0 -0.5px 0 0 var(--border)',
        'inset-bl': 'inset 1px -1px 0 0 var(--border)',
        'inset-br': 'inset -1px -1px 0 0 var(--border)',
        'inset-tl': 'inset 1px 1px 0 0 var(--border)',
        'inset-tr': 'inset -1px 1px 0 0 var(--border)',
        'inset-t': 'inset 0 1px 0 0 var(--border)',
        'inset-r': 'inset -1px 0 0 0 var(--border)',
        'inset-l': 'inset 1px 0 0 0 var(--border)',
        'inset-all': 'inset 0 0 0 1px var(--border)'
      },
      fontFamily: {
        caveat: ['var(--font-caveat)'],
        pretendard: ['var(--font-pretendard)']
      },
      colors: {
        'navy-dark': '#000814',
        'teal-dark': '#003B4A',
        infosys: {
          purple: 'var(--infosys-purple)',
          blue: 'var(--infosys-blue)',
          green: '#008000',
          yellow: '#f4a50f',
          red: '#ed888a'
        },
        btn: {
          disabled: 'var(--button-disabled)',
          yellow: '#f4a50f',
          paleyellow: '#fff5c9',
          tenderyellow: '#fffc88',
          green: '#5ebf86',
          red: '#ed888a',
          deactivate: '#909090',
          bordergrey: '#d8d8d8',
          sky: '#46b5ff'
        },
        text: {
          DEFAULT: 'var(--text-1)',
          secondary: 'var(--text-2)',
          disabled: 'var(--text-disabled)',
          tertiary: 'var(--text-3)',
          quaternary: 'var(--text-4)',
          card: 'var(--card-text)',
          navbar: 'var(--navbar-text)'
        },
        background: {
          DEFAULT: 'var(--background-1)',
          secondary: 'var(--background-2)',
          main: 'var(--background-main)',
          tertiary: 'var(--background-3)',
          disabled: 'var(--background-disabled)',
          navbar: 'var(--navbar-background)',
          card: 'var(--background-card)'
        },
        border: 'var(--border)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      spacing: {
        'navbar-height': 'var(--navbar-height)'
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
} satisfies Config

export default config
