import Iconify from '@components/iconify';
import ArrowLongRightIcon from '@iconify/icons-heroicons/arrow-long-right';
import PhoneIcon from '@iconify/icons-heroicons/phone';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import BuildingOfficeIcon from '@iconify/icons-fluent/building-people-20-filled';
import classNames from 'classnames';
import {
  Alignment,
  Container,
  BackgroundMedia,
  Overlay,
  Heading,
  HeadingAccent,
  Paragraph,
} from '@components/common';
import {
  permalink,
  tailwindAlignClasses,
  styleStringToObject,
} from '@utils/tools';
import SwiperSliderInit from '@components/scripts/swiper-slider-init';
import CircleAnimation from '@components/scripts/circle-animation';
import { useId } from 'react';
import CurrentTime from '@widgets/current-time';
import CurrentDate from '@widgets/current-date';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';
import { VideoPopup } from '@widgets/video-popup';
import { BlockProps } from '@lib/types';
import { objectMap } from '@utils/objectMap';

export const CoreGroupHero1 = ({ data, className }: BlockProps) => {
  className = tailwindAlignClasses(className);
  let wpBlockCover = data?.wpBlockCover;
  let swiperId = 'swiper-' + useId(); // Generate a unique ID
  let circleTextId = 'circle-text-' + useId(); // Generate a unique ID
  swiperId = swiperId.replace(/:/g, '-'); // Sanitize the ID
  circleTextId = circleTextId.replace(/:/g, '-'); // Sanitize the ID
  let videoUrl =
    data?.wpBlockCover?.wpBlockCoverInnerContainer?.wpBlockButtons
      ?.wpBlockButton?.a?.href;

  let circleText =
    data?.wpBlockCover?.wpBlockCoverInnerContainer?.wpBlockButtons
      ?.wpBlockButton?.a?._text;
  let slideItems = data?.wpBlockCover?.wpBlockCoverInnerContainer?.gallopSlides;
  let times =
    data?.wpBlockGroup?.gallopOpeningTimes?.wpBlockCoverInnerContainer?.h2;
  let tbody =
    data?.wpBlockGroup?.gallopOpeningTimes?.wpBlockCoverInnerContainer
      ?.wpBlockTable?.table?.tbody || null;
  let infoImg = data?.wpBlockGroup?.gallopInfo?.wpBlockCoverImageBackground;

  let info = data?.wpBlockGroup?.gallopInfo?.wpBlockCoverInnerContainer || null;

  const embed =
    data?.wpBlockCover?.wpBlockCoverInnerContainer?.wpBlockEmbed || null;

  circleText += ' - ' + circleText + ' - ';

  return (
    <>
      <Alignment align="full">
        <div className="relative">
          <BackgroundMedia wpBlockCover={wpBlockCover} />
          <Overlay className="bg-black/60" />
          <Container className="relative flex flex-col xl:flex-row py-32">
            <div className="w-full xl:w-7/12 flex justify-center">
              <div id={swiperId} className="swiper max-w-[950px] xl:max-w-none">
                <div className="swiper-wrapper items-start flex mb-20">
                  {objectMap(slideItems, (key, slide, index) => {
                    return (
                      <div
                        key={`hero-1-slide-${index}`}
                        className="swiper-slide"
                      >
                        <div className="flex flex-col gap-10">
                          {slide?.h4?._jsx && (
                            <HeadingAccent
                              as="strong"
                              size="large"
                              icon={false}
                              className="!mb-0 text-white flex flex-row gap-[0.5em] items-center"
                            >
                              {slide.h4._jsx}
                              <Iconify
                                icon={ArrowLongRightIcon}
                                className="flex-shrink-0 h-auto w-10"
                              />
                            </HeadingAccent>
                          )}
                          {slide?.h1?.strong?._jsx && (
                            <Heading as="h1" className="!mb-0 text-white">
                              {slide.h1.strong._jsx}
                              {slide.h1?.em?._jsx && (
                                <span className="text-stroke text-stroke-white block">
                                  {slide.h1.em._jsx}
                                </span>
                              )}
                            </Heading>
                          )}
                          {slide?.h2?.strong?._jsx && (
                            <Heading
                              as="h2"
                              inStyle="h1"
                              className="!mb-0 text-white"
                            >
                              {slide.h2.strong._jsx}
                              {slide.h2?.em?._jsx && (
                                <span className="text-stroke text-stroke-white block">
                                  {slide.h2.em._jsx}
                                </span>
                              )}
                            </Heading>
                          )}
                          {slide?.p?._jsx && (
                            <Paragraph
                              as="large"
                              className="!mb-0 text-white max-w-6xl"
                            >
                              {slide?.p?._jsx}
                            </Paragraph>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="z-10 absolute bottom-0 left-0 swiper-pagination flex justify-end [&>.swiper-pagination-bullet]:cursor-pointer [&>.swiper-pagination-bullet:last-child]:after:content-none [&>.swiper-pagination-bullet]:after:px-3 [&>.swiper-pagination-bullet]:after:content-['/'] [&>.swiper-pagination-bullet]:text-white [&>.swiper-pagination-bullet-active]:!text-primary-main text-lg [&>.swiper-pagination-bullet-active>span]:!rounded-sm [&>.swiper-pagination-bullet-active]:!flex [&>.swiper-pagination-bullet-active>span]:!px-2 [&>.swiper-pagination-bullet-active>span]:!block [&>.swiper-pagination-bullet-active>span]:!bg-primary-contrast [&>.swiper-pagination-bullet]:after:font-normal [&>.swiper-pagination-bullet]:after:text-white"></div>
              </div>
            </div>
            <div className="w-full xl:w-5/12 flex items-start justify-center pt-32">
              {(videoUrl || embed) && (
                <VideoPopup
                  className="relative p-2 bg-white/10 hover:bg-white/20 rounded-full border-2 border-white transition-colors duration-300 ease-in-out"
                  url={videoUrl}
                  embed={embed}
                >
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <div
                      id={circleTextId}
                      className="circle-text absolute w-full h-full animate-spin-slow-reverse"
                    >
                      {circleText
                        .split('')
                        .map((letter: string, index: number) => {
                          const length = circleText.length;

                          const spacing = Math.round(360 / length);
                          const angle = spacing * index;

                          return (
                            <span
                              className={`absolute top-0 left-0 right-0 h-full flex items-start justify-center origin-center uppercase text-white text-sm`}
                              style={{ transform: `rotate(${angle}deg)` }}
                              key={`rotate-letter-${index}`}
                            >
                              {letter}
                            </span>
                          );
                        })}
                    </div>
                    <CircleAnimation id={circleTextId} />
                    <div className="absolute w-20 h-20 rounded-full bg-white flex items-center justify-center">
                      <Iconify
                        icon={PlaySolidIcon}
                        className="flex-shrink-0 h-auto w-10 text-primary-main -mr-1"
                      />
                    </div>
                  </div>
                </VideoPopup>
              )}
            </div>
          </Container>
          <SwiperSliderInit swiperId={swiperId} />
        </div>
        <div className="relative z-[1] bg-accent3">
          <div
            className="absolute -z-[1] left-0 top-0 right-0 bottom-0 bg-cover bg-no-repeat bg-right-top w-full xl:w-full opacity-20"
            style={
              infoImg?._src
                ? { backgroundImage: `url('${infoImg._src}')` }
                : undefined
            }
          ></div>
          <Container className="flex flex-col xl:flex-row gap-4 sm:gap-10 xl:gap-0">
            <div className="pt-14 pb-7 px-8 bg-primary-main text-primary-contrast w-full xl:w-4/12 mb-0 xl:-mb-20 -mt-20 relative z-20 rounded-t-md rounded-b-md xl:rounded-m-none overflow-hidden">
              <div className="-z-10 bg-primary-main/90 absolute inset-0"></div>
              <h3 className="mb-7 leading-tight text-2xl md:text-3xl w-full text-center text-primary-contrast">
                {times?._text}
              </h3>
              <div className="min-w-full divide-y divide-white/10">
                {objectMap(tbody, (key, tr, index) => {
                  const dayId = permalink(tr?.td?._text);
                  return (
                    <div
                      key={`times-tr-${index}`}
                      className="w-full flex flex-wrap justify-between whitespace-nowrap px-0 py-4 text-base text-white align-top"
                    >
                      {tr.td_3?._text && (
                        <span className="block text-left w-full italic text-white/60 text-base">
                          {tr.td_3._text}
                        </span>
                      )}
                      <span>
                        {tr?.td?._text}{' '}
                        <span className="text-white/60">
                          <CurrentDate dayString={dayId} />
                        </span>
                      </span>
                      <span>{tr?.td_2?._text}</span>
                      <CurrentTime
                        dayOfWeek={dayId}
                        timeRange={tr?.td_2?._text}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full xl:w-8/12 flex flex-col xl:flex-row gap-4 sm:gap-10 xl:gap-0 mb-4 sm:mb-10 xl:mb-0">
              {objectMap(info, (key, item, index) => {
                return (
                  <a
                    href={item.p?.a?._href}
                    key={`info-item-${index}`}
                    className={classNames(
                      'py-20 px-12 text-white w-full xl:w-1/3 flex flex-col gap-4 sm:gap-10 shrink-0 hover:!bg-white/10 justify-center items-center xl:items-start rounded-md xl:rounded-none'
                    )}
                    style={{
                      backgroundColor: `rgba(255,255,255,0.0${index + 1})`,
                    }}
                  >
                    {item?.pre?.code?._text === 'icon-phone' && (
                      <div className="w-20 h-20 flex items-center justify-center bg-primary-main rounded-full">
                        <Iconify
                          icon={PhoneIcon}
                          className="flex-shrink-0 h-auto w-10 text-white"
                        />
                      </div>
                    )}
                    {item?.pre?.code?._text === 'icon-email' && (
                      <div className="w-20 h-20 flex items-center justify-center bg-primary-main rounded-full">
                        <Iconify
                          icon={EnvelopeIcon}
                          className="flex-shrink-0 h-auto w-10 text-white"
                        />
                      </div>
                    )}
                    {item?.pre?.code?._text === 'icon-public' && (
                      <div className="w-20 h-20 flex items-center justify-center bg-primary-main rounded-full">
                        <Iconify
                          icon={BuildingOfficeIcon}
                          className="flex-shrink-0 h-auto w-10 text-white"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl flex">
                      {item.h4?._text}
                      <Iconify
                        icon={ArrowInsertIcon}
                        className="flex-shrink-0 h-auto w-8 text-white rotate-90"
                      />
                    </h3>
                    <p className="text-white/50 text-lg">{item.p?.a?._text}</p>
                  </a>
                );
              })}
            </div>
          </Container>
        </div>
      </Alignment>
    </>
  );
};
