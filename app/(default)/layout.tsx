import { _bodyFont } from '@data/fonts/body';
import { _accentFont } from '@data/fonts/accent';
import { _headingFont } from '@data/fonts/heading';
import '@styles/index.css';
import Container from '@components/container';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import UseWindowHeightScript from '@components/scripts/use-window-height';
import FooterScripts from '@components/scripts/footer-scripts';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import GridFull from '@components/grid-full';
import { fetchSiteElements } from '@api/fetch-site-elements';

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

interface RootLayoutProps {
  children: React.ReactNode;
}

const bodyStyle = {
  ['--font-body' as string]: _bodyFont.style.fontFamily,
  ['--font-heading' as string]: _headingFont.style.fontFamily,
  ['--font-accent' as string]: _accentFont.style.fontFamily,
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const track = process.env.TRACK_ANALYTICS === 'true' ? true : false;

  const {
    menu,
    footer,
    mobileMenu,
    topMenu,
    callToAction,
    logo,
    stickyLogo,
    sidebar,
    sidebarHeader,
    site,
    aiChat,
    websiteSearch,
  } = await fetchSiteElements();

  return (
    <html lang="en">
      <body className="font-body bg-base-body text-base" style={bodyStyle}>
        <div className="min-h-screen">
          <main>
            <Container>
              <Navbar
                menu={menu}
                mobileMenu={mobileMenu}
                topMenu={topMenu}
                callToAction={callToAction}
                logo={logo}
                stickyLogo={stickyLogo}
                sidebar={sidebar}
                sidebarHeader={sidebarHeader}
                site={site}
                aiChat={aiChat}
                websiteSearch={websiteSearch}
              />
              <GridFull>{children}</GridFull>
            </Container>
          </main>
        </div>
        <Footer post={footer} />
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
