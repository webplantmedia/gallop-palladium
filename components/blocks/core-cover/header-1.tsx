import { styleStringToObject } from '@utils/tools';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Paragraph, Heading } from '@components/common';

const BackgroundOverlay = () => {
  return (
    <>
      <span className="absolute inset-0 h-full bg-accent/90"></span>
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-52 sm:right-1/2 sm:mr-80 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-accent to-accent-gradient opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu z-50"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-accent to-accent-gradient opacity-20"
        />
      </div>
    </>
  );
};

export const CoreCoverHeader1 = ({ data, className, props }: BlockProps) => {
  const backgroundStyle = data?.wpBlockCoverImageBackground?.style
    ? styleStringToObject(data.wpBlockCoverImageBackground.style)
    : {};
  const backgroundImage = backgroundStyle?.backgroundImage
    ? backgroundStyle.backgroundImage
    : '';
  const imgProps = data?.wpBlockCoverImageBackground || {};
  const h1 = data?.wpBlockCoverInnerContainer?.h1?.jsx || Missing.H1();
  const p = data?.wpBlockCoverInnerContainer?.p?.jsx || Missing.Paragraph();

  return (
    <div className="wp-block-cover bg-white py-24 sm:py-32 !max-w-none clear-both alignfull border border-black relative isolate overflow-hidden">
      {imgProps && imgProps.width && (
        <>
          <img
            className={classNames(
              imgProps.className,
              'max-w-full w-full box-border absolute inset-0 object-cover h-full object-center'
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
          <BackgroundOverlay />
        </>
      )}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover w-full bg-center bg-fixed bg-no-repeat"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <BackgroundOverlay />
        </>
      )}
      <div className="mx-auto px-6 lg:px-8 !max-w-screen-3xl">
        <div className="mx-auto max-w-5xl lg:mx-0 relative">
          <Heading as="h1" className="text-white">
            {h1}
          </Heading>
          <Paragraph as="leader" className="mt-8 text-white/50 !mb-0">
            {p}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
