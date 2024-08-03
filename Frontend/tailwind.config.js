/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      colors: {
        textmain: '#001F54',
        textsecond:'#0A1128',
        textthird:'#034078',
        textfourth:'#1282a2',
        mainbg:'#FEFCFB',
        secondbg:'#ffffff',
      },
      fontFamily: {
        'royal1': ['"Cormorant Garamond"', 'serif'],
        'royal2':['"Anton SC", sans-serif'],
        'royal3':['"Ubuntu", sans-serif'],
        'royal4':['"Nunito", sans-serif'],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 1s linear infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
    function({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "-webkit-scrollbar-width": "thin",
          "-webkit-scrollbar-color": "rgb(31 29 29) white"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          "&::-webkit-scrollbar-track": {
            background: "white"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white"
          }
        }
      }
      addUtilities(newUtilities, ["responsive", "hover"]);
    }
  ],
}