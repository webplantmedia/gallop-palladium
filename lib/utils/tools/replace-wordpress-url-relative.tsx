export function replaceWordPressUrlRelative(link: string) {
  const domainsToReplace = [
    process.env.NEXT_PUBLIC_WORDPRESS_URL, // First domain from environment variable
    'https://dougnewby.com',
    'https://stgdougnewby.wpengine.com',
    'https://beta.dougnewby.com',
    'https://staging.dougnewby.com',
  ];

  // Check if link is defined and replace each domain found in domainsToReplace
  if (link) {
    domainsToReplace.forEach((domain) => {
      if (domain) {
        link = link.replaceAll(domain, '');
      }
    });
  }
  return link;
}
