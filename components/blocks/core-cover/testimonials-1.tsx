import classNames from 'classnames';
import {
  getAlign,
  styleStringToObject,
  tailwindGetAlignClasses,
} from '@utils/tools';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import Iconify from '@components/iconify';
import { Alignment, BackgroundMedia, Overlay } from '@components/common';
import { objectMap } from '@utils/objectMap';
import { Heading, HeadingAccent, Button } from '@components/common';
import * as Missing from '@components/global/missing';

export const CoreCoverTestimonials1 = ({ data, className }: any) => {
  const h2 = data?.wpBlockCoverInnerContainer?.h2?._jsx || Missing.H2();
  const h3 = data?.wpBlockCoverInnerContainer?.h3?._jsx || Missing.H3();
  const quote1 =
    data?.wpBlockCoverInnerContainer?.wpBlockQuote || Missing.Quote();
  const quote2 =
    data?.wpBlockCoverInnerContainer?.wpBlockQuote_2 || Missing.Quote();
  const button1 =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._text ||
    Missing.Button();
  const button1Href =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._href ||
    null;

  return (
    <Alignment
      align="full"
      className={classNames('relative overflow-hidden pt-20 pb-20')}
    >
      <BackgroundMedia wpBlockCover={data} />
      <Overlay className="bg-white/90" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {h2 && (
          <HeadingAccent as="h2" className="justify-center !text-accent2">
            {h2}
          </HeadingAccent>
        )}
        {h3 && (
          <Heading as="h3" inStyle="h2" className="text-center !mb-20 !mt-14">
            {h3}
          </Heading>
        )}
        <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
            <figure className="mt-0 flex flex-auto flex-col justify-between">
              <blockquote className="text-2xl text-gray-900 leading-relaxed">
                {objectMap(quote1, (key, item, index) => {
                  if (item?.cite?._jsx) {
                    return (
                      <figcaption
                        key={`cite-${index}`}
                        className="mt-10 flex items-center gap-x-6"
                      >
                        <div className="text-base">
                          <div className="font-semibold text-gray-900">
                            {item.cite._jsx}
                          </div>
                        </div>
                      </figcaption>
                    );
                  } else if (item?._jsx) {
                    return (
                      <p key={`p-${index}`} className="mb-7 italic">
                        {item._jsx}
                      </p>
                    );
                  }
                })}
              </blockquote>
            </figure>
          </div>
          <div className="flex flex-col border-t border-contrast/30 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
            <figure className="mt-0 flex flex-auto flex-col justify-between">
              <blockquote className="text-2xl text-gray-900 leading-relaxed">
                {objectMap(quote2, (key, item, index) => {
                  if (item?.cite?._jsx) {
                    return (
                      <figcaption
                        key={`cite-${index}`}
                        className="mt-10 flex items-center gap-x-6"
                      >
                        <div className="text-base">
                          <div className="font-semibold text-gray-900">
                            {item.cite._jsx}
                          </div>
                        </div>
                      </figcaption>
                    );
                  } else if (item?._jsx) {
                    return (
                      <p key={`p-${index}`} className="mb-7 italic">
                        {item._jsx}
                      </p>
                    );
                  }
                })}
              </blockquote>
            </figure>
          </div>
        </div>

        {button1 && (
          <div className="text-center mt-20">
            <Button href={button1Href}>{button1}</Button>
          </div>
        )}
      </div>
    </Alignment>
  );
};
