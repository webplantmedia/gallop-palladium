import { BlockProps } from '@lib/types';
import { GallopMapClient } from './gallop-map-client';
import { tailwindGetAlignClasses, styleStringToObject } from '@utils/tools';
import classNames from 'classnames';
import { ReactElement } from 'react';

export const GallopMap = ({ data, className }: BlockProps) => {
  className = tailwindGetAlignClasses(className);
  let address: string = '';
  let heading: ReactElement | null = null;
  let description: ReactElement | null = null;
  let image: ReactElement | null = null;

  if (data.wpBlockImage) {
    image = (
      <img
        className={classNames(
          data.wpBlockImage.className,
          '!mb-0 !max-w-full aspect-4/3 object-cover object-center'
        )}
        loading="lazy"
        src={data.wpBlockImage.img.src}
        style={styleStringToObject(data.wpBlockImage.img.style)}
        width={parseInt(data.wpBlockImage.img.width)}
        height={parseInt(data.wpBlockImage.img.height)}
        srcSet={data.wpBlockImage.img.srcSet}
        sizes={data.wpBlockImage.img.sizes}
        alt={data.wpBlockImage.img.alt}
        title={data.wpBlockImage.img.title}
      />
    );
  }

  if (data.p) {
    description = <p className="text-xs">{data.p.jsx}</p>;
  }

  if (data.h2) {
    heading = (
      <h3 className="text-base-contrast text-sm font-bold">{data.h2.jsx}</h3>
    );
  }

  if (data.h3) {
    address = data.h3.text;
  }

  return (
    <div className={classNames('mb-14', className)}>
      <div className="relative rounded-b-none overflow-clip w-full aspect-square lg:aspect-[16/7] h-full">
        <GallopMapClient
          address={address}
          heading={heading}
          image={image}
          description={description}
        />
      </div>
    </div>
  );
};
