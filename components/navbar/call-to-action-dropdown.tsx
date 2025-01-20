'use client';

import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { DataIconText } from '@components/blocks';

export default function CallToActionDropdown({ data }: any) {
  // const menuLabel = data?.p?.text ? data.p.text : 'Menu Label';

  let obj: Array<any> = [];
  if (data?.wpBlockGroup) {
    if (Array.isArray(data?.wpBlockGroup)) {
      obj = [...data.wpBlockGroup];
    } else {
      obj = [data.wpBlockGroup];
    }
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={classNames(
          'overflow-hidden inline-flex items-center border-2 border-primary-main rounded-md px-4 py-2 text-base font-normal bg-primary-main text-primary-contrast shadow-sm hover:bg-primary-light focus:outline-none whitespace-nowrap'
        )}
      >
        Contact
        <ChevronDownIcon
          className="ml-1 -mr-1 h-5 w-5 text-primary-contrast"
          aria-hidden="true"
        />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="bg-primary-main absolute right-0 mt-2 w-auto origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          modal={false}
        >
          {obj.map((data: any, index: number) => {
            return (
              <MenuItem key={`data-icon-text-${index}`}>
                {({ close }: { close: () => void }) => (
                  <DataIconText
                    className="ui-active:bg-white/10 whitespace-nowrap px-4 py-2 text-base text-primary-contrast flex items-center hover:bg-white/10"
                    data={data}
                    onClick={close}
                  />
                )}
              </MenuItem>
            );
          })}
          <MenuItem key={`data-icon-text--1`}>
            {({ close }: { close: () => void }) => (
              <DataIconText
                className="ui-active:bg-white/10 whitespace-nowrap px-4 py-2 text-base text-primary-contrast flex items-center hover:bg-white/10"
                data={data}
                onClick={close}
              />
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
