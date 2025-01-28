// filepath: /home/remy/Desktop/proj/dgab/tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        lightnavy: "#0d2c55",
        navy: "#0f1f33",
        darknavy: "#071424",
        // colors for difficulty ratings
        beginner: "#dd57ff",
        easy: "#8885ff",
        medium: "#3d94ff",
        hard: "#00b8cc",
        challenge: "#5ce087",
        edit: "#808080",

      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        daysone: ["Days One", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mochiy: ['Mochiy Pop One', 'sans-serif'],
        miso: ['Miso', 'sans-serif'],
        wendy: ['Wendy', 'sans-serif'],
      }, 
      textUnderlineOffset: {
        12: '12px',
        16: '16px',
        20: '20px',
      },
      scrollMarginTop: {
        14: '14rem',
      },
    },
  },
   safelist: [
    'bg-beginner',
    'bg-easy',
    'bg-medium',
    'bg-hard',
    'bg-challenge',
    'bg-edit',
    'text-beginner',
    'text-easy',
    'text-medium',
    'text-hard',
    'text-challenge',
    'text-edit',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};