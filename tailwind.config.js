/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary) / 0.05)',
          100: 'rgb(var(--color-primary) / 0.1)',
          200: 'rgb(var(--color-primary) / 0.2)',
          300: 'rgb(var(--color-primary) / 0.3)',
          400: 'rgb(var(--color-primary) / 0.4)',
          500: 'rgb(var(--color-primary) / 0.6)',
          600: 'rgb(var(--color-primary) / 0.8)',
          700: 'rgb(var(--color-primary) / 0.9)',
          800: 'rgb(var(--color-primary) / 0.95)',
          900: 'rgb(var(--color-primary))',
        },
        secondary: {
          50: 'rgb(var(--color-secondary) / 0.05)',
          // ... similar scale
          900: 'rgb(var(--color-secondary))',
        },
        accent: {
          50: 'rgb(var(--color-accent) / 0.05)',
          // ... similar scale
          900: 'rgb(var(--color-accent))',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },
  plugins: [],
}
