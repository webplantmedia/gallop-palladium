export const dynamic = 'force-static';
export const revalidate = 86400;

const mapRowToUrl = (item: any) =>
  `<sitemap><loc>${`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap/${item.id}.xml`}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`;

const sitemapToXml = (sitemap: any) =>
  `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap
    .map(mapRowToUrl)
    .join('\n')}</sitemapindex>`;

export async function GET() {
  const sitemaps = [{ id: 'post' }, { id: 'page' }];
  const sitemapXml = sitemapToXml(sitemaps);

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=10',
    },
  });
}
