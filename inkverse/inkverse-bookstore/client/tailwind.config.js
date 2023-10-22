const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#237943",
                secondary: "#3366CC",
                // You can add more custom colors here
            },
            fontFamily: {
                mulish: ["Mulish", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
});
