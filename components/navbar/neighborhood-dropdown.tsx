'use client';

import { Fragment } from 'react';
import DisableScroll from '../global/disable-scroll';
import { Popover, Transition } from '@headlessui/react';
import { _neighborhoods, _neighborhoodsCTA } from '@data/_menu';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
export default function NeighborhoodDropdown({ isScrolling, item }) {
  return (
    <Popover className="flex items-center isolate">
      {({ open }) => (
        <>
          {open && <DisableScroll />}
          <Popover.Button
            as="a"
            href="#"
            className={classNames(
              'inline-flex items-center border-b-2 outline-none border-transparent text-base font-normal text-base-contrast ui-open:border-base-contrast hover:border-base-contrast transition-all h-full'
            )}
          >
            {item.name}
            <ChevronDownIcon
              className={classNames(
                open ? 'rotate-180 transform' : '',
                'ml-0 2xl:ml-1 -mr-1 h-5 w-5 text-base-contrast transition'
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            unmount={false}
          >
            <Popover.Panel
              static={true}
              className="absolute left-8 right-8 max-w-full top-full"
            >
              {({ close }) => (
                <div className="overflow-hidden rounded-b-md bg-base-body shadow-2xl">
                  <div
                    className={classNames(
                      isScrolling
                        ? 'max-h-[calc(var(--app-height)-theme(space.28))]'
                        : 'max-h-[calc(var(--app-height)-theme(space.56))]',
                      'px-4 pb-4 pt-4 overflow-hidden overflow-y-auto scrollbar-hide grid grid-cols-4 gap-0 shadow-inner'
                    )}
                  >
                    {_neighborhoods.map((item, index) => (
                      <Link
                        prefetch={true}
                        onClick={() => {
                          close();
                        }}
                        key={item.name}
                        className={classNames(
                          index == 0
                            ? 'col-span-2 row-span-2 flex flex-col justify-center items-center gap-4 px-4 py-4 hover:bg-white/30 border-2 border-base-contrast rounded-md mr-4 mt-4 ml-4 mb-4'
                            : 'flex flex-col justify-start items-center hover:bg-white/30 p-4 rounded-sm',
                          'relative'
                        )}
                        href={item.href}
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={classNames(
                              index == 0
                                ? 'aspect-[4/3] w-8/12'
                                : 'aspect-[4/3] w-full',
                              'rounded-sm aspect-[4/3] object-cover object-center'
                            )}
                            alt={item.name}
                            src={item.cover}
                            width={item.width}
                            height={item.height}
                            // quality={100}
                          />
                        </div>
                        <div
                          className={classNames(
                            index == 0 && 'gap-3 px-1 2xl:px-10',
                            'flex flex-col justify-center text-center mt-1'
                          )}
                        >
                          <span
                            className={classNames(
                              index == 0 && '2xl:text-xl',
                              'text-primary-main text-base'
                            )}
                          >
                            {item.name}
                          </span>
                          {item.description && (
                            <p
                              className={classNames(
                                index == 0 && '2xl:text-base',
                                'text-sm text-base-contrast italic'
                              )}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
