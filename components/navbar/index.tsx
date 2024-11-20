'use client';

import Search from './search';
import OpenAISearch from './openai-search';
import MobileMenu from './mobile-menu';
import ProfileMenu from './profile-menu';
import classNames from 'classnames';
import Link from 'next/link';
import MenuLinks from './menu-links';
import CallToAction from './call-to-action';
import TopMenuLinks from './top-menu-links';
import { state, useSnapshot } from '@state';
import Logo from './logo';
import UseOffSetTopScript from '@components/scripts/use-offset-top';
// import Image from 'next/image';

interface NavbarProps {
  menu: any;
  mobileMenu: any;
  topMenu: any;
  callToAction: any;
  logo: any;
  stickyLogo: any;
  sidebar: any;
  sidebarHeader: any;
  site: any;
  aiChat: any;
  websiteSearch: any;
}

export default function Navbar({
  menu,
  mobileMenu,
  topMenu,
  callToAction,
  logo,
  stickyLogo,
  sidebar,
  sidebarHeader,
  site,
  aiChat,
  websiteSearch,
}: NavbarProps) {
  const snap = useSnapshot(state);
  const isScrolling = snap.isScrolling;

  return (
    <>
      <UseOffSetTopScript />
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
                  <Logo post={logo} className="block w-[300px]" />
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
                    <MobileMenu menu={mobileMenu} />
                  </div>
                  {/* Current: "border-primary-darker text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <div
                    className={classNames(
                      'gap-7 2xl:gap-7 xl:flex hidden pr-3 xl:pr-3 2xl:pr-3 h-full'
                    )}
                  >
                    <MenuLinks isScrolling={isScrolling} menu={menu} />
                  </div>
                  {(aiChat || websiteSearch) && (
                    <div className="flex gap-0 2xl:gap-1 flex-row h-full">
                      {aiChat && (
                        <OpenAISearch isScrolling={isScrolling} post={aiChat} />
                      )}
                      {websiteSearch && (
                        <Search
                          isScrolling={isScrolling}
                          post={websiteSearch}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 xl:gap-2 2xl:gap-3">
                <CallToAction menu={callToAction} />
                {/* Profile dropdown */}
                <div
                  className={classNames(
                    isScrolling ? 'block' : 'sm:hidden',
                    'relative flex-shrink-0'
                  )}
                >
                  <ProfileMenu
                    sidebar={sidebar}
                    sidebarHeader={sidebarHeader}
                    stickyLogo={stickyLogo}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
