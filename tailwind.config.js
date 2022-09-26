/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                PT: ["PT Sans", " sans-serif"],
                Nunito: ['Nunito', 'sans-serif'],
                Logo: ['Varela Round', 'sans-serif'],
            },
        },
        colors: {
            primary: {
                DEFAULT: "#2BCDC5",
                0: "transparent",
                100: "#080f28",
                200: "#141a32;",
                300: "#0d132b",

            },
            secundary: {
                DEFAULT: '#f5f5f5f5',
                50: '#007aff',
                100: '#647690',
                200: '#1d2745',
                300: 'rgba(0,0,0,1)',
                400: 'rgba(0,0,0,0)'
            }
        },
        screens: {
            sm: "360px",
            // => @media (min-width: 375px) { ... }

            md: "768px",
            // => @media (min-width: 960px) { ... }

            lg: "1100px",
            // => @media (min-width: 1440px) { ... }
        },
    },
    plugins: [],

};