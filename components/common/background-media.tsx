import { ReactNode, ElementType, ReactElement } from 'react';
import classNames from 'classnames';
import React from 'react';
import { styleStringToObject } from '@utils/tools';

interface ScrollingImage {
  src: string; // The image source URL
  width?: string | number; // Width as a string or number
  height?: string | number; // Height as a string or number
  className?: string; // Additional classes for styling
  style?: string; // Inline styles as a string or object
  srcSet?: string; // For responsive images
  sizes?: string; // Sizes attribute for responsive images
  alt?: string; // Alt text for the image
  title?: string; // Title attribute for the image
}

export const BackgroundMedia = ({
  className,
  wpBlockCover = {},
  opacity = 'bg-black/30',
}: {
  className?: string;
  wpBlockCover: Record<string, any>;
  opacity?: string | null;
}) => {
  let videoSrc: string | null =
    wpBlockCover?.wpBlockCoverVideoBackground?.src || null;
  const backgroundStyle: any = wpBlockCover?.wpBlockCoverImageBackground?.style
    ? styleStringToObject(wpBlockCover.wpBlockCoverImageBackground.style)
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
          'w-full object-cover object-center h-full absolute inset-0',
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
  } else if (scrollingImage && scrollingImage.width) {
    background = (
      <img
        className={classNames(
          'w-full box-border absolute inset-0 object-cover h-full object-center',
          className
        )}
        loading="lazy"
        src={scrollingImage.src}
        style={styleStringToObject(scrollingImage.style)}
        width={scrollingImage.width ? Number(scrollingImage.width) : undefined}
        height={
          scrollingImage.height ? Number(scrollingImage.height) : undefined
        }
        srcSet={scrollingImage.srcSet}
        sizes={scrollingImage.sizes}
        alt={scrollingImage.alt}
        title={scrollingImage.title}
      />
    );
  } else if (fixedImage) {
    background = (
      <div
        className={classNames(
          'absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed',
          className
        )}
        style={{
          backgroundImage: fixedImage,
        }}
      ></div>
    );
  }
  return (
    <>
      {background}
      <div
        className={classNames('absolute inset-0 h-full w-full', opacity)}
      ></div>
    </>
  );
};
