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
import { useOffSetTop } from '@hooks';
import Link from 'next/link';
import MenuLinks from './menu-links';
import TopMenuLinks from './top-menu-links';
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

export default function Navbar({ sidebarContent = 'default', menu, topMenu }) {
  useOffSetTop(100);
  const snap = useSnapshot(state);
  const isScrolling = snap.isScrolling;

  return (
    <header
      className={classNames(
        // isScrolling ? '-translate-y-32' : 'translate-y-0',
        // isScrolling ? 'xl:h-20' : 'xl:h-40',
        'z-30 bg-base-body fixed top-0 w-full transition-height overflow-visible drop-shadow-xl'
      )}
    >
      <div
        className={classNames(
          isScrolling && 'hidden',
          'xl:hidden h-10 flex xl:w-auto xl:clip-trapazoid items-center justify-center xl:justify-end bg-primary-main text-primary-contrast shadow-xl text-sm'
        )}
      >
        <TopMenuLinks menu={topMenu} />
      </div>
      <div
        className={classNames(
          isScrolling ? 'h-20' : 'h-60 xl:h-40',
          'mx-auto w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-0 xl:gap-10 max-w-screen-3xl px-4 sm:px-8 transition-height ease-out duration-300'
        )}
      >
        <div
          className={classNames(
            isScrolling && 'hidden',
            'relative shrink-0 pt-7 pb-1 xl:py-0 h-40'
          )}
        >
          <div
            className={classNames(
              'flex justify-center items-end xl:items-center h-full'
            )}
          >
            <div className="w-full sm:w-auto flex justify-center">
              <Link prefetch={false} href="/">
                <img
                  src={_siteLogo.src}
                  className="block w-[300px]"
                  alt={_siteLogo.alt}
                  width={_siteLogo.width}
                  height={_siteLogo.height}
                />
              </Link>
            </div>
          </div>
        </div>
        <nav className="w-full relative xl:h-full flex flex-col h-20">
          <div
            className={classNames(
              isScrolling ? 'xl:hidden' : 'hidden xl:flex ',
              'h-10 hidden shrink-0 clip-trapazoid items-center justify-end bg-primary-main text-primary-contrast shadow-xl -mr-[30px] text-sm'
            )}
          >
            <TopMenuLinks menu={topMenu} />
          </div>
          <div className="flex gap-4 justify-between h-full items-center relative">
            <div className="flex px-0 h-full items-center">
              <div className={classNames('flex items-center h-full')}>
                <div className="-ml-2 flex gap-0 2xl:gap-1 flex-row pr-0 xl:pr-2 2xl:pr-3 h-full">
                  <MobileMenu />
                </div>
                {/* Current: "border-primary-darker text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <div
                  className={classNames(
                    'gap-7 2xl:gap-7 xl:flex hidden pr-3 xl:pr-3 2xl:pr-3 h-full'
                  )}
                >
                  <MenuLinks isScrolling={isScrolling} menu={menu} />
                </div>
                <div className="flex gap-0 2xl:gap-1 flex-row h-full">
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
                  <MenuItems
                    className="bg-primary-main absolute right-0 mt-2 w-auto origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    modal={false}
                  >
                    {_contact.map((item, itemIndex) => (
                      <MenuItem key={itemIndex}>
                        <Link
                          prefetch={false}
                          href={item.href}
                          className="ui-active:bg-white/10 whitespace-nowrap px-4 py-2 text-base text-primary-contrast flex items-center"
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
      </div>
    </header>
  );
}
