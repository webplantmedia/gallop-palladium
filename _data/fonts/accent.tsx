import localFont from 'next/font/local';

export const _accentFont = localFont({
  src: [
    {
      path: '../../styles/fonts/OpenSans/OpenSans-ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-ExtraBoldItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-SemiBoldItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/OpenSans/OpenSans-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
  ],
});
