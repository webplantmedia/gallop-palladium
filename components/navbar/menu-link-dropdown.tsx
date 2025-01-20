'use client';

import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DisableScroll from '../global/disable-scroll';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react';
import Link from 'next/link';
import { replaceWordPressUrlRelative } from '@utils/tools';
import { Image } from '@components/common';

export default function MenuLinkDropdown({
  data,
  isScrolling,
}: {
  data: any;
  isScrolling: any;
}) {
  const dropdownText = data.p?.text ? data.p.text : 'Dropdown';
  const dropdownItems = data?.wpBlockGroup?.wpBlockGroup || [];

  return (
    <Popover className="flex items-center isolate">
      {({ open }: { open: boolean }) => (
        <>
          {open && <DisableScroll />}
          <PopoverButton
            as="a"
            href="#"
            className={classNames(
              'inline-flex items-center outline-none border-b-2 border-transparent text-base font-normal text-base-contrast ui-open:border-base-contrast hover:border-base-contrast transition-all h-full'
            )}
          >
            {dropdownText}
            <ChevronDownIcon
              className={classNames(
                open ? 'rotate-180 transform' : '',
                'ml-0 2xl:ml-1 -mr-1 h-5 w-5 text-base-contrast transition'
              )}
              aria-hidden="true"
            />
          </PopoverButton>

          <PopoverPanel
            transition
            modal={false}
            className="absolute left-0 right-0 max-w-none top-full transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {({ close }: { close: () => void }) => (
              <div className="overflow-hidden rounded-b-md bg-base-body shadow-2xl">
                <div
                  className={classNames(
                    isScrolling
                      ? 'max-h-[calc(100vh-theme(space.36))] grid-cols-3'
                      : 'max-h-[calc(100vh-theme(space.64))] grid-cols-3',
                    'px-4 pb-4 pt-4 overflow-hidden overflow-y-auto scrollbar-hide grid gap-2 shadow-inner'
                  )}
                >
                  {dropdownItems.map((item: any, index: number) => {
                    const href = item?.p?.a?.href
                      ? replaceWordPressUrlRelative(item.p.a.href)
                      : '#';
                    const text = item?.p?.a?.text ? item.p.a.text : 'Menu Item';

                    var img: any = item?.wpBlockImage?.img || {};
                    const description = '';

                    return (
                      <a
                        // prefetch={true}
                        // scroll={false}
                        onClick={() => {
                          close();
                        }}
                        key={`dropdown-item-${index}`}
                        className={classNames(
                          'flex justify-start items-center hover:bg-gray-100 p-2 rounded-sm gap-4 relative'
                        )}
                        href={href}
                      >
                        <div className="flex justify-center w-14 rounded-sm">
                          {img && (
                            <Image
                              attr={img}
                              className="rounded-sm aspect-square object-cover object-center"
                            />
                          )}
                        </div>
                        <div
                          className={classNames(
                            'flex flex-col justify-start text-left'
                          )}
                        >
                          <span
                            className={classNames(
                              'text-contrast text-base leading-snug'
                            )}
                          >
                            {text}
                          </span>
                          {description && (
                            <p
                              className={classNames(
                                'text-sm text-contrast/50 italic'
                              )}
                            >
                              {description}
                            </p>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
