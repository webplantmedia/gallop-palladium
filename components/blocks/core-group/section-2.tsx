import classNames from 'classnames';
import * as Missing from '@components/global/missing';

export const CoreGroupSection2 = ({ data, className }: any) => {
  const h2 = data?.h2?.jsx || Missing.H2();
  const p = data?.p?.jsx || Missing.Paragraph();
  const button1 =
    data?.wpBlockButtons?.wpBlockButton?.a?.text || Missing.Button();
  const button2 =
    data?.wpBlockButtons?.wpBlockButton_2?.a?.text || Missing.Button();
  const button1Href = data?.wpBlockButtons?.wpBlockButton?.a?.href || null;
  const button2Href = data?.wpBlockButtons?.wpBlockButton_2?.a?.href || null;

  const img = data?.wpBlockImage?.img || Missing.Image();

  return (
    <div
      className={classNames(
        'relative isolate overflow-hidden bg-gradient-to-b from-accent/10 pt-14',
        'alignfull'
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-accent/10 ring-1 ring-accent/10 sm:-mr-80 lg:-mr-96"
      />
      <div className="mx-auto max-w-screen-3xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h2 className="max-w-2xl text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-contrast lg:col-span-2 xl:col-auto">
            {h2}
          </h2>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-contrast mb-7 !leading-relaxed text-lg font-normal sm:text-xl/8 [&>strong]:text-accent2">
              {p}
            </p>
            <div className="mt-10 flex flex-col items-center sm:items-start xl:items-center justify-start xl:flex-row gap-x-6 max-xl:gap-y-6">
              <a href={button1Href} className="gallop-button">
                {button1}
              </a>
              <a href={button2Href} className="gallop-button-text">
                {button2} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <img
            className={classNames(
              img.className,
              'mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
            )}
            loading="lazy"
            src={img.src}
            style={img.style}
            width={parseInt(img.width)}
            height={parseInt(img.height)}
            srcSet={img.srcSet}
            sizes={img.sizes}
            alt={img.alt}
            title={img.title}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  );
};
