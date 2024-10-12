'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Transition,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { state } from '@state';
import MobileMenuLinks from './mobile-menu-links';

export default function MobileMenu({ menu }: { menu: any }) {
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
          <TransitionChild
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
          </TransitionChild>

          <TransitionChild
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
                <DialogPanel className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full dmh:bg-modern-base-card">
                  <div className="px-4 sm:px-8 relative flex items-center justify-start flex-col h-full py-6">
                    <div className="w-full px-0">
                      <div className="w-full flex items-start justify-between">
                        <DialogTitle className="text-primary-main">
                          Menu
                        </DialogTitle>
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
                      <MobileMenuLinks menu={menu} closeModal={closeModal} />
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
