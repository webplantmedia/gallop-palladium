'use client';

import ProfileMenuSidebarHeader from '../navbar/profile-menu-sidebar-header';
import classNames from 'classnames';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogBackdrop,
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
      <Dialog
        as="div"
        className="relative z-40 dynamic-content"
        onClose={closeModal}
        open={isOpen}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-base-darker/25 duration-500 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 font-body h-screen min-h-screen text-base max-w-[86%] md:max-w-[77%] lg:max-w-[67%] xl:max-w-[700px] w-full right-0 left-auto scroll-smooth">
          <div className="flex justify-end h-full">
            <DialogPanel
              transition
              className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle overflow-hidden overflow-y-auto scrollbar-hide w-full duration-500 ease-in-out transition data-[closed]:translate-x-full"
            >
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
                <div
                  className={classNames(
                    'h-full mx-4 md:mx-8 [&>*:first-child]:mt-0',
                    "before:content-[''] before:block before:w-full before:h-10 after:content-[''] after:block after:w-full after:h-10 [&_h2]:!text-4xl"
                  )}
                >
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
