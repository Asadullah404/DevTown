/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070a12',
        surface: {
          DEFAULT: '#0d1322',
          card: '#0f172a',
          hover: '#162035',
        },
        primary: {
          DEFAULT: '#06b6d4', // Electric Cyan
          hover: '#0891b2',
          glow: 'rgba(6, 182, 212, 0.35)',
        },
        secondary: {
          DEFAULT: '#10b981', // Emerald
          hover: '#059669',
          glow: 'rgba(16, 185, 129, 0.35)',
        },
        accent: {
          purple: '#8b5cf6',
          amber: '#f59e0b',
        },
        foreground: '#ffffff',
        muted: '#94a3b8',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(6, 182, 212, 0.45)',
        'glow-emerald': '0 0 40px -10px rgba(16, 185, 129, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
