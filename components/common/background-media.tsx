import { ReactElement } from 'react';
import classNames from 'classnames';
import React from 'react';
import { styleStringToObject } from '@utils/tools';
import * as Missing from '@components/global/missing';

interface ScrollingImage {
  _src: string; // The image source URL
  _width?: string | number; // Width as a string or number
  _height?: string | number; // Height as a string or number
  _className?: string; // Additional classes for styling
  _style?: string; // Inline styles as a string or object
  _srcSet?: string; // For responsive images
  _sizes?: string; // Sizes attribute for responsive images
  _alt?: string; // Alt text for the image
  _title?: string; // Title attribute for the image
}

export const BackgroundMedia = ({
  className,
  loading = 'eager',
  wpBlockCover = {},
  attr = {},
  grayscale = false,
  forceSelection = true,
}: {
  className?: string;
  loading?: 'lazy' | 'eager' | 'auto' | undefined;
  wpBlockCover?: Record<string, any>;
  attr?: Record<string, any>;
  grayscale?: boolean;
  forceSelection?: boolean;
}) => {
  let videoSrc: string | null =
    wpBlockCover?.wpBlockCoverVideoBackground?._src || null;
  const backgroundStyle: any = wpBlockCover?.wpBlockCoverImageBackground?._style
    ? styleStringToObject(wpBlockCover.wpBlockCoverImageBackground._style)
    : {};
  let fixedImage: string | null = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : null;
  let scrollingImage: ScrollingImage | null =
    wpBlockCover?.wpBlockCoverImageBackground || {};

  let background: ReactElement | null = null;
  if (videoSrc) {
    background = (
      <video
        className={classNames(
          'w-full object-cover object-center h-full absolute inset-0 -z-20',
          className
        )}
        autoPlay
        muted
        loop
        playsInline
        src={videoSrc}
        data-object-fit="cover"
      ></video>
    );
  } else if (scrollingImage && scrollingImage?._width) {
    background = (
      <img
        className={classNames(
          'w-full box-border absolute inset-0 object-cover h-full object-center -z-20',
          grayscale && 'grayscale',
          className
        )}
        loading={loading}
        src={scrollingImage._src}
        style={styleStringToObject(scrollingImage._style)}
        width={
          scrollingImage._width ? Number(scrollingImage._width) : undefined
        }
        height={
          scrollingImage._height ? Number(scrollingImage._height) : undefined
        }
        srcSet={scrollingImage._srcSet}
        // sizes={scrollingImage._sizes}
        alt={scrollingImage._alt}
        title={scrollingImage._title}
      />
    );
  } else if (fixedImage) {
    background = (
      <div
        className={classNames(
          'absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed -z-20',
          className
        )}
        style={{
          backgroundImage: fixedImage,
        }}
      ></div>
    );
  } else if (Object.keys(attr).length > 0) {
    background = (
      <img
        className={classNames(
          'w-full box-border absolute inset-0 object-cover h-full object-center -z-20',
          className
        )}
        loading={loading}
        src={attr.src}
        style={
          typeof attr.style === 'string'
            ? styleStringToObject(attr.style)
            : attr.style
        }
        width={attr.width ? Number(attr.width) : undefined}
        height={attr.height ? Number(attr.height) : undefined}
        srcSet={attr.srcSet}
        // sizes={attr.sizes}
        alt={attr.alt}
        title={attr.title}
      />
    );
  } else if (forceSelection === true) {
    attr = Missing.BackgroundMedia();
    return (
      <img
        className={classNames(
          'w-full box-border absolute inset-0 object-cover h-full object-center -z-20',
          className
        )}
        loading={loading}
        src={attr.src}
        width={attr.width ? Number(attr.width) : undefined}
        height={attr.height ? Number(attr.height) : undefined}
        srcSet={attr.srcSet}
        // sizes={attr.sizes}
        alt={attr.alt}
        title={attr.title}
      />
    );
  }
  return background;
};
