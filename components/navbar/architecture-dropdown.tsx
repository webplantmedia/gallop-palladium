'use client';

import { Fragment } from 'react';
import DisableScroll from '../global/disable-scroll';
import { Popover, Transition } from '@headlessui/react';
import {
  _styles,
  _architects,
  _architecture,
  _architectureAbout,
  _architectureCTA,
  _significant,
  _coastToCoast,
} from '../../_data/_menu';
import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
// import Image from 'next/image';

export default function ArchitectureDropdown({ isScrolling, item }) {
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
                <>
                  <div className="overflow-hidden rounded-b-md bg-base-body shadow-2xl">
                    <div
                      className={classNames(
                        isScrolling
                          ? 'max-h-[calc(var(--app-height)-theme(space.28))]'
                          : 'max-h-[calc(var(--app-height)-theme(space.56))]',
                        'pl-8 pr-8 pb-8 pt-8 overflow-hidden overflow-y-auto scrollbar-hide shadow-inner'
                      )}
                    >
                      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,3fr)] gap-8">
                        <div>
                          <strong className="text-base text-primary-main font-normal">
                            Dallas Architects
                          </strong>
                          <div className="mt-6 flow-root">
                            <div className="-my-2">
                              {_architects.map((item) => (
                                <Link
                                  prefetch={true}
                                  onClick={() => {
                                    close();
                                  }}
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-x-4 py-2 px-2 rounded-sm -ml-2 text-base-contrast hover:bg-white/20"
                                >
                                  {item.cover && (
                                    <img
                                      className="rounded-sm w-12 aspect-square object-cover object-center"
                                      alt={item.name}
                                      src={item.cover}
                                      width={item.width}
                                      height={item.height}
                                      // quality={100}
                                    />
                                  )}
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <strong className="text-base text-primary-main font-normal">
                            Dallas Architecture
                          </strong>
                          <div className="mt-6 mb-7 flow-root">
                            <div className="-my-2">
                              {_architecture.map((item) => (
                                <Link
                                  prefetch={true}
                                  onClick={() => {
                                    close();
                                  }}
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-x-4 py-2 px-2 rounded-sm -ml-2 text-base-contrast hover:bg-white/30"
                                >
                                  {item.cover && (
                                    <img
                                      className="rounded-sm w-12 aspect-square object-cover object-center"
                                      alt={item.name}
                                      src={item.cover}
                                      width={item.width}
                                      height={item.height}
                                      // quality={100}
                                    />
                                  )}
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <strong className="text-base text-primary-main font-normal">
                            Dallas Architectural Styles
                          </strong>
                          <div className="mt-6 flow-root">
                            <div className="-my-2">
                              {_styles.map((item) => (
                                <Link
                                  prefetch={true}
                                  onClick={() => {
                                    close();
                                  }}
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-x-4 py-2 px-2 rounded-sm -ml-2 text-base-contrast hover:bg-white/30"
                                >
                                  {item.cover && (
                                    <img
                                      className="rounded-sm w-12 aspect-square object-cover object-center"
                                      alt={item.name}
                                      src={item.cover}
                                      width={item.width}
                                      height={item.height}
                                      // quality={100}
                                    />
                                  )}
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                            <br></br>
                            {/* Adds space between the end of the 'Dallas Architectural Style' and 'About' */}
                          </div>
                        </div>

                        <div>
                          <strong className="text-base text-primary-main font-normal">
                            Douglas Newby
                          </strong>
                          <div className="mt-6 mb-7 flow-root">
                            <div className="-my-2">
                              {_architectureAbout.map((item) => (
                                <Link
                                  prefetch={true}
                                  onClick={() => {
                                    close();
                                  }}
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-x-4 py-2 px-2 rounded-sm -ml-2 text-base-contrast hover:bg-white/30"
                                >
                                  {item.cover && (
                                    <img
                                      className="rounded-sm w-12 aspect-square object-cover object-center"
                                      alt={item.name}
                                      src={item.cover}
                                      width={item.width}
                                      height={item.height}
                                      // quality={100}
                                    />
                                  )}
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <strong className="text-base text-primary-main font-normal">
                            Architecture Coast to Coast
                          </strong>
                          <div className="mt-6 mb-7 flow-root">
                            <div className="-my-2">
                              {_coastToCoast.map((item) => (
                                <Link
                                  prefetch={true}
                                  onClick={() => {
                                    close();
                                  }}
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-x-4 py-2 px-2 rounded-sm -ml-2 text-base-contrast hover:bg-white/30"
                                >
                                  {item.cover && (
                                    <img
                                      className="rounded-sm w-12 aspect-square object-cover object-center"
                                      alt={item.name}
                                      src={item.cover}
                                      width={item.width}
                                      height={item.height}
                                      // quality={100}
                                    />
                                  )}
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
