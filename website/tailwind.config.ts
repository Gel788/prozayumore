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
        // Premium Dark Color Palette - Морская тематика "Продаю Море"
        oceanBlue: 'rgb(51, 128, 217)',
        deepBlue: 'rgb(38, 102, 191)',
        turquoise: 'rgb(77, 179, 217)',
        coral: 'rgb(255, 115, 115)',
        
        // Фоновые цвета (темная тема)
        background: 'rgb(13, 20, 31)',
        surface: 'rgb(26, 33, 46)',
        surfaceElevated: 'rgb(38, 46, 59)',
        card: 'rgb(31, 38, 51)',
        cardElevated: 'rgb(46, 54, 66)',
        
        // Текст (темная тема)
        textPrimary: 'rgb(255, 255, 255)',
        textSecondary: 'rgb(179, 191, 204)',
        textTertiary: 'rgb(128, 140, 153)',
        
        // Акцентные цвета
        accentBlue: 'rgb(77, 166, 242)',
        accentTurquoise: 'rgb(89, 191, 217)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      borderRadius: {
        small: '12px',
        medium: '18px',
        large: '24px',
        xlarge: '32px',
      },
      boxShadow: {
        'premium-sm': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'premium-md': '0 8px 16px rgba(0, 0, 0, 0.4)',
        'premium-lg': '0 12px 24px rgba(0, 0, 0, 0.5)',
        'premium-xl': '0 16px 32px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 20px rgba(51, 128, 217, 0.3)',
      },
      spacing: {
        xs: '6px',
        sm: '12px',
        md: '20px',
        lg: '28px',
        xl: '36px',
        xxl: '56px',
      },
    },
  },
  plugins: [],
}
export default config

