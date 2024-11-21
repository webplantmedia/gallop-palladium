import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import {
  tailwindGetAlignClasses,
  hasExactClass,
  castToHTMLAttributeProps,
  getVarsFromNode,
  getVimeoIframeSrc,
  getDomNodeText,
  styleStringToObject,
  getVarsFromNode2,
} from '@utils/tools';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { VideoPopup } from '@components/widgets/video-popup';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';
import { CoreHeading, CoreParagraph } from '@components/blocks';

import { HTMLAttributeProps } from '@lib/types';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

const getData = (domNode: Element, options: HTMLReactParserOptions) => {
  let content: Array<React.ReactElement> = [];
  let imgProps: object | null = null;
  let backgroundImage: string | null = null;
  // let videoUrl: string | null = null;

  let index = 0;

  const op2: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;
        index++;

        if (className?.includes('wp-block-heading')) {
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

  return { imgProps, content, backgroundImage };
};

export const CoreCoverTestimonials1 = ({ data, className }: any) => {
  const backgroundStyle = data?.wpBlockCoverImageBackground?.style
    ? styleStringToObject(data.wpBlockCoverImageBackground.style)
    : {};
  const backgroundImage = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : '';
  const imgProps = data?.wpBlockCoverImageBackground || {};
  const h2 = data?.wpBlockCoverInnerContainer?.h2?.jsx || null;
  const h3 = data?.wpBlockCoverInnerContainer?.h3?.jsx || null;
  const quote1 = data?.wpBlockCoverInnerContainer?.wpBlockQuote || null;
  const quote2 = data?.wpBlockCoverInnerContainer?.wpBlockQuote_2 || null;
  const p = data?.wpBlockCoverInnerContainer?.p?.jsx || null;
  const button1 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?.text ||
    null;
  const button2 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton_2?.a
      ?.text || null;
  const button1Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?.href ||
    null;
  const button2Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton_2?.a
      ?.href || null;

  const img = data?.wpBlockCoverInnerContainer?.wpBlockImage?.img || null;
  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames('relative overflow-hidden pt-20 pb-20', className)}
    >
      {imgProps && imgProps.width && (
        <>
          <img
            className={classNames(
              imgProps.className,
              '-z-20 max-w-full box-border absolute inset-0 object-cover h-full object-center'
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
          <span className="-z-10 absolute inset-0 h-full bg-white/80"></span>
        </>
      )}
      {backgroundImage && (
        <>
          <div
            className="-z-10 absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <span className="-z-10 absolute inset-0 h-full bg-black/70"></span>
        </>
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {h2 && (
          <h2 className="leading-tight text-xl uppercase tracking-[0.1em] text-accent2 mb-7 font-accent font-normal flex items-center [&+h3]:!mt-0 justify-center">
            {h2}
            <Iconify
              icon={ArrowInsertIcon}
              className="flex-shrink-0 h-auto w-7 rotate-180"
            />
          </h2>
        )}
        {h3 && (
          <h3 className="mb-20 leading-tight text-4xl md:text-5xl lg:text-6xl text-center text-base-contrast mt-14 font-bold">
            {h3}
          </h3>
        )}
        <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
            <figure className="mt-0 flex flex-auto flex-col justify-between">
              <blockquote className="text-2xl text-gray-900 leading-relaxed">
                {Object.entries(quote1).flatMap(
                  ([key, item]: [string, any], index: number) => {
                    if (item?.cite?.jsx) {
                      return (
                        <figcaption
                          key={`cite-${index}`}
                          className="mt-10 flex items-center gap-x-6"
                        >
                          <div className="text-base">
                            <div className="font-semibold text-gray-900">
                              {item.cite.jsx}
                            </div>
                          </div>
                        </figcaption>
                      );
                    } else if (item?.jsx) {
                      return (
                        <p key={`p-${index}`} className="mb-7 italic">
                          {item.jsx}
                        </p>
                      );
                    }

                    return []; //null doesn't skip
                  }
                )}
              </blockquote>
            </figure>
          </div>
          <div className="flex flex-col border-t border-contrast1/30 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
            <figure className="mt-0 flex flex-auto flex-col justify-between">
              <blockquote className="text-2xl text-gray-900 leading-relaxed">
                {Object.entries(quote2).flatMap(
                  ([key, item]: [string, any], index: number) => {
                    if (item?.cite?.jsx) {
                      return (
                        <figcaption
                          key={`cite-${index}`}
                          className="mt-10 flex items-center gap-x-6"
                        >
                          <div className="text-base">
                            <div className="font-semibold text-gray-900">
                              {item.cite.jsx}
                            </div>
                          </div>
                        </figcaption>
                      );
                    } else if (item?.jsx) {
                      return (
                        <p key={`p-${index}`} className="mb-7 italic">
                          {item.jsx}
                        </p>
                      );
                    }

                    return []; //null doesn't skip
                  }
                )}
              </blockquote>
            </figure>
          </div>
        </div>

        {button1 && (
          <div className="text-center mt-20">
            <a
              href={button1Href}
              className="border-2 overflow-hidden inline-flex items-center border-accent1 bg-accent1 text-white hover:bg-primary-light rounded-md px-4 py-2 text-base font-normal shadow-sm"
            >
              {button1}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export const CoreCoverSection1 = ({ data, className }: any) => {
  const backgroundStyle = data?.wpBlockCoverImageBackground?.style
    ? styleStringToObject(data.wpBlockCoverImageBackground.style)
    : {};
  const backgroundImage = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : '';
  const imgProps = data?.wpBlockCoverImageBackground || {};
  const h2 = data?.wpBlockCoverInnerContainer?.h2?.jsx || null;
  const p = data?.wpBlockCoverInnerContainer?.p?.jsx || null;
  const button1 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?.text ||
    null;
  const button2 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton_2?.a
      ?.text || null;
  const button1Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?.href ||
    null;
  const button2Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton_2?.a
      ?.href || null;

  const img = data?.wpBlockCoverInnerContainer?.wpBlockImage?.img || null;
  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames(
        'relative isolate overflow-hidden bg-gradient-to-b from-accent1/10 pt-14',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-accent1/10 ring-1 ring-accent1/10 sm:-mr-80 lg:-mr-96"
      />
      <div className="mx-auto max-w-screen-3xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          {h2 && (
            <h2 className="max-w-2xl text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-contrast1 lg:col-span-2 xl:col-auto">
              {h2}
            </h2>
          )}
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            {p && (
              <p className="text-contrast1 mb-7 !leading-relaxed text-lg font-normal sm:text-xl/8 [&>strong]:text-accent2">
                {p}
              </p>
            )}
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={button1Href}
                className="border-2 overflow-hidden inline-flex items-center border-accent1 bg-accent1 text-white hover:bg-primary-light rounded-md px-4 py-2 text-base font-normal shadow-sm"
              >
                {button1}
              </a>
              <a
                href={button2Href}
                className="text-base font-bold text-accent1"
              >
                {button2} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          {img && (
            <img
              className={classNames(
                img.className,
                'mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
              )}
              loading="lazy"
              src={img.src}
              style={img.style}
              width={parseInt(img.width)}
              height={parseInt(img.height)}
              srcSet={img.srcSet}
              sizes={img.sizes}
              alt={img.alt}
              title={img.title}
            />
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  );
};
export const CoreCoverHero = ({ data, className }: any) => {
  const backgroundStyle = data?.wpBlockCoverImageBackground?.style
    ? styleStringToObject(data.wpBlockCoverImageBackground.style)
    : {};
  const backgroundImage = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : '';
  const imgProps = data?.wpBlockCoverImageBackground || {};
  const h1 = data?.wpBlockCoverInnerContainer?.h1?.jsx || null;
  const h1Bold = data?.wpBlockCoverInnerContainer?.h1?.strong?.text || null;
  const h1Accent = data?.wpBlockCoverInnerContainer?.h1?.em?.text || null;
  const p = data?.wpBlockCoverInnerContainer?.p?.jsx || null;
  const p_2 = data?.wpBlockCoverInnerContainer?.p_2?.jsx || null;
  const embedVideo = data?.wpBlockCoverInnerContainer?.wpBlockEmbed || null;
  // console.log(data.wpBlockCoverInnerContainer.wpBlockEmbed.wpBlockEmbedWrapper);
  // console.log(data.wpBlockCoverInnerContainer.wpBlockEmbed);

  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames(
        'relative wp-block-cover min-h-[600px] flex items-center justify-center mb-32 before:w-[4px] before:h-[80px] before:absolute before:-bottom-[40px] before:left-1/2 before:-ml-[2px] before:bg-primary-main before:z-20',
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
          'box-border px-4 sm:px-8 z-10 py-32 lg:py-44 [&>*:last-child]:mb-0 [&>*:first-child]:mt-0 w-full',
          embedVideo ? 'max-w-screen-3xl' : 'max-w-[980px]'
        )}
      >
        <div className="flex flex-col xl:flex-row gap-20 justify-center items-center">
          <div className="xl:w-2/3">
            {h1 && !h1Bold && !h1Accent && (
              <h1 className="mb-7 leading-tight text-left xl:text-left text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                {h1}
              </h1>
            )}
            {h1Bold && h1Accent && (
              <h1 className="mb-7 leading-tight text-left xl:text-left text-6xl md:text-6xl lg:text-7xl font-bold text-white [&>em]:text-stroke [&>em]:text-stroke-white [&>em]:font-bold [&>*]:not-italic [&>*]:font-bold">
                {h1}
              </h1>
            )}
            {p && (
              <p className="has-large-font-size text-left xl:text-left text-xl sm:text-2xl lg:text-2xl !leading-relaxed text-white font-bold max-w-[750px]">
                {p}
              </p>
            )}
            {p_2 && (
              <p className="has-large-font-size text-left xl:text-left text-xl sm:text-2xl lg:text-2xl !leading-relaxed text-white max-w-[750px]">
                {p_2}
              </p>
            )}
          </div>
          {embedVideo && (
            <div className="xl:w-1/3 flex justify-center items-center">
              <VideoPopup
                className="relative bg-transparent rounded-full transition-colors duration-300 ease-in-out w-24 h-24 border-2 border-white flex items-center justify-center group"
                embed={embedVideo}
              >
                <span className="inline-flex bg-white backdrop-blur-lg absolute rounded-full -z-10 w-20 h-20 "></span>
                <span className="animate-ping-slow inline-flex bg-white/50 hover:bg-white absolute rounded-full -z-10 w-20 h-20 "></span>
                <Iconify
                  icon={PlaySolidIcon}
                  className="flex-shrink-0 h-auto w-10 text-primary-main -mr-1 group-hover:text-primary-light"
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
          <span className="absolute inset-0 h-full bg-base1/90"></span>
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

export const coreCover = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string
) => {
  if (className?.includes('is-style-hero')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverHero data={data} className={className} />;
  } else if (className?.includes('is-style-section-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverSection1 data={data} className={className} />;
  } else if (className?.includes('is-style-testimonials-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverTestimonials1 data={data} className={className} />;
  }
  const data = getData(domNode, options);
  return <CoreCover data={data} className={className} />;
};
