/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                'jersey': ['"Jersey 10"', 'sans-serif'],
            },
            colors: {
                'navbar-bg': '#343434',
            },
        },
    },
    plugins: [],
}
