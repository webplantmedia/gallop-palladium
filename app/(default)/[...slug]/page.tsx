import type { Metadata } from 'next';
import Content from '@components/content';
import Grid from '@components/grid';
import { fetchPost, fetchSiteElements } from '@api';
import { replaceWordPressUrl } from '@utils/tools';
import { PageSeo } from '@components/seo/page';

export const revalidate = 3600;

type Params = Promise<{ slug: Array<string> }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const uri = `/${params.slug.join('/')}/`;

  const { meta, site } = await fetchPost(uri);

  if (meta && site) {
    site.permalink = replaceWordPressUrl(site.permalink);
    return PageSeo(meta, site.permalink, site);
  }

  return {};
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const uri = `/${params.slug.join('/')}/`;
  const { post, meta } = await fetchPost(uri);
  const { sidebarHeader } = await fetchSiteElements();

  return <Content post={post} meta={meta} sidebarHeader={sidebarHeader} />;
}
