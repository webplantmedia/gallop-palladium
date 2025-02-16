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
  _srcset?: string; // For responsive images
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
  size = 'full',
}: {
  className?: string;
  loading?: 'lazy' | 'eager' | undefined;
  wpBlockCover?: Record<string, any>;
  attr?: Record<string, any>;
  grayscale?: boolean;
  forceSelection?: boolean;
  size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'full';
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

  const sizes = {
    thumbnail: '(max-width: 150px) 150px, 150px',
    small: '(max-width: 150px) 150px, (max-width: 384px) 384px, 768px',
    medium:
      '(max-width: 150px) 150px, (max-width: 384px) 384px, (max-width: 512px) 512px, 768px',
    large:
      '(max-width: 150px) 150px, (max-width: 384px) 384px, (max-width: 512px) 512px, (max-width: 640px) 768px, 512px',
    full: '(max-width: 150px) 150px, (max-width: 384px) 384px, (max-width: 512px) 512px, (max-width: 640px) 768px, (max-width: 1024px) 1024px, 1280px',
  };

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
        srcSet={scrollingImage._srcset}
        sizes={sizes[size]}
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
