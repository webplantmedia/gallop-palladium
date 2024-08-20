'use client';

import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import Link from 'next/link';
import classNames from 'classnames';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { getVarsFromHTML } from '@utils/tools';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import DisableScroll from '../global/disable-scroll';
import {
  Popover,
  PopoverPanel,
  PopoverButton,
  Transition,
} from '@headlessui/react';
import { replaceWordPressUrlRelative } from '@utils/tools';

export default function MenuLinks({ isScrolling, menu }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'p') {
          const data = getVarsFromHTML(domNode);
          const href = data?.a?.href
            ? replaceWordPressUrlRelative(data.a.href)
            : '#';
          return (
            <Link
              href={href}
              prefetch={true}
              className={classNames(
                'inline-flex items-center border-b-2 border-transparent text-base font-normal text-base-contrast hover:border-base-contrast hover:text-base-contrast transition-all'
              )}
            >
              {data?.a.text}
            </Link>
          );
        } else if (hasExactClass(className, 'wp-block-group')) {
          const data = getVarsFromHTML(domNode);
          const dropdownText = data.p?.text ? data.p.text : 'Dropdown';
          const dropdownItems = data.wpBlockGroup?.wpBlockGroup
            ? data.wpBlockGroup.wpBlockGroup
            : [];

          return (
            <Popover className="flex items-center isolate">
              {({ open }) => (
                <>
                  {open && <DisableScroll />}
                  <PopoverButton
                    as="a"
                    href="#"
                    className={classNames(
                      'inline-flex items-center outline-none border-transparent text-base font-normal text-base-contrast ui-open:border-base-contrast hover:border-base-contrast transition-all h-full'
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
                    <PopoverPanel
                      static={true}
                      modal={false}
                      className="absolute left-0 right-0 max-w-screen-3xl top-full"
                    >
                      {({ close }) => (
                        <div className="overflow-hidden rounded-b-md bg-base-body shadow-2xl">
                          <div
                            className={classNames(
                              isScrolling
                                ? 'max-h-[calc(var(--app-height)-theme(space.28))] grid-cols-4'
                                : 'max-h-[calc(var(--app-height)-theme(space.40))] grid-cols-3',
                              'px-4 pb-4 pt-4 overflow-hidden overflow-y-auto scrollbar-hide grid gap-0 shadow-inner'
                            )}
                          >
                            {dropdownItems.map((item: any, index: number) => {
                              const href = item?.p?.a?.href
                                ? replaceWordPressUrlRelative(item.p.a.href)
                                : '#';
                              const text = item?.p?.a?.text
                                ? item.p.a.text
                                : 'Menu Item';

                              var img: any = {};
                              if (item?.img) {
                                img = { ...item.img };
                              }
                              const description = '';

                              return (
                                <Link
                                  prefetch={true}
                                  onClick={() => {
                                    close();
                                  }}
                                  key={`dropdown-item-${index}`}
                                  className={classNames(
                                    false
                                      ? 'col-span-2 row-span-2 flex flex-col justify-center items-center gap-4 px-4 py-4 hover:bg-white/30 border-2 border-base-contrast rounded-md mr-4 mt-4 ml-4 mb-4'
                                      : 'flex flex-col justify-start items-center hover:bg-white/30 p-4 rounded-sm',
                                    'relative'
                                  )}
                                  href={href}
                                >
                                  <div className="w-full flex justify-center">
                                    {img && (
                                      <img
                                        className={classNames(
                                          false
                                            ? 'aspect-[4/3] w-8/12'
                                            : 'aspect-[4/3] w-full',
                                          'rounded-sm aspect-[4/3] object-cover object-center'
                                        )}
                                        alt={img.alt}
                                        src={img.src}
                                        srcSet={img.srcset}
                                        sizes={img.sizes}
                                        width={img.width}
                                        height={img.height}
                                      />
                                    )}
                                  </div>
                                  <div
                                    className={classNames(
                                      false && 'gap-3 px-1 2xl:px-10',
                                      'flex flex-col justify-center text-center mt-1'
                                    )}
                                  >
                                    <span
                                      className={classNames(
                                        false && '2xl:text-xl',
                                        'text-primary-main text-base'
                                      )}
                                    >
                                      {text}
                                    </span>
                                    {description && (
                                      <p
                                        className={classNames(
                                          false && '2xl:text-base',
                                          'text-sm text-base-contrast italic'
                                        )}
                                      >
                                        {description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PopoverPanel>
                  </Transition>
                </>
              )}
            </Popover>
          );
        }
      }
    },
  };
  const html = parse(menu.post_content, options);

  return <>{html}</>;
}
