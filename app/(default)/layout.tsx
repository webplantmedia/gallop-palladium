import localFont from 'next/font/local';
import '@styles/index.css';
import Container from '@components/container';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import UseWindowHeightScript from '@components/scripts/use-window-height';
import FooterScripts from '@components/scripts/footer-scripts';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(String(process.env.PRODUCTION_URL)),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': 30,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const revalidate = 86400;
// export const revalidate = process.env.RUN_STATIC_PARAMS == 'true' ? 86400 : 0;

// export const dynamic =
// process.env.RUN_STATIC_PARAMS == 'true' ? 'auto' : 'force-dynamic';

// export const revalidate = 3600;
export const dynamicParams = true;

const fontBody = localFont({
  src: [
    {
      path: '../../styles/fonts/Urbanist-ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-ExtraBoldItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/Urbanist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/Urbanist-SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-SemiBoldItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/Urbanist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/Urbanist-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/Urbanist-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-ExtraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../styles/fonts/Urbanist-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Urbanist-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
});

const fontAccent = fontBody;

interface RootLayoutProps {
  children: React.ReactNode;
}

const bodyStyle = {
  ['--font-body' as string]: fontBody.style.fontFamily,
  ['--font-accent' as string]: fontAccent.style.fontFamily,
};

export default function RootLayout({ children }: RootLayoutProps) {
  const track = process.env.TRACK_ANALYTICS === 'true' ? true : false;

  return (
    <html lang="en">
      <body className="font-body bg-base-body text-base" style={bodyStyle}>
        <div className="min-h-screen">
          <main>
            <Container>
              <Navbar sidebarContent="default" />
              {children}
            </Container>
          </main>
        </div>
        <Footer />
        <UseWindowHeightScript />
      </body>
      {track && (
        <>
          <GoogleAnalytics gaId="" />
          <FooterScripts />
        </>
      )}
    </html>
  );
}
