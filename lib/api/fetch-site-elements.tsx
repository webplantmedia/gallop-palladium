import { compressContent } from '@utils/tools';

export async function fetchSiteElements() {
  let menu: any = null,
    footer: any = null,
    mobileMenu: any = null,
    topMenu: any = null,
    callToAction: any = null,
    logo: any = null,
    sidebar: any = null,
    sidebarHeader: any = null;

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
      sidebar,
      'mobile-menu': mobileMenu,
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
    sidebar,
    sidebarHeader,
  };
}
