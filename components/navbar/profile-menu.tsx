'use client';

import { _siteStickyLogo } from '@data/_general';
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import ProfileMenuSidebar from './profile-menu-sidebar';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { _mobileNav } from '../../_data/_menu';
import { state } from '@state';
// import Image from 'next/image';

export default function ProfileMenu({ sidebar }) {
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
          onClick={openModal}
          className="flex rounded-md bg-white focus:outline-none dmh:bg-transparent"
        >
          <span className="sr-only">About Douglas Newby</span>
          <span className="relative inline-block">
            <img
              className="h-[48px] w-[48px] rounded-md object-cover object-center box-border border border-white dmh:w-[44px] dmh:h-[44px] dmh:rounded-full"
              src={_siteStickyLogo.src}
              alt={_siteStickyLogo.alt}
              width={_siteStickyLogo.width}
              height={_siteStickyLogo.height}
            />
            <span className="absolute -top-[3px] block -right-[3px] h-3 w-3 rounded-full bg-green-400 ring-1 ring-white dmh:-top-px dmh:-right-px" />
          </span>
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
            <div className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100 dmh:bg-modern-base-card/25" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
            unmount={false}
          >
            <div className="fixed inset-0 font-body h-[var(--app-height)] text-base max-w-[86%] sm:max-w-[24rem] w-full right-0 left-auto">
              <div className="flex justify-end h-full">
                <DialogPanel className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full dmh:bg-modern-base-card">
                  <div className="relative flex items-center justify-start flex-col h-full py-6">
                    <div className="px-4 sm:px-8 w-full">
                      <div className="w-full flex items-start justify-between">
                        <DialogTitle className="">
                          <img
                            src="/dougnewby-carriage@390.png"
                            className="block w-[110px] -ml-2"
                            alt="Douglas Newby Origins"
                            // quality={100}
                            width={390}
                            height={162}
                          />
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
                    <div className="mt-6 w-full flex flex-col gap-3">
                      <ProfileMenuSidebar
                        sidebar={sidebar}
                        closeModal={closeModal}
                      />
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
