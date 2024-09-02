import { replaceWordPressUrl } from '@utils/tools';
import { _siteTitle, _siteDescription, _siteAuthor } from '@data/_general';
import Script from 'next/script';
// import GetBreadcrumbList from './breadcrumbs';
import type { Metadata } from 'next';
import { SEO } from '@lib/types';

export function PageSeo(seo: SEO, link: string = '') {
  var data: Metadata = {};

  if (seo?.title) data.title = seo.title;

  if (seo?.metaDesc) data.description = seo.metaDesc;

  data.alternates = { canonical: replaceWordPressUrl(link) };

  data.generator = 'Next.js';

  if (seo?.opengraphType) {
    data.openGraph = {
      type: 'article',
      // type: seo.opengraphType, // generates TS error event though value is article
    };

    if (seo?.opengraphTitle) data.openGraph.title = seo.opengraphTitle;

    if (seo?.opengraphDescription)
      data.openGraph.description = seo.opengraphDescription;

    data.openGraph.locale = 'en_US';

    if (seo?.opengraphUrl)
      data.openGraph.url = replaceWordPressUrl(seo.opengraphUrl);

    if (seo?.opengraphPublishedTime)
      data.openGraph.publishedTime = seo.opengraphPublishedTime;

    if (seo?.opengraphModifiedTime)
      data.openGraph.modifiedTime = seo.opengraphModifiedTime;

    if (seo?.opengraphSiteName) data.openGraph.siteName = seo.opengraphSiteName;
    data.openGraph.authors = [_siteAuthor];

    if (seo?.opengraphSiteName) data.openGraph.siteName = seo.opengraphSiteName;

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

export function PageStructuredData({ seo }) {
  // let breadcrumbList = GetBreadcrumbList(seo, meta);

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
        name: _siteTitle,
        description: _siteDescription,
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

  // if (Object.keys(breadcrumbList).length !== 0) {
  // schema['@graph'].push(breadcrumbList);
  // }

  return (
    <Script id="schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}
