import { attributesToProps } from 'html-react-parser';
import { HTMLAttributeProps } from '@lib/types';
import { CSSProperties } from 'react';

export function castToHTMLAttributeProps(props: any): HTMLAttributeProps {
  props = attributesToProps(props);
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
    ...props,
  } as HTMLAttributeProps;
}
