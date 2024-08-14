import Iconify from '@components/iconify';
import ArrowLongRightIcon from '@iconify/icons-heroicons/arrow-long-right';
import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import SwiperInit from '@components/scripts/swiper-init';
import { useId } from 'react';
import { CoreGroupHero1Client } from './core-group-hero-1-client';

const appendVimeoParams = (url: string) => {
  const urlObj = new URL(url);
  urlObj.searchParams.set('muted', '1');
  urlObj.searchParams.set('title', '0');
  urlObj.searchParams.set('byline', '0');
  urlObj.searchParams.set('portrait', '0');
  urlObj.searchParams.set('background', '1');
  return urlObj.toString();
};

export const CoreGroupHero1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  let swiperId = 'swiper-' + useId(); // Generate a unique ID
  swiperId = swiperId.replace(/:/g, '-'); // Sanitize the ID
  let videoSrc: string = '';
  let vimeoVideo = false;
  if (data.wpBlockEmbed?.iframe?.src) {
    videoSrc = appendVimeoParams(data.wpBlockEmbed.iframe.src);
    vimeoVideo = true;
  } else if (data.wpBlockCover?.video?.src) {
    videoSrc = data.wpBlockCover.video.src;
  }

  return (
    <div className={classNames(className, 'relative overflow-hidden')}>
      {vimeoVideo && (
        <div className="absolute inset-0 w-full h-full overflow-hidden !p-0 !max-w-none bg-black">
          <iframe
            className={classNames(
              'max-h-[calc(100cqh)] h-[500%] w-[500%]',
              'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none'
            )}
            src={videoSrc}
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      )}
      {!vimeoVideo && data.wpBlockCover?.video && (
        <video
          className={classNames(
            'w-full object-cover object-center h-full absolute inset-0 !max-w-none !p-0'
          )}
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          data-object-fit="cover"
        ></video>
      )}
      <div className="absolute inset-0 h-full w-full !max-w-none bg-black/70"></div>
      <div className="relative flex flex-row !max-w-screen-3xl py-32">
        <div className="w-7/12">
          <div id={swiperId} className="swiper">
            <div className="swiper-wrapper items-start flex py-14">
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
                            <strong className="mb-0 !leading-tight text-2xl text-white tracking-[0.5em] uppercase font-normal flex flex-row gap-[0.5em] items-center">
                              {group.h4.text}
                              <Iconify
                                icon={ArrowLongRightIcon}
                                className="flex-shrink-0 h-auto w-10"
                              />
                            </strong>
                          )}
                          {group?.h1?.text && (
                            <h1 className="mb-0 !leading-tight text-5xl md:text-6xl lg:text-7xl text-white font-bold">
                              {group.h1.text}
                              {group.h1?.em?.text && (
                                <span className="text-stroke text-stroke-white block">
                                  {group.h1.em.text}
                                </span>
                              )}
                            </h1>
                          )}
                          {group?.h2?.text && (
                            <h2 className="mb-0 !leading-tight text-5xl md:text-6xl lg:text-7xl text-white font-bold">
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
        <div className="w-5/12 flex items-start justify-center pt-32">
          {data.wpBlockCover?.wpBlockButtons?.wpBlockButton?.a?.text && (
            <CoreGroupHero1Client data={data} />
          )}
        </div>
      </div>
      <SwiperInit swiperId={swiperId} />
    </div>
  );
};
