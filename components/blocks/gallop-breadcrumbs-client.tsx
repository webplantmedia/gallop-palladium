'use client';

import classNames from 'classnames';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { replaceWordPressUrlRelative } from '@utils/tools';
import parse from 'html-react-parser';
import { usePopper } from 'react-popper';
import { useState } from 'react';

export function BreadcrumbsMenu({ dropdown }: any) {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
          rootBoundary: 'viewport',
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom-start', 'bottom-end'],
        },
      },
    ],
  });

  return (
    <Popover className="">
      {({ open }: { open: boolean }) => (
        <>
          <PopoverButton
            ref={setReferenceElement}
            as="a"
            href="#"
            className="inline-flex items-center justify-center text-center rounded-r-md bg-base-darker/20 hover:bg-accent hover:text-secondary-contrast ui-open:bg-accent ui-open:text-secondary-contrast pl-3 pr-3 text-base gap-2 h-full outline-none border-transparent hover:cursor-pointer breadcrumbs-popover"
          >
            <ChevronDownIcon
              className={classNames(
                open ? 'rotate-180 transform' : '',
                'ml-0 h-5 w-5 text-base transition text-center'
              )}
              aria-hidden="true"
            />
          </PopoverButton>
          <PopoverPanel
            ref={setPopperElement}
            as="div"
            modal={false}
            style={styles.popper}
            {...attributes.popper}
            className="z-10 bg-accent mt-2 absolute rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-full data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in w-auto max-w-none left-0"
          >
            {({ close }: { close: () => void }) => (
              <>
                {dropdown.map(
                  (item: any, itemIndex: any) =>
                    replaceWordPressUrlRelative(item.href) !== '/' && (
                      <Link
                        prefetch={true}
                        scroll={false}
                        onClick={() => {
                          close();
                        }}
                        key={itemIndex}
                        href={
                          item?.href
                            ? replaceWordPressUrlRelative(item.href)
                            : '#'
                        }
                        className="ui-active:bg-white/10 whitespace-normal md:whitespace-nowrap px-4 py-2 text-secondary-contrast flex items-center justify-start hover:bg-accent-light "
                      >
                        {item?.icon ? (
                          <span className="w-5 flex justify-center mr-2">
                            {item?.icon}
                          </span>
                        ) : (
                          ''
                        )}
                        <span>{parse(item?.post_title)}</span>
                      </Link>
                    )
                )}
              </>
            )}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
