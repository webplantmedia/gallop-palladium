import {
  tailwindGetAlignClasses,
  hasExactClass,
  castToHTMLAttributeProps,
} from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import React from 'react';
import { BlockProps } from '@lib/types';
import classNames from 'classnames';

import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const CoreCover = ({ node, className, options }: BlockProps) => {
  className = tailwindGetAlignClasses(className);

  let content: React.ReactElement | null = null;
  let img: React.ReactElement | null = null;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className: classes } = props;

        if (hasExactClass(classes, 'wp-block-cover__image-background')) {
          if (props?.style?.backgroundImage) {
            img = (
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed"
                style={{
                  backgroundImage: props.style.backgroundImage,
                }}
              ></div>
            );
          } else if (props?.src) {
            img = (
              <img
                className={classNames(
                  props.className,
                  'max-w-full box-border absolute inset-0 object-cover h-full object-center grayscale'
                )}
                loading="lazy"
                src={props.src}
                style={props.style}
                width={parseInt(props.width)}
                height={parseInt(props.height)}
                srcSet={props.srcSet}
                sizes={props.sizes}
                alt={props.alt}
                title={props.title}
              />
            );
          }
        } else if (
          hasExactClass(classes, 'wp-block-cover__inner-container') &&
          !content
        ) {
          content = <>{domToReact(domNode.children as DOMNode[], options)}</>;
          return <></>; //this prevents recursion
        }
      }
    },
  };

  domToReact(node?.children as DOMNode[], op);

  return (
    <div
      className={classNames(
        'wp-block-cover relative flex items-center justify-center',
        className
      )}
    >
      {img}
      <span className="absolute inset-0 h-full bg-primary-main/80"></span>
      <div className="box-content px-4 sm:px-8 relative z-10 py-32 lg:py-44 max-w-[980px] [&>*:last-child]:mb-0 [&>*:first-child]:mt-0 [&>*]:!text-white">
        {content}
      </div>
    </div>
  );
};
