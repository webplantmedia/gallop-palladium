import { getVarsFromNode2, replaceWordPressUrl } from '@utils/tools';
import Script from 'next/script';
import type { Metadata } from 'next';
import { SEO } from '@lib/types';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import GetBreadcrumbsList from './breadcrumbs';
import GetAddressList from './address-list';

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
  vars,
}: any) {
  let breadcrumbsList = GetBreadcrumbsList(seo, breadcrumbs, 'breadcrumbs');
  let childrenList = GetBreadcrumbsList(seo, nodes, 'children');
  let addressList = GetAddressList(vars);

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

  if (Object.keys(vars).length !== 0) {
    schema['@graph'].push(addressList);
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
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        return (
          <PageStructuredData
            seo={meta}
            vars={getVarsFromNode2(domNode)}
            breadcrumbs={breadcrumbs}
            nodes={nodes}
          />
        );
      }
    },
  };

  const structuredData = parse(schema.postContent, options);

  return structuredData;
}
