import Iconify from '@components/iconify';
import ArrowLongRightIcon from '@iconify/icons-heroicons/arrow-long-right';
import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import SwiperInit from '@components/scripts/swiper-init';
import { useId } from 'react';
import { CoreGroupHero1Client } from './core-group-hero-1-client';

export const CoreGroupHero1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  let swiperId = 'swiper-' + useId(); // Generate a unique ID
  swiperId = swiperId.replace(/:/g, '-'); // Sanitize the ID

  return (
    <div className={classNames(className, 'relative')}>
      {data.wpBlockCover?.video && (
        <video
          className={classNames(
            'w-full object-cover object-center h-full absolute inset-0 !max-w-none !p-0'
          )}
          autoPlay
          muted
          loop
          playsInline
          src={data.wpBlockCover.video.src}
          data-object-fit="cover"
        ></video>
      )}
      <div className="absolute inset-0 h-full w-full !max-w-none bg-black/70"></div>
      <div className="relative flex flex-col xl:flex-row !max-w-screen-3xl py-32">
        <div className="w-full xl:w-7/12 flex justify-center">
          <div id={swiperId} className="swiper max-w-[950px] xl:max-w-none">
            <div className="swiper-wrapper items-start flex mb-20">
              {data.wpBlockCover?.wpBlockGroup &&
                data.wpBlockCover.wpBlockGroup.map(
                  (group: any, index: number) => {
                    return (
                      <div
                        key={`hero-1-group-${index}`}
                        className="swiper-slide"
                      >
                        <div className="flex flex-col gap-10">
                          {group?.h4?.text && (
                            <strong className="mb-0 font-accent !leading-tight text-2xl text-white tracking-[0.3em] uppercase font-normal flex flex-row gap-[0.5em] items-center">
                              {group.h4.text}
                              <Iconify
                                icon={ArrowLongRightIcon}
                                className="flex-shrink-0 h-auto w-10"
                              />
                            </strong>
                          )}
                          {group?.h1?.text && (
                            <h1 className="mb-0 !leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-white font-bold">
                              {group.h1.text}
                              {group.h1?.em?.text && (
                                <span className="text-stroke text-stroke-white block">
                                  {group.h1.em.text}
                                </span>
                              )}
                            </h1>
                          )}
                          {group?.h2?.text && (
                            <h2 className="mb-0 !leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-white font-bold">
                              {group.h2.text}
                              {group.h2?.em?.text && (
                                <span className="text-stroke text-stroke-white block">
                                  {group.h2.em.text}
                                </span>
                              )}
                            </h2>
                          )}
                          {group?.p?.text && (
                            <p className="mb-0 text-xl font-bold !leading-normal text-white max-w-[700px]">
                              {group?.p?.text}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
            <div className="z-10 absolute bottom-0 left-0 swiper-pagination flex justify-end [&>.swiper-pagination-bullet]:cursor-pointer [&>.swiper-pagination-bullet:last-child]:after:content-none [&>.swiper-pagination-bullet]:after:px-3 [&>.swiper-pagination-bullet]:after:content-['/'] [&>.swiper-pagination-bullet]:text-white [&>.swiper-pagination-bullet-active]:!text-primary-main text-lg [&>.swiper-pagination-bullet-active>span]:!rounded-sm [&>.swiper-pagination-bullet-active]:!flex [&>.swiper-pagination-bullet-active>span]:!px-2 [&>.swiper-pagination-bullet-active>span]:!block [&>.swiper-pagination-bullet-active>span]:!bg-primary-contrast [&>.swiper-pagination-bullet]:after:font-normal [&>.swiper-pagination-bullet]:after:text-white"></div>
          </div>
        </div>
        <div className="w-full xl:w-5/12 flex items-start justify-center pt-32">
          {data.wpBlockCover?.wpBlockButtons?.wpBlockButton?.a?.text && (
            <CoreGroupHero1Client data={data} />
          )}
        </div>
      </div>
      <SwiperInit swiperId={swiperId} />
    </div>
  );
};
