import classNames from 'classnames';
import { tailwindGetAlignClasses } from '@utils/tools';

export const CoreCover = ({ data, className }: any) => {
  const { imgProps, content, backgroundImage } = data;

  className = tailwindGetAlignClasses(className);

  return (
    <div
      className={classNames(
        'wp-block-cover relative flex items-center justify-center',
        className
      )}
    >
      {imgProps && (
        <>
          <img
            className={classNames(
              imgProps.className,
              'max-w-full box-border absolute inset-0 object-cover h-full object-center grayscale'
            )}
            loading="lazy"
            src={imgProps.src}
            style={imgProps.style}
            width={parseInt(imgProps.width)}
            height={parseInt(imgProps.height)}
            srcSet={imgProps.srcSet}
            // sizes={imgProps.sizes}
            alt={imgProps.alt}
            title={imgProps.title}
          />
          <span className="absolute inset-0 h-full bg-body/90"></span>
        </>
      )}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed grayscale"
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <span className="absolute inset-0 h-full bg-primary-main/80"></span>
        </>
      )}
      <div className="box-content px-4 sm:px-8 relative z-10 py-32 lg:py-44 max-w-[980px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0 w-full">
        {content}
      </div>
    </div>
  );
};
