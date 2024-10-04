import { compressContent } from '@utils/tools';

export async function fetchSiteElements() {
  let menu: any = null,
    footer: any = null,
    mobileMenu: any = null,
    topMenu: any = null,
    callToAction: any = null,
    logo: any = null,
    stickyLogo: any = null,
    sidebar: any = null,
    sidebarHeader: any = null,
    site: any = null;

  const headers = {
    'Content-Type': 'application/json',
  };

  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/site-element/`;

  const response = await fetch(url, {
    headers,
    method: 'POST',
    next: { revalidate: 60, tags: ['site-element'] },
  });
  // console.log(response.headers);

  if (response.ok) {
    const jsonResponse = await response.json();
    ({
      menu,
      'top-menu': topMenu,
      'call-to-action': callToAction,
      footer,
      logo,
      sidebar,
      site,
      'mobile-menu': mobileMenu,
      'sticky-logo': stickyLogo,
      'sidebar-header': sidebarHeader,
    } = jsonResponse);

    if (menu && 'postContent' in menu) {
      menu.postContent = compressContent(menu.postContent);
    }

    if (footer?.postContent) {
      footer.postContent = compressContent(footer.postContent);
    }

    if (mobileMenu?.postContent)
      mobileMenu.postContent = compressContent(mobileMenu.postContent);

    if (topMenu?.postContent)
      topMenu.postContent = compressContent(topMenu.postContent);

    if (callToAction?.postContent)
      callToAction.postContent = compressContent(callToAction.postContent);

    if (logo?.postContent) logo.postContent = compressContent(logo.postContent);

    if (stickyLogo?.postContent)
      stickyLogo.postContent = compressContent(stickyLogo.postContent);

    if (sidebar?.postContent)
      sidebar.postContent = compressContent(sidebar.postContent);

    if (sidebarHeader?.postContent)
      sidebarHeader.postContent = compressContent(sidebarHeader.postContent);
  }

  return {
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
  };
}
