import { styleStringToObject } from '@utils/tools';
import classNames from 'classnames';
import Iconify from '@components/iconify';
import { VideoPopup } from '@components/widgets/video-popup';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';

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

  return (
    <div
      className={classNames(
        'relative wp-block-cover min-h-[600px] flex items-center justify-center mb-32 before:w-[4px] before:h-[80px] before:absolute before:-bottom-[40px] before:left-1/2 before:-ml-[2px] before:bg-primary-main before:z-20',
        'alignfull'
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
