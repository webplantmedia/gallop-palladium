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

export const coreCover = (
  domNode: Element,
  options: HTMLReactParserOptions
) => {
  let content: React.ReactElement | null = null;
  let imgProps: object | null = null;
  let backgroundImage: string | null = null;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-cover__image-background')) {
          if (props?.style?.backgroundImage) {
            backgroundImage = props.style.backgroundImage;
          } else if (props?.src) {
            imgProps = props;
          }
          return <></>;
        } else if (hasExactClass(className, 'has-play-video')) {
        } else if (
          hasExactClass(className, 'wp-block-cover__inner-container') &&
          !content
        ) {
          content = <>{domToReact(domNode.children as DOMNode[], options)}</>;
          return <></>; //this prevents recursion
        }
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return { imgProps, content, backgroundImage };
};

const CoreCoverHero = ({ data, className }: any) => {
  const { imgProps, content, backgroundImage } = data;

  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames(
        'wp-block-cover relative flex items-center justify-center',
        className
      )}
    >
      {imgProps && (
        <>
          <img
            className={classNames(
              imgProps.className,
              'max-w-full box-border absolute inset-0 object-cover h-full object-center'
            )}
            loading="lazy"
            src={imgProps.src}
            style={imgProps.style}
            width={parseInt(imgProps.width)}
            height={parseInt(imgProps.height)}
            srcSet={imgProps.srcSet}
            sizes={imgProps.sizes}
            alt={imgProps.alt}
            title={imgProps.title}
          />
          <span className="absolute inset-0 h-full bg-black/70"></span>
        </>
      )}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed grayscale"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <span className="absolute inset-0 h-full bg-black/70"></span>
        </>
      )}
      <div className="box-content px-4 sm:px-8 relative z-10 py-32 lg:py-44 max-w-[980px] [&>*:last-child]:mb-0 [&>*:first-child]:mt-0 [&>*]:!text-white w-full">
        {content}
      </div>
    </div>
  );
};

export const CoreCoverDefault = ({ data, className }: any) => {
  const { imgProps, content, backgroundImage } = data;

  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames(
        'wp-block-cover relative flex items-center justify-center',
        className
      )}
    >
      {imgProps && (
        <>
          <img
            className={classNames(
              imgProps.className,
              'max-w-full box-border absolute inset-0 object-cover h-full object-center grayscale'
            )}
            loading="lazy"
            src={imgProps.src}
            style={imgProps.style}
            width={parseInt(imgProps.width)}
            height={parseInt(imgProps.height)}
            srcSet={imgProps.srcSet}
            sizes={imgProps.sizes}
            alt={imgProps.alt}
            title={imgProps.title}
          />
          <span className="absolute inset-0 h-full bg-primary-main/80"></span>
        </>
      )}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed grayscale"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <span className="absolute inset-0 h-full bg-primary-main/80"></span>
        </>
      )}
      <div className="box-content px-4 sm:px-8 relative z-10 py-32 lg:py-44 max-w-[980px] [&>*:last-child]:mb-0 [&>*:first-child]:mt-0 [&>*]:!text-white w-full">
        {content}
      </div>
    </div>
  );
};

export const CoreCover = ({ data, className }: any) => {
  if (className?.includes('is-style-hero')) {
    return <CoreCoverHero data={data} className={className} />;
  }

  return <CoreCoverDefault data={data} className={className} />;
};
