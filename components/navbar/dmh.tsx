'use client';

import FaviconIcon from '@svg/favicon.svg';
import { Fragment } from 'react';
import Iconify from '@components/iconify';
import HomeModernIcon from '@iconify/icons-heroicons/home-modern';
// import Trolly from '../../lib/svg/dougnewby-trolly.svg';
// import Logo from '../../lib/svg/dougnewby-logo2.svg';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Search from './search';
import OpenAISearch from './openai-search';
import MobileMenuDMH from './mobile-menu-dmh';
import ProfileMenu from './profile-menu';
import StickyProfileMenu from './sticky-profile-menu';
import { _contact, _aboutMinimum, _navDMH } from '@data/_menu';
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

const MenuItem = ({ isScrolling, item }) => {
  switch (item.name) {
    default:
      return (
        <Link
          prefetch={true}
          href={item.href}
          className={classNames(
            'inline-flex items-center border-b-2 text-sm font-normal uppercase variant-normal tracking-wide text-modern-primary-contrast hover:text-modern-primary-contrast/60 border-transparent transition-all'
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
        isScrolling ? '-translate-y-28' : 'translate-y-0',
        'z-30 transition-transform ease-out duration-300 bg-modern-base-body block fixed top-0 w-full drop-shadow-xl'
      )}
    >
      <div className="mx-auto 2xl:container px-4 sm:px-8">
        <div className="h-28 flex justify-between items-center w-full gap-20">
          <div className="w-full sm:w-full md:w-full flex justify-between sm:justify-start gap-7">
            <Link prefetch={true} href="/dallas-modern-homes/">
              <img
                src="/dmhlogo-thin.png"
                className="block h-[64px] w-auto"
                alt="Dallas Modern Homes"
                // quality={100}
                width={369}
                height={410}
              />
            </Link>
            <ProfileMenu sidebarContent={sidebarContent} />
          </div>
          <div className="bg-modern-base-card shrink-0 h-28 w-48 md:w-80 hidden sm:flex justify-end md:justify-center"></div>
        </div>
      </div>
      <nav className="bg-modern-primary-main">
        <div className="relative mx-auto 2xl:container px-4 sm:px-8">
          <div className="flex gap-0 space-x-0 h-16 justify-between">
            <div className="flex px-0">
              <div className={classNames('flex')}>
                <div className="-ml-2 flex gap-0 2xl:gap-1 flex-row pr-0 xl:pr-2 2xl:pr-3">
                  <MobileMenuDMH />
                  <div className="items-center hidden xl:flex justify-center h-full">
                    <Link
                      prefetch={true}
                      href="/"
                      className="h-[40px] w-[40px] justify-center flex items-center"
                    >
                      <FaviconIcon className="shrink-0 h-7 w-7" />
                    </Link>
                  </div>
                  <div className="items-center flex">
                    <Link
                      prefetch={true}
                      href="/dallas-modern-homes/"
                      className={classNames(
                        'hover:bg-white/30 rounded-md h-[40px] w-[40px] flex items-center justify-center'
                      )}
                    >
                      <Iconify
                        className="flex-shrink-0 w-6 h-6 text-white"
                        icon={HomeModernIcon}
                      />
                    </Link>
                  </div>
                </div>
                {/* Current: "border-primary-darker text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <div
                  className={classNames(
                    'gap-5 2xl:gap-7 xl:flex hidden pr-0 xl:pr-2 2xl:pr-3'
                  )}
                >
                  {_navDMH.map((item, itemIndex) => (
                    <MenuItem
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
                <Menu.Button
                  className={classNames(
                    'hidden md:inline-flex items-center rounded-md px-4 py-2 text-sm uppercase variant-normal tracking-wide font-normal border-2 border-modern-primary-contrast bg-transparent text-modern-primary-contrast shadow-sm hover:bg-white/10 focus:outline-none'
                  )}
                >
                  About
                  <ChevronDownIcon
                    className="ml-1 -mr-1 h-5 w-5 text-modern-primary-contrast"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <TransitionDropdownMenu>
                  <Menu.Items className="bg-modern-base-body border-2 border-modern-primary-main absolute right-0 mt-2 w-auto origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {_aboutMinimum.map((item, itemIndex) => (
                      <Menu.Item key={itemIndex}>
                        <Link
                          prefetch={true}
                          href={item.href}
                          className="ui-active:bg-white/10 whitespace-nowrap px-4 py-2 text-base text-modern-primary-main flex items-center"
                        >
                          {item.icon ? (
                            <item.icon className="flex-shrink-0 h-4 w-4 mr-2" />
                          ) : (
                            ''
                          )}
                          {item.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </TransitionDropdownMenu>
              </Menu>

              <Menu as="div" className="relative">
                <Menu.Button
                  className={classNames(
                    'overflow-hidden inline-flex items-center border-2 border-modern-primary-contrast rounded-md px-4 py-2 text-sm font-normal tracking-wide uppercase bg-modern-primary-main text-modern-primary-contrast shadow-sm hover:bg-modern-primary-light focus:outline-none whitespace-nowrap'
                  )}
                >
                  Contact&nbsp;<span className="hidden sm:block">Douglas</span>
                  <ChevronDownIcon
                    className="ml-1 -mr-1 h-5 w-5 text-modern-primary-contrast"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <TransitionDropdownMenu>
                  <Menu.Items className="bg-modern-primary-main absolute right-0 mt-2 w-auto origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {_contact.map((item, itemIndex) => (
                      <Menu.Item key={itemIndex}>
                        <Link
                          prefetch={false}
                          href={item.href}
                          className="ui-active:bg-white/10 whitespace-nowrap px-4 py-2 text-base text-modern-primary-contrast flex items-center"
                        >
                          {item.icon ? (
                            <item.icon className="flex-shrink-0 h-4 w-4 mr-2" />
                          ) : (
                            ''
                          )}
                          {item.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </TransitionDropdownMenu>
              </Menu>

              {/* Profile dropdown */}
              <div
                className={classNames(
                  isScrolling ? 'block' : 'hidden',
                  'w-[44px] relative flex-shrink-0'
                )}
              >
                <StickyProfileMenu sidebarContent={sidebarContent} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
