/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: '420px',
      md: '768px',
      lg: '1024px',
      xl: '1320px',
    },
    extend: {
      colors: {
        primary: "#242424",
        green: "#50DB97",
        red: "#F53838",
        orange: "#FFC149",
        purple: "#6c1ccc",
        blue: '#001F7E',
        "blue-100": "#F3F7FF",
        gray: "#BDBDBD",
        "gray-100": "#fafafa",
        "gray-200": "#f0f0f0",
      },
      boxShadow: {
        "primary-500": "5px 5px 10px 0px rgba(36, 36, 36, 0.3)",
        "gray-500": "0px 0px 16px 0px rgba(0, 0, 0, 0.1)",
        "gray-t-500": "0px -4px 10px 0px rgba(0, 0, 0, 0.1)",
        "gray-b-500": "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
      },
    },
    fontFamily: {
      onest: ['Onest', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont'],
      mulish: ['Mulish', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont']
    },
  },
  plugins: [],
}

