/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans JP"'],
    },
    extend: {
      fontSize: {
        'header-title': ['18px', '18px'],
        'menu-step-text': ['13px', '53px'],
        'menu-button-text': ['15px', '22px'],
        'input-form-label': ['14px', '14px'],
        'input-form-text': ['16px', '16px'],
        'button-text': ['16px', '16px'],
        'button-done-text': ['16px', '23px'],
        'search-text': ['13px', '13px'],
        'error-message': ['10px', '10px'],
      },
      colors: {
        'color-key': '#55CAC3',
        'color-background': '#FFFFFF',
        'color-gray': '#B3B3B3',
        'color-grey': '#B3B3B3',
        'color-gray-search': '#868686',
        'color-gray-count': '#E6E6E6',
        'color-white': '#FFFFFF',
        'color-line': '#D9D9D9',
        'color-menu-button': '#CFCFCF',
        'color-required': '#d32929',
        'color-input-text-line': '#b3b3b3',
        'color-confirm': '#f0f0f0',
        'color-button-line': '#b3b3b3',
        'color-unapproved': '#D32929',
        'color-triangle-border-top': '#d9d9d9',
        'color-triangle-border': 'transparent',
        "color-green": "#84A5E4",
        "color-blue": "#6DB982",
        "color-light-grey": "#D9D9D9",
        "color-grey-accepted": "#B3B3B3",
        'color-gray-search': '#868686',
        "color-gainsboro": "#DCDCDC",
        "color-disabled": "#F0F0F0",
        "color-warnig": "#D32929",
        "color-search": "#E6E6E6",
        "color-verify": "#3EE76E"
      },
      width: {
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "35": "8.75rem",
        "70": "17.5rem",
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
