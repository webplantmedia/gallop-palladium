'use client';

import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import DevicePhoneMobileIcon from '@iconify/icons-heroicons/device-phone-mobile';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import ChatBubbleBottomCenterTextIcon from '@iconify/icons-heroicons/chat-bubble-bottom-center-text';
import Iconify from '@components/iconify';
import { replaceWordPressUrlRelative } from '@utils/tools';
import Link from 'next/link';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { DataIconText } from '@components/blocks';

export default function CallToActionDropdown({ dropdown }) {
  // const menuLabel = dropdown?.p?.text ? dropdown.p.text : 'Menu Label';

  let obj: Array<any> = [];
  if (dropdown?.wpBlockGroup) {
    if (Array.isArray(dropdown?.wpBlockGroup)) {
      obj = [...dropdown.wpBlockGroup];
    } else {
      obj = [dropdown.wpBlockGroup];
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
              <DataIconText
                className="ui-active:bg-white/10 whitespace-nowrap px-4 py-2 text-base text-primary-contrast flex items-center hover:bg-white/10"
                data={data}
              />
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
