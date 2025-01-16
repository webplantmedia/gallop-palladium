import { CSSProperties } from 'react';
import { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser';
import { HTMLAttributeProps as HTMLAttrProps } from '@lib/types';
import { ReactNode } from 'react';

export interface SEOGraphImageDetails {
  height: number;
  width: number;
}
export interface SEOGraphImage {
  mediaItemUrl: string;
  mediaDetails: SEOGraphImageDetails;
  mediaType: string;
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
  srcSet: string; // Ensure srcSet is either a string or undefined
  sizes: string;
  alt: string;
  title: string;
  width: string;
  height: string;
  [key: string]: any; // Keep other dynamic props flexible
}

export interface BlockProps {
  node?: Element;
  data?: any;
  className?: string;
  children?: ReactNode;
  tag?: string;
  parentTag?: string | undefined;
  options?: HTMLReactParserOptions;
  props?: HTMLAttrProps;
}
