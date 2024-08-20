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
import { compressContent } from '@utils/tools';

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

  let menu, footer, mobileMenu, topMenu, callToAction, logo;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/site-element/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      next: { tags: ['site-element'] },
    }
  );

  if (response.ok) {
    const jsonResponse = await response.json();
    ({
      menu,
      'top-menu': topMenu,
      'call-to-action': callToAction,
      footer,
      logo,
      'mobile-menu': mobileMenu,
    } = jsonResponse);
    if (menu?.post_content) {
      menu.post_content = compressContent(menu.post_content);
    }

    if (footer?.post_content)
      footer.post_content = compressContent(footer.post_content);

    if (mobileMenu?.post_content)
      mobileMenu.post_content = compressContent(mobileMenu.post_content);

    if (topMenu?.post_content)
      topMenu.post_content = compressContent(topMenu.post_content);

    if (callToAction?.post_content)
      callToAction.post_content = compressContent(callToAction.post_content);

    if (logo?.post_content)
      logo.post_content = compressContent(logo.post_content);
  }

  return (
    <html lang="en">
      <body className="font-body bg-base-body text-base" style={bodyStyle}>
        <div className="min-h-screen">
          <main>
            <Container>
              <Navbar
                sidebarContent="default"
                menu={menu}
                topMenu={topMenu}
                callToAction={callToAction}
                logo={logo}
              />
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
