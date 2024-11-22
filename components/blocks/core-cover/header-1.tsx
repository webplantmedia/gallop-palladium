import { styleStringToObject } from '@utils/tools';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';

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
    <div className="bg-white py-24 sm:py-32 !max-w-none clear-both alignfull border border-black relative isolate overflow-hidden">
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover w-full bg-center bg-fixed bg-no-repeat"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <span className="absolute inset-0 h-full bg-accent/90"></span>
          <div
            aria-hidden="true"
            className="hidden sm:absolute sm:-top-52 sm:right-1/2 sm:-z-10 sm:mr-80 sm:block sm:transform-gpu sm:blur-3xl sm:z-50"
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
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 !max-w-screen-3xl">
        <div className="mx-auto max-w-2xl lg:mx-0 relative">
          <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl text-white">
            {h1}
          </h2>
          <p className="mt-8 text-pretty font-medium sm:text-xl/8 gallop-hero-intro text-white/50">
            {p}
          </p>
        </div>
      </div>
    </div>
  );
};
