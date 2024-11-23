import { ReactNode, ElementType, ReactElement } from 'react';
import classNames from 'classnames';
import React from 'react';
import { styleStringToObject } from '@utils/tools';

interface ImgProps {
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
  videoSrc = null,
  imgProps = null,
  backgroundImageCss = null,
  opacity = 'bg-black/30',
}: {
  className?: string;
  videoSrc?: string | null;
  imgProps?: ImgProps | null;
  backgroundImageCss?: string | null;
  opacity?: string | null;
}) => {
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
  } else if (imgProps && imgProps.width) {
    background = (
      <img
        className={classNames(
          'w-full box-border absolute inset-0 object-cover h-full object-center',
          className
        )}
        loading="lazy"
        src={imgProps.src}
        style={styleStringToObject(imgProps.style)}
        width={imgProps.width ? Number(imgProps.width) : undefined}
        height={imgProps.height ? Number(imgProps.height) : undefined}
        srcSet={imgProps.srcSet}
        sizes={imgProps.sizes}
        alt={imgProps.alt}
        title={imgProps.title}
      />
    );
  } else if (backgroundImageCss) {
    background = (
      <div
        className={classNames(
          'absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed',
          className
        )}
        style={{
          backgroundImage: backgroundImageCss,
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
