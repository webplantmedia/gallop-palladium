'use client';

import { Fragment } from 'react';
import { _siteLogo, _siteArt } from '@data/_general';
// import Trolly from '../../lib/svg/dougnewby-trolly.svg';
// import Logo from '../../lib/svg/dougnewby-logo2.svg';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Search from './search';
import OpenAISearch from './openai-search';
import MobileMenu from './mobile-menu';
import StickyProfileMenu from './sticky-profile-menu';
import { _contact, _aboutMinimum, _nav } from '@data/_menu';
import classNames from 'classnames';
import NeighborhoodDropdown from './neighborhood-dropdown';
import ArchitectureDropdown from './architecture-dropdown';
import ModernDropdown from './modern-dropdown';
import { useOffSetTop } from '@hooks';
import Link from 'next/link';
import { state, useSnapshot } from '@state';
// import Image from 'next/image';

const TransitionDropdownMenu = ({ children }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};

const MenuLink = ({ isScrolling, item }) => {
  switch (item.name) {
    case 'Neighborhoods':
      return <NeighborhoodDropdown isScrolling={isScrolling} item={item} />;
    case 'Architecture':
      return <ArchitectureDropdown isScrolling={isScrolling} item={item} />;
    case 'Modern':
      return <ModernDropdown isScrolling={isScrolling} item={item} />;
    // case 'MLS':
    // return <MLSDropdown isScrolling={isScrolling} item={item} />;
    default:
      return (
        <Link
          href={item.href}
          prefetch={true}
          className={classNames(
            'inline-flex items-center border-b-2 border-transparent text-base font-normal text-base-contrast hover:border-base-contrast hover:text-base-contrast transition-all'
          )}
        >
          {item.name}
        </Link>
      );
  }
};

export default function Navbar({ sidebarContent = 'default' }) {
  useOffSetTop(100);
  const snap = useSnapshot(state);
  const isScrolling = snap.isScrolling;

  return (
    <header
      className={classNames(
        isScrolling ? '-translate-y-32' : 'translate-y-0',
        'z-30 transition-transform ease-out duration-300 bg-base-body block fixed top-0 w-full'
      )}
    >
      <div className="relative mx-auto 2xl:container px-4 sm:px-8">
        <div className="h-32 flex justify-center items-center">
          <div className="w-full sm:w-auto flex justify-center px-4 sm:px-0">
            <Link prefetch={false} href="/">
              <img
                src={_siteLogo.src}
                className="block w-[256px]"
                alt={_siteLogo.alt}
                width={_siteLogo.width}
                height={_siteLogo.height}
              />
            </Link>
          </div>
        </div>
      </div>
      <nav className="relative mx-auto 2xl:container px-4 sm:px-8">
        <div className="flex gap-0 space-x-0 h-16 justify-between border-b-primary-main border-b-2">
          <div className="flex px-0">
            <div className={classNames('flex')}>
              <div className="-ml-2 flex gap-0 2xl:gap-1 flex-row pr-0 xl:pr-2 2xl:pr-3">
                <MobileMenu />
              </div>
              {/* Current: "border-primary-darker text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <div
                className={classNames(
                  'gap-5 2xl:gap-7 xl:flex hidden pr-0 xl:pr-2 2xl:pr-3'
                )}
              >
                {_nav.map((item, itemIndex) => (
                  <MenuLink
                    isScrolling={isScrolling}
                    item={item}
                    key={itemIndex}
                  />
                ))}
              </div>
              <div className="flex gap-0 2xl:gap-1 flex-row">
                <OpenAISearch isScrolling={isScrolling} />
                <Search isScrolling={isScrolling} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 xl:gap-2 2xl:gap-3">
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
              <TransitionDropdownMenu>
                <MenuItems className="bg-primary-main absolute right-0 mt-2 w-auto origin-top-right rounded-b-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {_contact.map((item, itemIndex) => (
                    <MenuItem key={itemIndex}>
                      <Link
                        prefetch={false}
                        href={item.href}
                        className="ui-active:bg-white/10 whitespace-nowrap block px-4 py-2 text-base text-primary-contrast flex items-center"
                      >
                        {item.icon ? (
                          <item.icon className="flex-shrink-0 h-4 w-4 mr-2" />
                        ) : (
                          ''
                        )}
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </TransitionDropdownMenu>
            </Menu>

            {/* Profile dropdown */}
            <div
              className={classNames(
                isScrolling ? 'block' : 'sm:hidden',
                'relative flex-shrink-0'
              )}
            >
              <StickyProfileMenu sidebarContent={sidebarContent} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
