'use client';

import ProfileMenuSidebarHeader from '../navbar/profile-menu-sidebar-header';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

// Fix "Loading..." state when closing the bar

interface Props {
  children?: any;
  className?: any;
  header?: any;
  sidebarHeader?: any;
}

export default function DynamicSidebar({
  children,
  className,
  header,
  sidebarHeader,
}: Props) {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (e: any) => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={openModal}
        className={classNames(
          className,
          'focus:outline-none transition-all cursor-pointer'
        )}
      >
        {header}
      </div>
      <Transition appear={true} show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 dynamic-content"
          static={true}
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
          >
            <div className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-0 font-body h-[var(--app-height)] text-base max-w-[86%] md:max-w-[77%] lg:max-w-[67%] xl:max-w-[700px] w-full right-0 left-auto scroll-smooth">
              <div className="flex justify-end h-full">
                <DialogPanel className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full">
                  <div className="relative flex items-center justify-start flex-col h-full pt-6 pb-14">
                    <div className="px-4 md:px-8 w-full">
                      <div className="w-full flex items-start justify-between">
                        <DialogTitle className="">
                          <ProfileMenuSidebarHeader post={sidebarHeader} />
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-full bg-base-body text-base-contrast focus:outline-none focus:ring-0 hover:bg-white/10 p-1.5 -mx-2.5"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="h-full mx-4 md:mx-8 [&>*:first-child]:mt-0 before:content-[''] before:block before:w-full before:h-10 after:content-[''] after:block after:w-full after:h-10">
                      {children}
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
