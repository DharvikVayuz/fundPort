/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "primary-bg": "url('https://anarock.com/_next/image?url=https%3A%2F%2Fwebsitemedia.anarock.com%2Fmedia%2Fbanner2_9cac93b9eb.webp&w=1920&q=75')",
      },
      colors: {
        // primary: "#2F3C91",
        // background-colors
        themeDefault: "var(--theme-default)",
        pageBodyBg: "var(--body-color)",
        headerBg: "var(--header-bg-color)",
        primaryBg: "var(--bg-primary-color)",
        secondaryBg: "var(--bg-secondary-color)",
        buttonBg:" var(--button-bg-color1)",
        darkPrimary: "#292E37",
        error: "#FF5050",
        //border-color
        borderColor:"var(--border-color)",
        inputBorderColor: "var(--border--input-color)",
        focusInputBorderColor: "var(--focus-input-border-color)",
        // text-colors
        primaryText: "var(--text-primary-color)",
        secondaryText: "var(--text-secondary-color)",
      },
      fontFamily: {
        sans: ["Encode Sans", "sans-serif"],
        serif: ["Encode Sans", "serif"],
      },
      scale: {
        75: "0.75",
      },
      screens: {
        "captcha-custom-width": { min: "740px", max: "1100px" }, // Add your custom breakpoint here
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      screens: {
        'xl': '1200px', // You can define or modify breakpoints here
      },
    },
  },
  plugins: [],
};
