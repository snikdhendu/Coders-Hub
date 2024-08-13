/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "", // Added prefix from the old configuration
  theme: {
    container: {
      center: true,
      padding: "1.5rem", // Changed padding to 1.5rem from 2rem as in the new configuration
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        textmain: '#001F54',
        textsecond: '#0A1128',
        textthird: '#034078',
        textfourth: '#1282a2',
        mainbg: '#FEFCFB',
        secondbg: '#ffffff',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'royal1': ['"Cormorant Garamond"', 'serif'],
        'royal2': ['"Anton SC", sans-serif'],
        'royal3': ['"Ubuntu", sans-serif'],
        'royal4': ['"Nunito", sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: { // Added pulse keyframes from the old configuration
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 1s linear infinite', // Added pulse animation from the old configuration
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('daisyui'), // Added daisyui plugin from the old configuration
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
};


