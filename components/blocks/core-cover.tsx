import Iconify from '@components/iconify';
import {
  tailwindGetAlignClasses,
  hasExactClass,
  castToHTMLAttributeProps,
  getVarsFromNode,
  getVimeoIframeSrc,
  getDomNodeText,
  styleStringToObject,
} from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { VideoPopup } from '@components/widgets/video-popup';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';
import { CoreHeading, CoreParagraph } from '@components/blocks';

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
  let content: Array<React.ReactElement> = [];
  let imgProps: object | null = null;
  let backgroundImage: string | null = null;
  let videoUrl: string | null = null;

  let index = 0;

  const op2: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;
        index++;

        if (hasExactClass(className, 'is-style-play-video')) {
          const el = getVarsFromNode(domNode);
          videoUrl = el?.wpBlockButton?.a?.href;
          return <></>;
        } else if (className?.includes('wp-block-heading')) {
          content.push(
            <CoreHeading
              key={`heading-${index}`}
              tag={domNode.name}
              className={classNames('text-white', className)}
              props={props}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreHeading>
          );
          return <></>;
        } else if (domNode.name === 'p') {
          content.push(
            <CoreParagraph
              key={`paragraph-${index}`}
              className={classNames('text-white', className)}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
          return <></>;
        }

        content.push(
          <Fragment key={`content-${index}`}>
            {domToReact([domNode] as DOMNode[], options)}
          </Fragment>
        );
        return <></>;
      }
    },
  };

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
        } else if (hasExactClass(className, 'is-style-play-video')) {
          const el = getVarsFromNode(domNode);
          videoUrl = el?.wpBlockButton?.a?.href;
        } else if (
          hasExactClass(className, 'wp-block-cover__inner-container')
        ) {
          domToReact(domNode.children as DOMNode[], op2);
        }

        return <></>;
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return { imgProps, content, backgroundImage, videoUrl };
};

export const CoreCoverHero = ({ data, className }: any) => {
  const videoUrl =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?.href ||
    '';
  const backgroundStyle = data?.wpBlockCoverImageBackground?.style
    ? styleStringToObject(data.wpBlockCoverImageBackground.style)
    : {};
  const backgroundImage = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : '';
  const imgProps = data?.wpBlockCoverImageBackground || {};
  const src = getVimeoIframeSrc(videoUrl);
  const accent = data?.wpBlockCoverInnerContainer?.h1?.text || '';
  const h1 = data?.wpBlockCoverInnerContainer?.h1?.jsx || <></>;
  const p = data?.wpBlockCoverInnerContainer?.p?.jsx || <></>;

  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames(
        'wp-block-cover relative flex items-center justify-center',
        className
      )}
    >
      {imgProps && imgProps.width && (
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
            className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <span className="absolute inset-0 h-full bg-black/70"></span>
        </>
      )}
      <div
        className={classNames(
          'box-border px-4 sm:px-8 relative z-10 py-32 lg:py-44 [&>*:last-child]:mb-0 [&>*:first-child]:mt-0 w-full',
          videoUrl ? 'max-w-screen-3xl' : 'max-w-[980px]'
        )}
      >
        <div className="flex flex-col xl:flex-row gap-20 items-center">
          <div className="xl:w-2/3 [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0 [&>.wp-block-heading+p]:xl:!mt-7 [&>.wp-block-heading]:xl:!text-left [&>p]:max-w-[750px]">
            {h1 && (
              <h1 className="mb-7 leading-tight text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                {h1}
              </h1>
            )}
            {p && (
              <p className="has-large-font-size text-xl sm:text-2xl lg:text-2xl leading-relaxed text-white">
                {p}
              </p>
            )}
          </div>
          {videoUrl && (
            <div className="xl:w-1/3 flex justify-center items-center">
              <VideoPopup
                className="relative p-2 bg-white hover:bg-white rounded-full border-2 border-white transition-colors duration-300 ease-in-out w-20 h-20 flex items-center justify-center"
                src={src}
              >
                <Iconify
                  icon={PlaySolidIcon}
                  className="flex-shrink-0 h-auto w-10 text-primary-main -mr-1"
                />
              </VideoPopup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CoreCover = ({ data, className }: any) => {
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
      <div className="box-content px-4 sm:px-8 relative z-10 py-32 lg:py-44 max-w-[980px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0 w-full">
        {content}
      </div>
    </div>
  );
};
