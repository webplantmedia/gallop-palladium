import { CSSProperties } from 'react';

export interface SEOGraphImageDetails {
  height: number;
  width: number;
}
export interface SEOGraphImage {
  mediaItemUrl: string;
  mediaDetails: SEOGraphImageDetails;
  mediaType: string;
  mimeType: string;
}
export interface SEO {
  canonical: string;
  metaDesc: string;
  opengraphAuthor: string;
  opengraphDescription: string;
  metaRobotsNofollow: string;
  metaRobotsNoindex: string;
  metaKeywords: string;
  opengraphImage: SEOGraphImage;
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  title: string;
  opengraphTitle: string;
  opengraphSiteName: string;
  opengraphUrl: string;
  readingTime: number;
  opengraphType: string;
  opengraphPublisher: string;
}
export interface HTMLAttributeProps {
  href: string;
  id: string;
  className: string;
  src: string;
  style: CSSProperties;
  srcSet: string;
  sizes: string;
  alt: string;
  title: string;
  width: string;
  height: string;
  [key: string]: string | boolean | CSSProperties;
}
