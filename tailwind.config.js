/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/utils/tools/*.{js,ts,jsx,tsx,mdx}',
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
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rotate-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        dots: {
          '0%, 100%': { content: '"."' },
          '33%': { content: '".."' },
          '66%': { content: '"..."' },
        },
      },
      animation: {
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'rotate 20s linear infinite',
        'spin-slow-reverse': 'rotate-reverse 20s linear infinite',
        dots: 'dots 1.0s steps(1,end) infinite',
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
          lighter: '#6985a2',
          light: '#4d6c8d',
          main: '#304f70',
          dark: '#203d5b',
          darker: '#16304c',
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
          paper: '#f7f7f7',
          darker: '#cccccc',
          dark: '#eed093',
          body: '#ffffff',
          light: '#ffe7bd',
          card: '#f7f7f7',
          contrast: '#000000',
          contrast2: '#603813',
          disabled: '#936f4d',
        },
        success: '#0070f3',
        body: '#ffffff',
        body2: '#cccccc',
        contrast: '#000000',
        contrast2: '#636363',
        contrast3: '#a4a4a4',
        accent: '#304f70',
        'accent-light': '#4b6989',
        'accent-dark': '#1d3a59',
        'accent-gradient': '#776fff',
        accent2: '#ec2730',
        'accent2-light': '#ec2730',
        'accent2-dark': '#ec2730',
        accent3: '#222222',
        'accent3-light': '#222222',
        'accent3-dark': '#222222',
        accent4: '#61768a',
        'accent4-light': '#61768a',
        'accent4-dark': '#61768a',
        accent5: '#999999',
        'accent5-light': '#999999',
        'accent5-dark': '#999999',
        disabled: '#936f4d',
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
