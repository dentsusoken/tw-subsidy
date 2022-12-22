/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "color-green": "#55CAC3",
        "color-blue": "#6179B8",
        "color-light-grey": "#D9D9D9",
        "color-grey": "#B3B3B3",
        "color-gainsboro": "#DCDCDC",
        "color-disabled": "#F0F0F0",
        "color-color-warnig": "#D32929",
        "color-search": "#E6E6E6",
      },
      width: {
        "18": "4.5rem",
        "22": "5.5rem",
        "35": "8.75rem",
        "76": "19rem",
        "78": "19.5rem"
      },
      minWidth: {
        "22": "5.5rem",
        "68": "17rem"
      },
      maxWidth: {
        "78": "19.5rem"
      },
      lineHeight: {
        "11": "2.75rem",
        "16": "4rem"
      },
      margin: {
        "19": "4.75rem"
      }
    },
  },
  plugins: [],
};
