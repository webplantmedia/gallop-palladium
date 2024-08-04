import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import SwiperInit from '@components/scripts/swiper-init';
import { useId } from 'react';

export const CoreGroupHero1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  let swiperId = 'swiper-' + useId(); // Generate a unique ID
  swiperId = swiperId.replace(/:/g, '-'); // Sanitize the ID

  console.log(data);

  return (
    <div className={classNames(className, 'relative overflow-clip')}>
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
      <div className="absolute inset-0 h-full w-full !max-w-none bg-black/50"></div>
      <div className="relative flex flex-row !max-w-screen-3xl py-40">
        <div className="w-7/12">
          <div id={swiperId} className="relative swiper">
            <div className="swiper-wrapper">
              {data.wpBlockCover?.wpBlockGroup &&
                data.wpBlockCover.wpBlockGroup.map(
                  (group: any, index: number) => {
                    console.log(group);
                    return (
                      <div
                        key={`hero-1-group-${index}`}
                        className="swiper-slide flex flex-col"
                      >
                        {group?.h4?.text && (
                          <strong className="mb-7 leading-tight text-3xl font-bold text-white">
                            {group.h4.text}
                          </strong>
                        )}
                        {group?.h1?.text && (
                          <h1 className="mb-7 leading-tight text-4xl md:text-5xl lg:text-6xl text-white font-bold">
                            {group.h1.text}
                          </h1>
                        )}
                        {group?.h2?.text && (
                          <h2 className="mb-7 leading-tight text-4xl md:text-5xl lg:text-6xl text-white font-bold">
                            {group.h2.text}
                          </h2>
                        )}
                        {group?.p?.text && (
                          <p className="mb-7 text-lg font-bold text-white">
                            {group?.p?.text}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}
            </div>
            <div className="absolute bottom-0 right-0 swiper-pagination flex justify-end cursor-pointer [&>.swiper-pagination-bullet:last-child]:after:content-none [&>.swiper-pagination-bullet]:after:px-3 [&>.swiper-pagination-bullet]:after:content-['/'] [&>.swiper-pagination-bullet]:text-white text-lg [&>.swiper-pagination-bullet-active]:font-bold [&>.swiper-pagination-bullet-active]:!text-primary-main [&>.swiper-pagination-bullet]:after:font-normal [&>.swiper-pagination-bullet]:after:text-white"></div>
          </div>
        </div>
        <div className="w-5/12"></div>
      </div>
      <SwiperInit swiperId={swiperId} />
    </div>
  );
};
