import classNames from 'classnames';
import {
  getAlign,
  styleStringToObject,
  tailwindGetAlignClasses,
} from '@utils/tools';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import Iconify from '@components/iconify';
import { Alignment } from '@components/common';

export const CoreCoverTestimonials1 = ({ data, className }: any) => {
  // console.log(data);
  const backgroundStyle = data?.wpBlockCoverImageBackground?._style
    ? styleStringToObject(data.wpBlockCoverImageBackground._style)
    : {};
  const backgroundImage = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : '';
  const imgProps = data?.wpBlockCoverImageBackground || {};
  const h2 = data?.wpBlockCoverInnerContainer?.h2?._jsx || null;
  const h3 = data?.wpBlockCoverInnerContainer?.h3?._jsx || null;
  const quote1 = data?.wpBlockCoverInnerContainer?.wpBlockQuote || null;
  const quote2 = data?.wpBlockCoverInnerContainer?.wpBlockQuote_2 || null;
  const p = data?.wpBlockCoverInnerContainer?.p?._jsx || null;
  const button1 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._text ||
    null;
  const button2 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton_2?.a
      ?._text || null;
  const button1Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._href ||
    null;
  const button2Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton_2?.a
      ?._href || null;

  const img = data?.wpBlockCoverInnerContainer?.wpBlockImage?.img || null;
  className = tailwindGetAlignClasses(className);

  return (
    <Alignment className={classNames('relative overflow-hidden pt-20 pb-20')}>
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
            // sizes={imgProps.sizes}
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
          <div className="flex flex-col border-t border-contrast/30 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
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
              className="border-2 overflow-hidden inline-flex items-center border-accent bg-accent text-white hover:bg-primary-light rounded-md px-4 py-2 text-base font-normal shadow-sm"
            >
              {button1}
            </a>
          </div>
        )}
      </div>
    </Alignment>
  );
};
