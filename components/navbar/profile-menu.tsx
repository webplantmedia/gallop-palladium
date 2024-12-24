'use client';

import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react';
import ProfileMenuSidebar from './profile-menu-sidebar';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { state } from '@state';
import ProfileMenuSidebarHeader from './profile-menu-sidebar-header';
import StickyLogo from './sticky-logo';
// import Image from 'next/image';

export default function ProfileMenu({
  sidebar,
  sidebarHeader,
  stickyLogo,
}: {
  sidebar: any;
  sidebarHeader: any;
  stickyLogo: any;
}) {
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
            <StickyLogo
              post={stickyLogo}
              className="h-[48px] w-[48px] rounded-md object-cover object-center box-border border border-white dmh:w-[44px] dmh:h-[44px] dmh:rounded-full"
            />
            <span className="absolute -top-[3px] block -right-[3px] h-3 w-3 rounded-full bg-green-400 ring-1 ring-white dmh:-top-px dmh:-right-px" />
          </span>
        </button>
      </div>
      <Dialog
        unmount={false}
        as="div"
        className="relative z-40"
        onClose={closeModal}
        open={isOpen}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-base-darker/25 duration-500 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 font-body h-screen min-h-screen text-base max-w-[86%] sm:max-w-[24rem] w-full right-0 left-auto">
          <div className="flex justify-end h-full">
            <DialogPanel
              transition
              className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle overflow-hidden overflow-y-auto scrollbar-hide w-full duration-500 ease-in-out transition data-[closed]:translate-x-full"
            >
              <div className="relative flex items-center justify-start flex-col h-full py-6">
                <div className="px-4 sm:px-8 w-full">
                  <div className="w-full flex items-start justify-between">
                    <DialogTitle className="">
                      <ProfileMenuSidebarHeader post={sidebarHeader} />
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
                <div className="mt-6 w-full px-4 sm:px-8">
                  <ProfileMenuSidebar
                    sidebar={sidebar}
                    closeModal={closeModal}
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
