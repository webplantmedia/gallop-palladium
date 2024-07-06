'use client';

import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { _mobileNavDMH } from '@data/_menu';
import { _cta } from '@data/_sidebar';
import Link from 'next/link';
import { state } from '@state';

import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
// import Image from 'next/image';

const SubMenuButton = ({ items }) => {
  return items.map((item: any) => {
    return (
      <Link
        prefetch={true}
        key={item.mobile}
        href={item.href}
        className="bg-secondary-main hover:bg-secondary-light text-secondary-contrast rounded-md flex items-center justify-center gap-x-2 p-3 text-base"
      >
        {item.mobile}
        <item.icon
          className="h-4 w-4 flex-none text-secondary-contrast"
          aria-hidden="true"
        />
      </Link>
    );
  });
};

const SubMenu = ({ items, onClick }) => {
  return items.map((item: any) => {
    return (
      <Link
        key={item.mobile}
        className="relative flex justify-start text-left rounded-md overflow-hidden bg-base-body cursor-pointer hover:bg-white/30 dmh:bg-modern-base-card dmh:hover:bg-white/30"
        href={item.href}
        onClick={onClick}
      >
        <div className="relative">
          <img
            className="rounded-none w-28 h-full object-cover object-center"
            src={item.cover}
            alt=""
            width={item.width}
            height={item.height}
            // quality={100}
          />
        </div>
        <div className="flex py-2 flex-col justify-center align-center text-left w-full px-4 border-l-0 rounded-r-md border border-base-contrast/20">
          <span className="text-primary-main text-base dmh:text-modern-base-contrast">
            {item.mobile}
          </span>
          {item.description && (
            <p className="text-base-contrast text-sm italic dmh:text-modern-base-contrast/60">
              {item.description}
            </p>
          )}
        </div>
      </Link>
    );
  });
};

export default function MobileMenuDMH() {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    state.dialogOpen = false;
    setIsOpen(false);
  };

  const openModal = () => {
    state.dialogOpen = true;
    setIsOpen(true);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={openModal}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-md flex-shrink-0 text-base-contrast dmh:text-modern-primary-contrast focus:outline-none focus:ring-0 hover:bg-white/30	cursor-pointer"
        >
          <span className="sr-only">Open mobile menu</span>
          {isOpen ? (
            <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
          )}
        </button>
      </div>
      <Transition appear={true} unmount={false} show={isOpen} as={Fragment}>
        <Dialog
          unmount={false}
          as="div"
          className="relative z-40"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 bg-base-darker/25 bg-opacity-100 transition-opacity dmh:bg-modern-base-card/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="-translate-x-0"
            leaveTo="-translate-x-full"
            unmount={false}
          >
            <div className="fixed inset-0 font-body h-[var(--app-height)] text-base max-w-[86%] sm:max-w-[24rem] w-full ">
              <div className="flex justify-start h-full">
                <Dialog.Panel className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full dmh:bg-modern-base-card">
                  <div className="px-4 sm:px-8 relative flex items-center justify-start flex-col h-full py-6">
                    <div className="w-full px-0">
                      <div className="w-full flex items-start justify-between">
                        <Dialog.Title className="text-primary-main dmh:text-modern-primary-main">
                          Menu
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-full bg-base-body text-base-contrast focus:outline-none focus:ring-0 hover:bg-white/10 p-1.5 -mx-2.5 dmh:bg-modern-base-card dmh:text-modern-primary-main dmh:hover:bg-white/50"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="gap-x-2 mt-6 w-full flex flex-col gap-3 pb-20">
                      {_mobileNavDMH.map((item, index) => (
                        <Disclosure
                          as="div"
                          key={index}
                          className="w-full"
                          defaultOpen={true}
                        >
                          {({ open }) => (
                            <>
                              {!('cover' in item) && (
                                <Link
                                  href={item.href}
                                  onClick={closeModal}
                                  className="text-base-contrast border border-base-contrast/20 align-center inline-flex w-full justify-start rounded-md py-3 px-4 bg-base-body cursor-pointer hover:bg-white/30 items-center gap-x-2 dmh:bg-modern-base-card dmh:hover:bg-white/30"
                                >
                                  {/* Correct way to include the Iconify component */}
                                  {/*<Iconify
                                    className="w-5 h-5 shrink-0 mr-2"
                                    icon={item.icon} // Ensure `item.icon` has the correct Iconify icon identifier
                                  />*/}
                                  {item?.icon}
                                  <span>{item.mobile}</span>
                                </Link>
                              )}
                              {'cover' in item && (
                                <Link
                                  key={item.mobile}
                                  className="relative flex justify-start text-left rounded-md overflow-hidden bg-base-body cursor-pointer hover:bg-white/30 dmh:bg-modern-base-card dmh:hover:bg-white/30"
                                  href={item.href}
                                  onClick={closeModal}
                                >
                                  <div className="relative">
                                    <img
                                      className="rounded-none w-28 h-full object-cover object-center"
                                      src={item.cover}
                                      alt=""
                                      width={item.width}
                                      height={item.height}
                                      // quality={100}
                                    />
                                  </div>
                                  <div className="flex py-2 flex-col justify-center align-center text-left w-full px-4 border-l-0 rounded-r-md border border-base-contrast/20">
                                    <span className="text-primary-main text-base dmh:text-modern-base-contrast">
                                      {item.mobile}
                                    </span>
                                    {item.description && (
                                      <p className="text-base-contrast text-sm italic dmh:text-modern-base-contrast/60">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              )}
                            </>
                          )}
                        </Disclosure>
                      ))}
                      <Link
                        href="/dallas-modern-homes/mls/"
                        className="inline-flex justify-start items-center rounded-md px-4 py-3 text-base font-normal border-2 border-base-contrast bg-base-contrast text-primary-contrast shadow-sm hover:bg-base-contrast hover:border-base-contrast focus:outline-none gap-x-2"
                      >
                        <MagnifyingGlassIcon
                          className="h-5 w-5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="w-full">Modern Homes in MLS</span>
                        <ArrowRightIcon
                          className="h-4 w-4 flex-none text-secondary-contrast"
                          aria-hidden="true"
                        />
                      </Link>
                      <h3 className="text-modern-primary-main text-xl mt-7">
                        Call Douglas Newby to See if He Should Represent You
                      </h3>
                      {_cta.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="inline-flex items-center rounded-md px-4 py-3 text-base font-normal border-2 border-secondary-main bg-secondary-main text-secondary-contrast shadow-sm hover:bg-secondary-light hover:border-secondary-light focus:outline-none gap-x-2 justify-start dmh:bg-modern-primary-main dmh:border-modern-primary-main dmh:hover:bg-modern-primary-light dmh:hover:border-modern-primary-light"
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
