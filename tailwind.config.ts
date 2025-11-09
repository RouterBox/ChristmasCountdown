import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#C41E3A',
          green: '#0F6B3E',
          gold: '#FFD700',
          snow: '#FFFAFA',
        },
      },
      fontFamily: {
        festive: ['Comic Sans MS', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config

