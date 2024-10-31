import Iconify from '@components/iconify';
import classNames from 'classnames';
import SwiperCarouselInit from '@components/scripts/swiper-carousel-init';
import ArrowLongRightIcon from '@iconify/icons-heroicons/arrow-long-right';
import ArrowLongLeftIcon from '@iconify/icons-heroicons/arrow-long-left';
import { useId } from 'react';
import React from 'react';
import { BlockProps } from '@lib/types';

import { domToReact, DOMNode } from 'html-react-parser';

export const GallopSwiper = ({ children, className }: BlockProps) => {
  let swiperId = 'swiper-' + useId(); // Generate a unique ID
  swiperId = swiperId.replace(/:/g, '-'); // Sanitize the ID

  return (
    <div className="!max-w-none !overflow-hidden">
      <div
        className={classNames(
          'px-0 3xl:px-8 !max-w-screen-3xl w-full flex justify-center mb-14 !h-auto',
          className
        )}
      >
        <div
          id={swiperId}
          className="swiper w-full !h-auto !hidden !overflow-visible"
        >
          <div className="w-full flex justify-between mb-3">
            <div className="swiper-button-prev  text-secondary-main hover:text-secondary-light text-lg justify-end flex flex-row items-center gap-2 cursor-pointer hover:text-base-contrast/80">
              <Iconify
                icon={ArrowLongLeftIcon}
                className="flex-shrink-0 h-auto w-8"
              />
            </div>
            <div className="swiper-button-next text-secondary-main hover:text-secondary-light text-lg justify-end flex flex-row items-center gap-2 cursor-pointer hover:text-base-contrast/80">
              <span>Scroll for Content</span>
              <Iconify
                icon={ArrowLongRightIcon}
                className="flex-shrink-0 h-auto w-8"
              />
            </div>
          </div>
          <div className="relative swiper-wrapper items-start flex">
            {Array.isArray(children) &&
              children.map((item, index) => {
                return (
                  <div className="swiper-slide" key={`swiper-slide-${index}`}>
                    <div className="w-auto [&>*>*]:!mb-0">{item}</div>
                  </div>
                );
              })}
          </div>
        </div>
        <SwiperCarouselInit swiperId={swiperId} />
      </div>
    </div>
  );
};
