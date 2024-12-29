import { attributesToProps } from 'html-react-parser';
import { HTMLAttributeProps } from '@lib/types';
import { CSSProperties } from 'react';

// Utility function to convert kebab-case to camelCase
function toCamelCase(key: string): string {
  return key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export function castToHTMLAttributeProps(props: any): HTMLAttributeProps {
  props = attributesToProps(props);

  const handledKeys = [
    'src',
    'id',
    'style',
    'srcSet',
    'sizes',
    'alt',
    'title',
    'width',
    'height',
    'href',
    'className',
  ];

  const additionalProps = Object.fromEntries(
    Object.entries(props)
      .filter(([key]) => !handledKeys.includes(key)) // Exclude handled keys
      .map(([key, value]) => [toCamelCase(key), value]) // Convert to camelCase
  );

  return {
    src: typeof props.src === 'string' ? props.src : '',
    id: typeof props.id === 'string' ? props.id : '',
    style:
      typeof props.style === 'object' && !Array.isArray(props.style)
        ? (props.style as CSSProperties)
        : {}, // Ensure it's a valid CSSProperties object
    srcSet: typeof props.srcSet === 'string' ? props.srcSet : '',
    sizes: typeof props.sizes === 'string' ? props.sizes : '',
    alt: typeof props.alt === 'string' ? props.alt : '',
    title: typeof props.title === 'string' ? props.title : '',
    width: typeof props.width === 'string' ? props.width : '',
    height: typeof props.height === 'string' ? props.height : '',
    href: typeof props.href === 'string' ? props.href : '',
    className: typeof props.className === 'string' ? props.className : '',
    ...additionalProps,
  } as HTMLAttributeProps;
}
