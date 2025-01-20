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

export type ContainerWidths = 'wide' | 'content' | '' | undefined;

export type ComponentElements =
  | 'div'
  | 'section'
  | 'article'
  | 'ul'
  | 'ol'
  | undefined;

export type HeadingElements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | undefined;

export const ValidHeadingElements: HeadingElements[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];
export type HeadingAccentElements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | undefined;

export type AlignOptions =
  | 'right'
  | 'center'
  | 'left'
  | 'wide'
  | 'full'
  | 'content'
  | 'none'
  | ''
  | undefined;

export type JustifyOptions =
  | 'justify-center'
  | 'justify-start'
  | 'justify-end'
  | ''
  | undefined;

export type TextAlignOptions =
  | 'text-left'
  | 'text-center'
  | 'text-right'
  | ''
  | undefined;

export type DefaultAlign = 'content' | 'none' | '' | undefined;
