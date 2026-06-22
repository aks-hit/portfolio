import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        cosmos: {
          950: '#03020a',
          900: '#070414',
          800: '#0c0820',
          700: '#15102e',
        },
        neon: {
          cyan: '#22e4ff',
          violet: '#9d4edd',
          magenta: '#ff2bd6',
          amber: '#ffb547',
          lime: '#b6ff3c',
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan-line': 'scan-line 6s linear infinite',
        'orbit': 'orbit 22s linear infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-12px) translateX(6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', filter: 'blur(40px)' },
          '50%': { opacity: '0.95', filter: 'blur(60px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'grid-mesh':
          'linear-gradient(rgba(34,228,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,228,255,0.06) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 30%, rgba(157,78,221,0.25), transparent 60%)',
      },
    },
  },
  plugins: [],
}
export default config
