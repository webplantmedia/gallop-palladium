import type { Metadata } from 'next';
import Content from '@components/content';
import { PageSeo, PageStructuredData } from '@components/seo/page';
import { getVarsFromNode2, replaceWordPressUrl } from '@utils/tools';
import { fetchPost, fetchSiteElements, getBreadcrumbs } from '@api';
import { notFound, permanentRedirect } from 'next/navigation';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';

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
  const site = await fetchSiteElements();

  if (!post && !meta) {
    notFound();
  }

  const { sidebarHeader } = await fetchSiteElements();

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        return (
          <PageStructuredData seo={meta} vars={getVarsFromNode2(domNode)} />
        );
      }
    },
  };
  const structuredData = parse(site.schema.postContent, options);

  return (
    <>
      {structuredData}
      <Content post={post} meta={meta} sidebarHeader={sidebarHeader} />
    </>
  );
}
