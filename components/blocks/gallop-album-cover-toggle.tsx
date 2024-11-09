'use client';

import classNames from 'classnames';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export const GallopAlbumCoverToggle = ({
  albumOpen,
  albumImage,
  albumHeadingClass,
  albumHeading,
  albumSize,
  albumGallery,
}: any) => {
  return (
    <Disclosure defaultOpen={albumOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex gap-4 md:gap-10 items-center bg-base-card p-3 sm:p-5 rounded-md overflow-hidden hover:bg-base-card/70 mb-4 w-full">
            <div className="shrink-0 flex [&>figure>img]:w-auto max-md:[&>figure>img]:object-cover max-md:[&>figure>img]:aspect-square [&>figure>img]:max-h-[80px] md:[&>figure>img]:max-h-[80px]">
              {albumImage}
            </div>
            <div className="w-full">
              <h2
                className={classNames(
                  'leading-tight text-1xl sm:text-3xl text-primary-main small-caps text-left',
                  albumHeadingClass
                )}
              >
                {albumHeading}
              </h2>
              <p className="text-left block text-base-contrast text-base italic">
                {albumSize} photographs
              </p>
            </div>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-7 w-7 relative top-0.5 text-base-contrast transition shrink-0`}
            />
          </Disclosure.Button>
          <Disclosure.Panel static className={open ? 'block' : 'hidden'}>
            {albumGallery}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
