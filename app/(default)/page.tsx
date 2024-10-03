import type { Metadata } from 'next';
import Content from '@components/content';
import { PageSeo } from '@components/seo/page';
import { replaceWordPressUrl } from '@utils/tools';
import { fetchSiteElements } from '@api/fetch-site-elements';
import { fetchPost } from '@api';

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const uri = '/home/';

  const { meta, site } = await fetchPost(uri);

  if (meta && site) {
    site.permalink = replaceWordPressUrl(site.permalink).replace('/home/', '/');
    return PageSeo(meta, site.permalink, site);
  }
  return {};
}

export default async function Page({ params }: Props) {
  const uri = '/home/';

  const { sidebarHeader } = await fetchSiteElements();
  const { post, meta } = await fetchPost(uri);

  console.log('POST', post);

  return <Content post={post} meta={meta} sidebarHeader={sidebarHeader} />;
}
