import type { Metadata } from 'next';
import Content from '@components/content';
import { PageSeo, PageStructuredData } from '@components/seo/page';
import { replaceWordPressUrl } from '@utils/tools';
import { fetchPost, fetchSiteElements, getBreadcrumbs } from '@api';
import { notFound, permanentRedirect } from 'next/navigation';

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const uri = '/home/';

  const { meta, site } = await fetchPost(uri);

  if (meta && site) {
    site.permalink = replaceWordPressUrl(site.permalink).replace('/home/', '/');
    return PageSeo(meta, site.permalink, site);
  }
  return {};
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const uri = '/home/';

  const { post, meta } = await fetchPost(uri);

  if (!post && !meta) {
    notFound();
  }

  const { sidebarHeader } = await fetchSiteElements();

  return (
    <>
      <PageStructuredData seo={meta} />
      <Content post={post} meta={meta} sidebarHeader={sidebarHeader} />;
    </>
  );
}
