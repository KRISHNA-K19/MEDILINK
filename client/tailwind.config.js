/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        medilink: {
          navy: '#001428',
          darkblue: '#0F2942',
          teal: '#006A61',
          tealLight: '#008C80',
          surface: '#F8F9FF',
          card: '#FFFFFF',
          text: '#0B1C30',
          muted: '#43474D',
          border: '#E0E3EB',
          input: '#F0F2F8',
          success: '#059669',
          amber: '#D97706',
          danger: '#DC2626',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
