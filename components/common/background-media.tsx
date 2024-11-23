import { ReactNode, ElementType, ReactElement } from 'react';
import classNames from 'classnames';
import React from 'react';
import { styleStringToObject } from '@utils/tools';

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
  wpBlockCover = {},
}: {
  className?: string;
  wpBlockCover: Record<string, any>;
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
          className
        )}
        loading="lazy"
        src={scrollingImage._src}
        style={styleStringToObject(scrollingImage._style)}
        width={
          scrollingImage._width ? Number(scrollingImage._width) : undefined
        }
        height={
          scrollingImage._height ? Number(scrollingImage._height) : undefined
        }
        srcSet={scrollingImage._srcSet}
        sizes={scrollingImage._sizes}
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
  }
  return background;
};
