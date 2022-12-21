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
      'color-gray-search': '#868686',
      'color-gray-count': '#E6E6E6',
      'color-white': '#FFFFFF',
      'color-blue': '#6179B8',
      'color-line': '#D9D9D9',
      'color-menu-button': '#CFCFCF',
      'color-required': '#d32929',
      'color-input-text-line': '#b3b3b3',
      'color-confirm': '#f0f0f0',
      'color-button-line': '#b3b3b3',
      'color-unapproved': '#D32929',
    },
    extend: {},
  },
  plugins: [],
};
