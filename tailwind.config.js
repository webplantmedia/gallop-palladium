/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './_data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1180px',
      '2xl': '1280px',
      '3xl': '1536px',
      '4xl': '1920px',
    },
    extend: {
      keyframes: {
        'ping-slow': {
          '50%': { transform: 'scale(1.4)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rotate-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'ping-slow': 'ping-slow 3s ease-in-out infinite',
        'spin-slow': 'rotate 20s linear infinite',
        'spin-slow-reverse': 'rotate-reverse 20s linear infinite',
      },
      fontSize: {
        xs: ['0.9rem', '1.5'],
        sm: ['1.1rem', '1.5'],
        base: ['1.2rem', '1.5'],
        lg: ['1.3rem', '1.5'],
        xl: ['1.4rem', '1.5'],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.675rem', { lineHeight: '1.3' }],
        '4xl': ['2.0rem', { lineHeight: '1.3' }],
        '5xl': ['2.9rem', { lineHeight: '1.3' }],
        '6xl': ['3.2rem', { lineHeight: '1.3' }],
      },
      fontFamily: {
        nav: ['var(--font-body)'],
        body: ['var(--font-body)'],
        accent: ['var(--font-accent)'],
      },
      colors: {
        primary: {
          lighter: '#77565d',
          light: '#634249',
          main: '#58353b',
          dark: '#44272d',
          darker: '#2d171c',
          contrast: '#ffffff',
        },
        secondary: {
          lighter: '#555555',
          light: '#444444',
          main: '#333333',
          dark: '#222222',
          darker: '#111111',
          contrast: '#ffffff',
        },
        base: {
          paper: '#ffffff',
          darker: '#6b5c4c',
          dark: '#eed093',
          body: '#fff1dc',
          light: '#ffe7bd',
          card: '#f4e3c9',
          contrast: '#000000',
          contrast2: '#603813',
          disabled: '#936f4d',
        },
        success: '#0070f3',
      },
      spacing: {
        28: '7rem',
        68: '17rem',
      },
      letterSpacing: {
        tighter: '-.04em',
        wider: '0.1em',
        widest: '0.2em',
      },
      lineHeight: {
        tight: 1.2,
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '1/2': '1 / 2',
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    plugin(function ({ addVariant }) {
      addVariant('dmh', 'body.theme-dmh &');
      // addVariant('acc', 'body.theme-acc &');
      // addVariant('hocus', ['&:hover', '&:focus']);
    }),
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme('colors');
      const newUtilities = {};

      Object.keys(colors).forEach((color) => {
        const colorValue = colors[color];

        if (typeof colorValue === 'string') {
          newUtilities[`.text-stroke-${e(color)}`] = {
            '-webkit-text-stroke-color': `${colorValue} !important`,
          };
        }
        /*else {
          Object.keys(colorValue).forEach((shade) => {
            if (typeof colorValue[shade] === 'string') {
              newUtilities[`.text-stroke-${e(color)}-${shade}`] = {
                '-webkit-text-stroke-color': colorValue[shade],
              };
            }
          });
				}*/
      });

      newUtilities['.container-type-size'] = {
        'container-type': 'size',
      };

      newUtilities['.text-stroke'] = {
        '-webkit-text-stroke': '1px',
        color: 'transparent',
      };

      newUtilities['.variant-normal'] = {
        fontVariant: 'normal',
      };
      newUtilities['.small-caps'] = {
        fontVariant: 'small-caps',
      };
      newUtilities['.column-fill-balance'] = {
        columnFill: 'balance',
      };
      newUtilities['.clip-trapazoid'] = {
        'clip-path': 'polygon(0 0, 100% 0, calc(100% - 30px) 100%, 30px 100%)',
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
