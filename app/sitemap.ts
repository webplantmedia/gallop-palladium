import { getPageSlugsAll, getPostSlugsAll } from '@api';
import { replaceWordPressUrl2 } from '@utils/tools';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function generateSitemaps() {
  const sitemaps = [{ id: 'post' }, { id: 'page' }];
  return sitemaps;
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  var resolvedMaps: any;
  if (id == 'post') {
    const { postSlugs } = await getPostSlugsAll();
    var postMaps: any;
    if (Array.isArray(postSlugs)) {
      postMaps = postSlugs.map(
        async (item: { slug: string; modified: any; uri: string }) => ({
          url: `${replaceWordPressUrl2(item.uri)}`,
          lastModified: new Date(item.modified),
          changeFrequency: 'daily',
        })
      );
    }

    resolvedMaps = await Promise.all(postMaps);
  } else if (id == 'page') {
    const { pageSlugs } = await getPageSlugsAll();
    var pageMaps: any;
    if (Array.isArray(pageSlugs)) {
      pageMaps = pageSlugs.map(
        async (item: { slug: string; modified: any; uri: string }) => ({
          url: `${replaceWordPressUrl2(item.uri)}`,
          lastModified: new Date(item.modified),
          changeFrequency: 'daily',
        })
      );
    }

    resolvedMaps = await Promise.all(pageMaps);
  }

  return [...resolvedMaps];
}
