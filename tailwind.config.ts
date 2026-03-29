import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DT Coaching Brand Colors
        dt: {
          black: '#0a0a0a',
          dark: '#141414',
          gray: '#1f1f1f',
          light: '#2a2a2a',
          orange: '#ff6b00',
          'orange-light': '#ff8533',
          gold: '#d4a853',
          white: '#fafafa',
          muted: '#888888',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
