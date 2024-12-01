'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Link from 'next/link';

const AccordionItem = ({ item, open, isChild, level = 1 }: any) => {
  return (
    <>
      <div
        className={classNames(level == 2 ? 'mt-[2px]' : 'mt-[3px]', 'shrink-0')}
      >
        {item.icon}
      </div>
      <div className="w-full flex flex-col">
        <h3>{item.title}</h3>
        <p className="text-base-contrast/50 text-sm italic">{item.subTitle}</p>
      </div>
      {!isChild && (
        <ChevronRightIcon
          className={classNames(
            open ? 'rotate-90 transform' : '',
            'transition self-start h-4 w-4 shrink-0 mt-[2px]'
          )}
        />
      )}
    </>
  );
};

export default function SidebarAccordion({ item }: any) {
  return (
    <Disclosure as="div" className="w-full">
      {({ open }: { open: boolean }) => (
        <>
          <Disclosure.Button
            className={classNames(
              open ? '' : '',
              'flex w-full gap-4 items-start justify-between pl-8 pr-8 cursor-pointer py-2 text-left text-base-contrast'
            )}
          >
            <AccordionItem item={item} open={open} isChild={false} />
          </Disclosure.Button>
          <Disclosure.Panel className="text-base-contrast mb-4">
            {item.children.map((child: any, key: number) => (
              <Link
                prefetch={false}
                key={key}
                href={child.href}
                className={classNames(
                  child.alignTop ? 'items-start' : 'items-center',
                  'flex w-full items-start justify-between gap-4 pl-8 pr-8 cursor-pointer py-2 text-left text-base-contrast text-sm'
                )}
              >
                <AccordionItem
                  item={child}
                  open={open}
                  isChild={true}
                  level={2}
                />
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
