import {
  getVarsFromNode2,
  replaceWordPressUrl,
  castToHTMLAttributeProps,
  hasExactClass,
} from '@utils/tools';
import Script from 'next/script';
import type { Metadata } from 'next';
import { SEO } from '@lib/types';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import GetBreadcrumbsList from './breadcrumbs';
import { HTMLAttributeProps } from '@lib/types';
import GetList from './get-list';

export function PageSeo(seo: SEO, link: string = '', site: any) {
  var data: Metadata = {};

  if (seo?.title) data.title = parse(seo.title).toString();

  if (seo?.metaDesc) data.description = seo.metaDesc;

  data.alternates = { canonical: replaceWordPressUrl(link) };

  data.generator = 'Next.js';

  if (seo?.opengraphType) {
    data.openGraph = {
      type: 'article',
      // type: seo.opengraphType, // generates TS error event though value is article
    };

    if (seo?.opengraphTitle)
      data.openGraph.title = parse(seo.opengraphTitle).toString();

    if (seo?.opengraphDescription)
      data.openGraph.description = seo.opengraphDescription;

    data.openGraph.locale = 'en_US';

    if (seo?.opengraphUrl)
      data.openGraph.url = replaceWordPressUrl(seo.opengraphUrl);

    if (seo?.opengraphPublishedTime)
      data.openGraph.publishedTime = seo.opengraphPublishedTime;

    if (seo?.opengraphModifiedTime)
      data.openGraph.modifiedTime = seo.opengraphModifiedTime;

    data.openGraph.authors = [site.siteAuthor];

    if (seo?.opengraphSiteName)
      data.openGraph.siteName = parse(seo.opengraphSiteName).toString();

    if (seo?.opengraphImage?.mediaItemUrl) {
      data.openGraph.images = {
        url: seo.opengraphImage.mediaItemUrl,
      };

      if (
        seo?.opengraphImage?.mediaDetails?.height &&
        seo?.opengraphImage?.mediaDetails?.width
      ) {
        data.openGraph.images.width = seo.opengraphImage.mediaDetails.width;
        data.openGraph.images.height = seo.opengraphImage.mediaDetails.height;
      }

      if (seo?.opengraphImage?.mediaType)
        data.openGraph.images.type = seo.opengraphImage.mediaType;
    }
  }

  return data;
}

export function PageStructuredData({
  seo,
  breadcrumbs = [],
  nodes = [],
  schemaList,
}: any) {
  let breadcrumbsList = GetBreadcrumbsList(seo, breadcrumbs, 'breadcrumbs');
  let childrenList = GetBreadcrumbsList(seo, nodes, 'children');
  let lists = schemaList.map((schema: any) => GetList(schema));

  let schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': replaceWordPressUrl(seo.opengraphUrl),
        url: replaceWordPressUrl(seo.opengraphUrl),
        name: seo.title,
        isPartOf: {
          '@id': '/#website',
        },
        inLanguage: 'en-US',
        ...(seo.opengraphImage?.mediaItemUrl && {
          primaryImageOfPage: {
            '@id': process.env.NEXT_PUBLIC_LIVE_URL + '/#primaryimage',
          },
          image: {
            '@id': process.env.NEXT_PUBLIC_LIVE_URL + '/#primaryimage',
          },
          ...(seo.opengraphImage?.mediaDetails?.sizes
            ? {
                thumbnailUrl:
                  seo.opengraphImage?.mediaDetails?.sizes[0]?.sourceUrl,
              }
            : { thumbnailUrl: seo.opengraphImage?.mediaItemUrl }),
        }),
        description: seo.opengraphDescription,
        datePublished: seo.opengraphPublishedTime,
        dateModified: seo.opengraphModifiedTime,
      },
      {
        '@type': 'WebSite',
        '@id': '/#website',
        url: process.env.NEXT_PUBLIC_LIVE_URL,
        name: seo.title,
        description: seo.metaDesc,
        inLanguage: 'en-US',
      },
    ],
  };

  if (seo.opengraphImage?.mediaItemUrl) {
    schema['@graph'].push({
      '@type': 'ImageObject',
      inLanguage: 'en-US',
      '@id': '/#primaryimage',
      url: seo.opengraphImage?.mediaItemUrl,
      contentUrl: seo.opengraphImage?.mediaItemUrl,
      width: seo.opengraphImage?.mediaDetails?.width,
      height: seo.opengraphImage?.mediaDetails?.height,
    });
  }

  if (Object.keys(breadcrumbsList).length !== 0) {
    schema['@graph'].push(breadcrumbsList);
  }

  if (Object.keys(childrenList).length !== 0) {
    schema['@graph'].push(childrenList);
  }

  if (Object.keys(lists).length !== 0) {
    schema['@graph'] = [...schema['@graph'], ...lists];
  }

  return (
    <Script id="schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}

export function StructuredData({
  meta,
  schema,
  breadcrumbs = [],
  nodes = [],
}: any) {
  let schemaList: any[] = [];

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );

        let { className } = props;

        if (hasExactClass(className, 'wp-block-gallop-schema')) {
          const vars = getVarsFromNode2(domNode);
          if (Object.keys(vars).includes('wpBlockList')) schemaList.push(vars);
        }
      }
    },
  };

  parse(schema.postContent, options);

  return (
    <PageStructuredData
      seo={meta}
      schemaList={schemaList}
      breadcrumbs={breadcrumbs}
      nodes={nodes}
    />
  );
}
