/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "applicant": "#55CAC3",
        "approver": "#6179B8",
        "will": "#D9D9D9",
        "past": "#B3B3B3",
        "li": "#DCDCDC",
        "disabled": "#F0F0F0",
        "warnig": "#D32929",
        "search": "#E6E6E6",
      },
      width: {
        "18": "4.5rem",
        "22": "5.5rem",
        "76": "19rem",
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
