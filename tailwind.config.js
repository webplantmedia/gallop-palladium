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
        sm: ['1rem', '1.5'],
        base: ['1.2rem', '1.5'],
        lg: ['1.3rem', '1.5'],
        xl: ['1.4rem', '1.5'],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
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
          lighter: '#db8c3e',
          light: '#d2761a',
          main: '#CC6600',
          dark: '#c46302',
          darker: '#c06000',
          contrast: '#ffffff',
        },
        base: {
          paper: '#ffffff',
          darker: '#6b5c4c',
          dark: '#eed093',
          body: '#fff1dc',
          light: '#ffe7bd',
          card: '#e2cca2',
          contrast: '#482401',
          contrast2: '#603813',
          disabled: '#936f4d',
        },
        modern: {
          primary: {
            lighter: '#bed87d',
            light: '#b2d361',
            main: '#a3cd3c',
            dark: '#a5ce39',
            darker: '#97c225',
            contrast: '#ffffff',
          },
          secondary: {
            lighter: '#5d340c',
            light: '#532c06',
            main: '#482401',
            dark: '#3a1d01',
            darker: '#2c1600',
            contrast: '#ffffff',
          },
          base: {
            paper: '#ffffff',
            darker: '#6b5c4c',
            dark: '#eed093',
            body: '#ffffff',
            light: '#ffe7bd',
            card: '#e8fcb5',
            card2: '#e3faa8',
            contrast: '#482401',
            contrast2: '#603813',
            disabled: '#936f4d',
          },
        },
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
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
