import type { Metadata } from 'next';
import Content from '@components/content';
import {
  fetchPost,
  fetchSiteElements,
  getBreadcrumbs,
  getPagesAll,
} from '@api';
import {
  getVarsFromNode2,
  replaceWordPressUrl,
  replaceWordPressUrlRelative,
} from '@utils/tools';
import { PageSeo, PageStructuredData } from '@components/seo/page';
import { notFound, permanentRedirect } from 'next/navigation';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';

export const revalidate = 3600;

export async function generateStaticParams() {
  if (process.env.RUN_STATIC_PARAMS !== 'true') {
    // If not in production, return an empty array or some default data
    return [];
  }

  let { data } = await getPagesAll();

  const slugs =
    data
      ?.map((item: any) => {
        const slug = replaceWordPressUrlRelative(item);
        if (slug && slug !== '/') {
          return { slug: slug.split('/').filter(Boolean) };
        }
      })
      .filter(Boolean) || null;

  return slugs;
}

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

  if (!post || !meta) {
    notFound();
  }

  const { sidebarHeader } = await fetchSiteElements();
  let { data } = await getBreadcrumbs(post?.ID);
  const site = await fetchSiteElements();

  let node = data[0];
  data = data.reverse();

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        return (
          <PageStructuredData
            seo={meta}
            breadcrumbs={data || []}
            nodes={node && node.children}
            vars={getVarsFromNode2(domNode)}
          />
        );
      }
    },
  };
  const structuredData = parse(site.schema.postContent, options);

  return (
    <>
      {structuredData}
      <Content
        post={post}
        meta={meta}
        sidebarHeader={sidebarHeader}
        breadcrumbs={data || []}
      />
    </>
  );
}
