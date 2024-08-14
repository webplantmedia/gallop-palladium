import Iconify from '@components/iconify';
import ArrowLongRightIcon from '@iconify/icons-heroicons/arrow-long-right';
import PhoneIcon from '@iconify/icons-heroicons/phone';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import BuildingOfficeIcon from '@iconify/icons-heroicons/building-office';
import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import SwiperInit from '@components/scripts/swiper-init';
import { useId } from 'react';
import { CoreGroupHero1Client } from './core-group-hero-1-client';
import { Fragment } from 'react';
import { permalink } from '@utils/tools';

export const CoreGroupHero1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  let swiperId = 'swiper-' + useId(); // Generate a unique ID
  swiperId = swiperId.replace(/:/g, '-'); // Sanitize the ID
  let slide = { ...data.wpBlockCover };
  let circleText = slide.wpBlockButtons?.wpBlockButton?.a?.text;
  let iframe = { ...data.wpBlockGroup[1].wpBlockEmbed.iframe };
  let video = slide.video;
  let slideItems = slide.wpBlockGroup;
  let brand = { ...data.wpBlockGroup[0]?.wpBlockCover[0] };
  let info = { ...data.wpBlockGroup[0]?.wpBlockCover[1] };
  // console.log(info);

  return (
    <Fragment>
      <div className={classNames(className, 'relative')}>
        {video && (
          <video
            className={classNames(
              'w-full object-cover object-center h-full absolute inset-0 !max-w-none !p-0'
            )}
            autoPlay
            muted
            loop
            playsInline
            src={video.src}
            data-object-fit="cover"
          ></video>
        )}
        <div className="absolute inset-0 h-full w-full !max-w-none bg-black/60"></div>
        <div className="relative flex flex-col xl:flex-row !max-w-screen-3xl py-32">
          <div className="w-full xl:w-7/12 flex justify-center">
            <div id={swiperId} className="swiper max-w-[950px] xl:max-w-none">
              <div className="swiper-wrapper items-start flex mb-20">
                {slideItems &&
                  slideItems.length &&
                  slideItems.map((slide: any, index: number) => {
                    return (
                      <div
                        key={`hero-1-slide-${index}`}
                        className="swiper-slide"
                      >
                        <div className="flex flex-col gap-10">
                          {slide?.h4?.text && (
                            <strong className="mb-0 font-accent !leading-tight text-2xl text-white tracking-[0.3em] uppercase font-normal flex flex-row gap-[0.5em] items-center">
                              {slide.h4.text}
                              <Iconify
                                icon={ArrowLongRightIcon}
                                className="flex-shrink-0 h-auto w-10"
                              />
                            </strong>
                          )}
                          {slide?.h1?.text && (
                            <h1 className="mb-0 !leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-white font-bold">
                              {slide.h1.text}
                              {slide.h1?.em?.text && (
                                <span className="text-stroke text-stroke-white block">
                                  {slide.h1.em.text}
                                </span>
                              )}
                            </h1>
                          )}
                          {slide?.h2?.text && (
                            <h2 className="mb-0 !leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-white font-bold">
                              {slide.h2.text}
                              {slide.h2?.em?.text && (
                                <span className="text-stroke text-stroke-white block">
                                  {slide.h2.em.text}
                                </span>
                              )}
                            </h2>
                          )}
                          {slide?.p?.text && (
                            <p className="mb-0 text-xl font-bold !leading-normal text-white max-w-[700px]">
                              {slide?.p?.text}
                            </p>
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
            {data.wpBlockCover?.wpBlockButtons?.wpBlockButton?.a?.text && (
              <CoreGroupHero1Client circleText={circleText} iframe={iframe} />
            )}
          </div>
        </div>
        <SwiperInit swiperId={swiperId} />
      </div>
      <div className="!max-w-screen-4xl mx-auto relative z-[1] bg-secondary-main">
        <div
          className="absolute -z-[1] top-0 right-0 bottom-20 w-full bg-contain bg-no-repeat bg-right-top opacity-[.03]"
          style={info.img?.src && { backgroundImage: `url('${info.img.src}')` }}
        ></div>
        <div className="flex flex-col xl:flex-row !max-w-screen-3xl px-4 sm:px-8 mx-auto gap-0">
          <div className="py-14 px-8 bg-primary-main text-primary-contrast w-4/12 -mt-20 relative z-20 rounded-t-md overflow-hidden">
            <div className="-z-10 bg-primary-main/90 absolute inset-0"></div>
            <h2 className="mb-7 leading-tight text-2xl md:text-3xl w-full text-center text-primary-contrast">
              {brand.h2.text}
            </h2>
            <table className="min-w-full divide-y divide-white/10">
              <thead></thead>
              <tbody className="divide-y divide-white/10">
                {brand.table?.tbody?.tr &&
                  brand.table.tbody.tr.map((item: any, index: number) => {
                    const dayId = permalink(item.td[0].text);
                    console.log(dayId);
                    return (
                      <tr key={`brand-item-${index}`}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {item.td[0].text}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white text-right">
                          {item.td[1].text}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="w-8/12 flex flex-col xl:flex-row">
            {info &&
              info.wpBlockGroup?.length &&
              info.wpBlockGroup.map((item: any, index: number) => {
                return (
                  <a
                    href={item.p?.a?.href}
                    key={`info-item-${index}`}
                    className={classNames(
                      'py-20 px-12 text-white w-1/3 flex flex-col gap-10 shrink-0 hover:!bg-white/10 justify-center'
                    )}
                    style={{
                      backgroundColor: `rgba(255,255,255,0.0${index + 1})`,
                    }}
                  >
                    {item.wpBlockCode?.text === 'icon-phone' && (
                      <div className="w-20 h-20 flex items-center justify-center bg-primary-main rounded-full">
                        <Iconify
                          icon={PhoneIcon}
                          className="flex-shrink-0 h-auto w-10 text-white"
                        />
                      </div>
                    )}
                    {item.wpBlockCode?.text === 'icon-email' && (
                      <div className="w-20 h-20 flex items-center justify-center bg-primary-main rounded-full">
                        <Iconify
                          icon={EnvelopeIcon}
                          className="flex-shrink-0 h-auto w-10 text-white"
                        />
                      </div>
                    )}
                    {item.wpBlockCode?.text === 'icon-public' && (
                      <div className="w-20 h-20 flex items-center justify-center bg-primary-main rounded-full">
                        <Iconify
                          icon={BuildingOfficeIcon}
                          className="flex-shrink-0 h-auto w-10 text-white"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl">{item.h4?.text}</h3>
                    <p className="text-white/50">{item.p?.a?.text}</p>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
