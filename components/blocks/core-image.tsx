import React from 'react';
import { replaceWordPressUrl } from '@utils/tools';
import classNames from 'classnames';
import Link from 'next/link';
import { BlockProps } from '@lib/types';
import { castToHTMLAttributeProps, styleStringToObject } from '@utils/tools';

interface ImageBlockProps extends BlockProps {
  block?: any;
  marginClass?: string;
}

export const CoreImage = ({ className = '', data }: ImageBlockProps) => {
  const block = data;
  let style = {};
  let figureStyle: React.CSSProperties = {};

  className = className.replace(
    'alignleft',
    'alignleft md:float-left md:w-[300px] xl:w-auto md:!mr-5 mt-1.5 md:!pr-0'
  );
  className = className.replace(
    'alignright',
    'alignright md:float-right md:w-[300px] xl:w-auto md:!ml-5 mt-1.5 md:!pl-0'
  );
  var href2 = '';
  var hasImageSrcLink = false;

  if (block.a) {
    hasImageSrcLink =
      block.a.href && block.a.href.match(/\.jpe?g$|\.png$/) ? true : false;

    if (hasImageSrcLink) {
      href2 = block.a.href;
    }

    if (!hasImageSrcLink && block.a.href) {
      href2 = replaceWordPressUrl(block.a.href);
    }
  }

  if (block.a?.img?.style) {
    const styleObj = styleStringToObject(block.a.img.style);
    if (styleObj.width) {
      figureStyle.width = styleObj.width;
      figureStyle.maxWidth = '100%';
      delete styleObj.width;
      delete styleObj.height;
      styleObj.maxWidth = '100%';
      style = styleObj;
    }
  }

  if (block.img?.style) {
    const styleObj = styleStringToObject(block.img.style);
    if (styleObj.width) {
      figureStyle.width = styleObj.width;
      figureStyle.maxWidth = '100%';
      delete styleObj.width;
      delete styleObj.height;
      styleObj.maxWidth = '100%';
      style = styleObj;
    }
  }

  return (
    <figure
      className={classNames(
        'flex flex-col box-border',
        className,
        'break-inside-avoid min-w-full md:min-w-min',
        block.figcaption
          ? '[&_img]:rounded-t-sm mb-12'
          : '[&_img]:rounded-sm mb-7'
      )}
      style={figureStyle}
    >
      {block.img && (
        <img
          className={classNames(block.img.className, 'max-w-full box-border')}
          loading="lazy"
          src={block.img.src}
          width={parseInt(block.img.width)}
          height={parseInt(block.img.height)}
          srcSet={block.img.srcSet}
          sizes={block.img.sizes}
          alt={block.img.alt}
          title={block.img.title}
          style={style}
        />
      )}
      {block.a?.img && (
        <Link
          href={href2}
          prefetch={false}
          {...(block.a.target ? { target: block.a.target } : {})}
          className={classNames(
            'block',
            '[&_img]:!h-auto',
            hasImageSrcLink ? 'lightbox-content' : ''
          )}
        >
          <img
            className={classNames(
              block.a.img.className,
              'max-w-full box-border'
            )}
            loading="lazy"
            src={block.a.img.src}
            width={parseInt(block.a.img.width)}
            height={parseInt(block.a.img.height)}
            srcSet={block.a.img.srcSet}
            sizes={block.a.img.sizes}
            alt={block.a.img.alt}
            title={block.a.img.title}
            style={style}
          />
        </Link>
      )}
      {block.figcaption && (
        <figcaption
          className={classNames(
            block.figcaption.className,
            'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
          )}
        >
          {block.figcaption.jsx}
        </figcaption>
      )}
    </figure>
  );
};
