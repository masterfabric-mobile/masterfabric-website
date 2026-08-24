/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          "Fira Code",
          "Fira Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          ...defaultTheme.fontFamily.mono,
        ],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay-2': 'float 6s ease-in-out 4s infinite',
        'ai-spin': 'ai-spin 16s linear infinite',
        'ai-spin-reverse': 'ai-spin 22s linear infinite reverse',
        'ai-pulse': 'ai-pulse 2.4s ease-in-out infinite',
        'ai-glow': 'ai-glow 3.2s ease-in-out infinite',
        'scroll-infinite': 'scroll-infinite 48s linear infinite',
        'scroll-infinite-reverse': 'scroll-infinite 56s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'ai-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'ai-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.14)', opacity: '1' },
        },
        'ai-glow': {
          '0%, 100%': { opacity: '0.45', filter: 'blur(10px)' },
          '50%': { opacity: '0.9', filter: 'blur(6px)' },
        },
        'scroll-infinite': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
