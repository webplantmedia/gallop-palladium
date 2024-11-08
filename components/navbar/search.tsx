'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import DisableScroll from '../global/disable-scroll';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

export default function Search({ isScrolling }) {
  return (
    <Popover className="flex items-center">
      {({ open }) => (
        <>
          {open && <DisableScroll />}
          <Popover.Button
            as="button"
            type="button"
            className={classNames(
              open
                ? 'bg-primary-main dmh:bg-modern-primary-contrast text-primary-contrast dmh:text-modern-primary-main'
                : 'bg-transparent text-base-contrast dmh:text-modern-primary-contrast hover:bg-white/30',
              'cursor-pointer flex-shrink-0 rounded-md bg-primary flex w-[40px] h-[40px] items-center justify-center text-base-contrast focus:outline-none'
            )}
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute left-0 right-0 max-w-full top-full">
              <div className="isolate overflow-hidden rounded-b-md shadow-2xl">
                <div
                  className={classNames(
                    isScrolling
                      ? 'max-h-[calc(var(--app-height)-theme(space.24))]'
                      : 'max-h-[calc(var(--app-height)-theme(space.52))]',
                    'overflow-hidden overflow-y-auto scrollbar-hide'
                  )}
                >
                  <div className="relative flex items-center justify-start flex-col h-full">
                    <div className="w-full z-10 sticky top-0 relative">
                      <div className="relative flex items-center">
                        <input
                          className="shadow-inner hide-clear bg-white text-base-contrast font-body block w-full border-white pr-16 pl-6 h-14 border-0 box-border border-white focus:border-white focus:ring-0 placeholder:text-base-contrast/50 truncate text-base"
                          autoFocus={true}
                          placeholder="Search Website"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
