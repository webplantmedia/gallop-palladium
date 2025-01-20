'use client';

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { state } from '@state';
import MobileMenuLinks from './mobile-menu-links';
// import { useRouter } from 'next/navigation';

export default function MobileMenu({ menu }: { menu: any }) {
  let [isOpen, setIsOpen] = useState(false);

  // const router = useRouter();

  // useEffect(() => {
  //   const handlePopState = () => {
  //     document.body.style.overflow = ''; // Remove scroll lock on route change
  //   };

  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //     document.body.style.overflow = ''; // Ensure cleanup
  //   };
  // }, [router]);

  const closeModal = () => {
    state.dialogOpen = false;
    // document.body.style.overflow = '';
    setIsOpen(false);
  };

  const openModal = () => {
    state.dialogOpen = true;
    // document.body.style.overflow = 'hidden';
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
      <Dialog
        unmount={false}
        as="div"
        className="relative z-40"
        onClose={closeModal}
        open={isOpen}
      >
        <DialogBackdrop className="fixed inset-0 bg-base-darker/25 duration-500 ease-out data-[closed]:opacity-0" />

        <div className="fixed inset-0 font-body h-screen min-h-screen text-base max-w-[86%] sm:max-w-[24rem] w-full ">
          <div className="flex justify-start h-full">
            <DialogPanel
              transition
              className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle overflow-hidden overflow-y-auto scrollbar-hide w-full  duration-500 ease-in-out transition data-[closed]:-translate-x-full"
            >
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
      </Dialog>
    </>
  );
}
